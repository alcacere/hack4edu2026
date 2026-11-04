// Punto de entrada único de la capa ai/. Los componentes importan SOLO de aquí.
import { loadConfig, type AIConfig } from './config'
import { createOpenAIProvider } from './providers/openai'
import { createFixtureProvider } from './providers/fixtures'
import { PROMPTS } from './prompts'
import type { ChatResult, LLMProvider } from './types'

export * from './types'
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

// Pendientes (B2–B4): perfilRapido(), planClase(), reflexion().
// Tendrán salida JSON validada con esquema y un único reintento si el JSON falla.
