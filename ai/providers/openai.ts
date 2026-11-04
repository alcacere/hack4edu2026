// Proveedor real: cualquier servidor con API compatible OpenAI (Ollama en local).
import { AIError, type ChatRequest, type ChatResult, type LLMProvider } from '../types'

interface Options {
  baseUrl: string
  timeoutMs: number
  /** Valor de `reasoning_effort` (Ollama: 'none' desactiva el razonamiento). Vacío = no se envía. */
  reasoningEffort?: string
}

export function createOpenAIProvider({ baseUrl, timeoutMs, reasoningEffort }: Options): LLMProvider {
  return {
    id: 'llm',
    async chat(req: ChatRequest, signal?: AbortSignal): Promise<ChatResult> {
      const ctrl = new AbortController()
      let timedOut = false
      const timer = setTimeout(() => {
        timedOut = true
        ctrl.abort()
      }, timeoutMs)
      signal?.addEventListener('abort', () => ctrl.abort(), { once: true })
      const t0 = performance.now()
      let res: Response
      try {
        res = await fetch(`${baseUrl}/chat/completions`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          // reasoning_effort 'none': Gemma 4 «piensa» por defecto; en CPU eso
          // multiplica la latencia (medido: 433 tokens en ~80 s con razonamiento vs 46 en 4 s sin él).
          body: JSON.stringify({
            model: req.model,
            messages: req.messages,
            stream: false,
            ...(reasoningEffort ? { reasoning_effort: reasoningEffort } : {}),
          }),
          signal: ctrl.signal,
        })
      } catch {
        clearTimeout(timer)
        if (timedOut) {
          throw new AIError('timeout', `El modelo ha tardado más de ${Math.round(timeoutMs / 1000)} s y he cancelado la petición.`)
        }
        throw new AIError('unreachable', 'No consigo hablar con el modelo local. ¿Está Ollama en marcha?')
      }
      let data: {
        choices?: { message?: { content?: string } }[]
        usage?: { completion_tokens?: number }
        model?: string
        error?: { message?: string } | string
      }
      try {
        data = await res.json()
      } catch {
        data = {}
      } finally {
        clearTimeout(timer)
      }
      const latencyMs = performance.now() - t0
      if (!res.ok) {
        const detail = typeof data.error === 'string' ? data.error : data.error?.message
        // El proxy de Vite devuelve 5xx si Ollama no escucha.
        if (res.status >= 500 && !detail) {
          throw new AIError('unreachable', 'No consigo hablar con el modelo local. ¿Está Ollama en marcha?')
        }
        throw new AIError('http', `El modelo respondió con un error (${res.status})${detail ? `: ${detail}` : ''}.`)
      }
      const text = data.choices?.[0]?.message?.content?.trim() ?? ''
      if (!text) throw new AIError('empty', 'El modelo ha devuelto una respuesta vacía.')
      const completionTokens = data.usage?.completion_tokens
      return {
        text,
        model: data.model || req.model,
        source: 'llm',
        latencyMs,
        completionTokens,
        tokensPerSec: completionTokens ? completionTokens / (latencyMs / 1000) : undefined,
      }
    },
  }
}
