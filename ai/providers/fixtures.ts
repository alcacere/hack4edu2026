// Proveedor de demo: misma interfaz que el real, pero responde con textos grabados en fixtures/.
// No usa red ni modelo. Las métricas de modelo (tokens/s) solo se muestran si se grabaron de verdad.
import { AIError, type ChatRequest, type ChatResult, type FlowId, type LLMProvider } from '../types'
import hola from '@fixtures/hola.json'
import perfil from '@fixtures/perfil.json'
import plan from '@fixtures/plan.json'
import reflexion from '@fixtures/reflexion.json'

export interface FixtureEntry {
  key: string
  text: string
  /** Modelo con el que se grabó; null si el texto se escribió a mano. */
  recordedModel: string | null
  recordedTokensPerSec: number | null
}

export interface FixtureFile {
  flow: FlowId
  version: number
  origen: string
  entries: FixtureEntry[]
}

const FIXTURES: Record<FlowId, FixtureFile> = {
  hola: hola as FixtureFile,
  perfil: perfil as FixtureFile,
  plan: plan as FixtureFile,
  reflexion: reflexion as FixtureFile,
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

export function createFixtureProvider({ delayMs = 400 }: { delayMs?: number } = {}): LLMProvider {
  return {
    id: 'demo',
    async chat(req: ChatRequest): Promise<ChatResult> {
      const t0 = performance.now()
      const file = FIXTURES[req.flow]
      const entry = req.fixtureKey ? file.entries.find((e) => e.key === req.fixtureKey) : file.entries[0]
      if (!entry) {
        throw new AIError('fixture', `Modo demo: aún no hay respuesta grabada para «${req.flow}».`)
      }
      await sleep(delayMs) // pausa breve para que la interfaz se vea igual que con el modelo
      return {
        text: entry.text,
        model: entry.recordedModel ?? 'respuesta grabada',
        source: 'demo',
        latencyMs: performance.now() - t0,
        tokensPerSec: entry.recordedTokensPerSec ?? undefined,
      }
    },
  }
}
