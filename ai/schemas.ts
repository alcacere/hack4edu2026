// Esquemas de salida JSON por flujo. Si la salida no cumple, la capa ai/ reintenta UNA vez (criterio F2).
import { countSentences, type Validation } from './json'

export const NIVEL_CODES = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const
export type NivelCode = (typeof NIVEL_CODES)[number]

/** Flujo 1 · perfil: el modelo solo redacta; el nivel lo calcula la app y el modelo lo devuelve tal cual. */
export interface PerfilOut {
  /** Enum A1…C2. Debe coincidir con el que calculó la app; si no, se reintenta. */
  nivel: NivelCode
  /** ≤ 3 frases en llano: qué hace ya el docente y por dónde empezar. */
  explicacion: string
  /** Un primer paso pequeño, en una frase. */
  primerPaso: string
}


function str(v: unknown): string | null {
  return typeof v === 'string' && v.trim() ? v.trim() : null
}

/** `esperado`: el nivel que calculó la app. Un nivel fuera del enum o distinto cuenta como salida no válida. */
export function validatePerfil(v: unknown, esperado: NivelCode): Validation<PerfilOut> {
  if (!v || typeof v !== 'object') return { ok: false, error: 'no es un objeto JSON' }
  const o = v as Record<string, unknown>
  const nivel = typeof o.nivel === 'string' ? o.nivel.trim().toUpperCase() : ''
  if (!(NIVEL_CODES as readonly string[]).includes(nivel)) return { ok: false, error: '«nivel» no es A1, A2, B1, B2, C1 ni C2' }
  if (nivel !== esperado) return { ok: false, error: `«nivel» ${nivel} distinto del calculado (${esperado})` }
  const explicacion = str(o.explicacion)
  const primerPaso = str(o.primerPaso)
  if (!explicacion) return { ok: false, error: 'falta «explicacion»' }
  if (!primerPaso) return { ok: false, error: 'falta «primerPaso»' }
  if (countSentences(explicacion) > 3 || explicacion.length > 500) return { ok: false, error: '«explicacion» demasiado larga' }
  if (primerPaso.length > 300) return { ok: false, error: '«primerPaso» demasiado largo' }
  return { ok: true, value: { nivel: esperado, explicacion, primerPaso } }
}
