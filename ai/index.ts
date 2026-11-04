// Punto de entrada único de la capa ai/. Los componentes importan SOLO de aquí.
import { loadConfig, type AIConfig } from './config'
import { createOpenAIProvider } from './providers/openai'
import { createFixtureProvider } from './providers/fixtures'
import { PROMPTS } from './prompts'
import { AIError, type ChatRequest, type ChatResult, type LLMProvider } from './types'
import { extractJsonObject, type Validation } from './json'
import { validatePerfil, type PerfilOut } from './schemas'

export * from './types'
export type { PerfilOut } from './schemas'
export type { AIConfig }

export const config: AIConfig = loadConfig()

export const provider: LLMProvider = config.demoMode
  ? createFixtureProvider()
  : createOpenAIProvider({
      baseUrl: config.baseUrl,
      timeoutMs: config.timeoutMs,
      reasoningEffort: config.reasoningEffort,
    })

// ---- Flujos: una función por flujo ----

/** B1: saludo «hola mentor». */
export function holaMentor(model: string, signal?: AbortSignal): Promise<ChatResult> {
  return provider.chat(
    {
      flow: 'hola',
      model,
      messages: [
        { role: 'system', content: PROMPTS.hola },
        { role: 'user', content: 'Hola, mentor.' },
      ],
    },
    signal,
  )
}

export interface JsonResult<T> {
  data: T
  /** Métricas de la respuesta válida (la última petición). */
  result: ChatResult
  /** 1 = a la primera; 2 = hizo falta el reintento. */
  intentos: number
}

/**
 * Llama al modelo pidiendo JSON y lo valida. Si falla el JSON o el esquema, reintenta UNA sola vez
 * (criterio F2). Si vuelve a fallar, lanza AIError('invalid') con un mensaje amable en español.
 */
async function chatJson<T>(
  req: ChatRequest,
  validate: (v: unknown) => Validation<T>,
  signal?: AbortSignal,
): Promise<JsonResult<T>> {
  let lastError = ''
  for (let intento = 1; intento <= 2; intento++) {
    const result = await provider.chat({ ...req, json: true }, signal)
    const v = validate(extractJsonObject(result.text))
    if (v.ok) return { data: v.value, result, intentos: intento }
    lastError = v.error
    if (import.meta.env.DEV) console.warn(`[ai] ${req.flow}: salida no válida (intento ${intento}): ${lastError}`)
  }
  throw new AIError('invalid', 'El mentor ha dado una respuesta que no he podido leer, dos veces seguidas.')
}

export interface PerfilInput {
  nivelCode: string
  nivelNombre: string
  areaBaja: string
  /** Pares área → opción elegida (texto). Las preguntas saltadas no se envían. */
  respuestas: { area: string; respuesta: string }[]
}

/** B2 · Flujo 1: explica en llano el punto de partida (ya calculado por la app) y propone un primer paso. */
export function perfilRapido(model: string, input: PerfilInput, signal?: AbortSignal): Promise<JsonResult<PerfilOut>> {
  const user =
    `Nivel: ${input.nivelNombre}. Área por donde empezar: ${input.areaBaja}.\n` +
    `Respuestas: ${input.respuestas.map((r) => `${r.area} → ${r.respuesta}`).join('; ')}.`
  return chatJson(
    {
      flow: 'perfil',
      model,
      fixtureKey: input.nivelCode,
      messages: [
        { role: 'system', content: PROMPTS.perfil },
        { role: 'user', content: user },
      ],
    },
    validatePerfil,
    signal,
  )
}

// Pendientes (B3–B4): planClase(), reflexion(), con chatJson() y el nivel de la sesión.
