// Contrato común de la capa ai/. Los componentes solo ven esto.

export type FlowId = 'hola' | 'perfil' | 'plan' | 'reflexion'

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export interface ChatRequest {
  flow: FlowId
  model: string
  messages: ChatMessage[]
  /** Clave opcional para elegir una respuesta concreta dentro del fixture del flujo. */
  fixtureKey?: string
  /** Pide al servidor salida JSON (Ollama: response_format json_object). */
  json?: boolean
  /** Si hay esquema, el servidor guía la salida con él (response_format json_schema). */
  jsonSchema?: object
  /** Tiempo máximo de esta petición; si falta, el de la configuración. */
  timeoutMs?: number
  /** Tope de tokens de salida, para que una respuesta desbocada no bloquee la CPU. */
  maxTokens?: number
}

export interface ChatResult {
  text: string
  /** Modelo que dio la respuesta (en demo: el modelo con el que se grabó, si se sabe). */
  model: string
  source: 'llm' | 'demo'
  /** Latencia medida de punta a punta en esta petición (ms). */
  latencyMs: number
  completionTokens?: number
  /** Tokens/s de generación; solo si el servidor devuelve el recuento de tokens. */
  tokensPerSec?: number
}

export interface LLMProvider {
  id: 'llm' | 'demo'
  chat(req: ChatRequest, signal?: AbortSignal): Promise<ChatResult>
}

export type AIErrorCode = 'timeout' | 'unreachable' | 'http' | 'empty' | 'fixture' | 'invalid'

export class AIError extends Error {
  code: AIErrorCode
  constructor(code: AIErrorCode, message: string) {
    super(message)
    this.code = code
    this.name = 'AIError'
  }
}
