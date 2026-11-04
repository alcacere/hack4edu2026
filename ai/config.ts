// Configuración leída de .env (vía Vite). Ningún valor es secreto.

export interface AIConfig {
  /** URL que usa el navegador: el proxy /llm de Vite, que reenvía a LLM_BASE_URL. */
  baseUrl: string
  /** URL real configurada (solo informativa en la interfaz). */
  upstreamUrl: string
  defaultModel: string
  models: string[]
  timeoutMs: number
  /** `reasoning_effort` que se envía al modelo. Por defecto 'none' (sin razonamiento: mucho más rápido en CPU). */
  reasoningEffort: string
  demoMode: boolean
}

function parseList(v: string | undefined): string[] {
  return (v ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
}

function urlDemoFlag(): boolean {
  if (typeof window === 'undefined') return false
  const q = new URLSearchParams(window.location.search).get('demo')
  return q === '1' || q === 'true'
}

export function loadConfig(env: Record<string, string | undefined> = import.meta.env): AIConfig {
  const defaultModel = env.LLM_MODEL || 'gemma4:e2b'
  // Sin .env usamos lo mismo que .env.example (modelo único Gemma 4, #1), para que `npm run dev` funcione tal cual.
  const models = parseList(env.LLM_MODELS ?? 'gemma4:e2b')
  if (!models.includes(defaultModel)) models.unshift(defaultModel)
  const timeout = Number(env.LLM_TIMEOUT_MS)
  return {
    baseUrl: '/llm',
    upstreamUrl: env.LLM_BASE_URL || 'http://localhost:11434/v1',
    defaultModel,
    models,
    timeoutMs: Number.isFinite(timeout) && timeout > 0 ? timeout : 60000,
    reasoningEffort: (env.LLM_REASONING_EFFORT ?? 'none').trim(),
    demoMode: env.DEMO_MODE === '1' || env.DEMO_MODE === 'true' || urlDemoFlag(),
  }
}
