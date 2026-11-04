// Esquemas de salida JSON por flujo. Si la salida no cumple, la capa ai/ reintenta UNA vez (criterio F2).
import { countSentences, type Validation } from './json'

/** Flujo 1 · perfil: el modelo solo redacta; el nivel lo calcula la app. */
export interface PerfilOut {
  /** ≤ 3 frases en llano: qué hace ya el docente y por dónde empezar. */
  explicacion: string
  /** Un primer paso pequeño, en una frase. */
  primerPaso: string
}

export const PERFIL_SCHEMA_TEXT = '{"explicacion": "máximo 3 frases", "primerPaso": "una frase"}'

function str(v: unknown): string | null {
  return typeof v === 'string' && v.trim() ? v.trim() : null
}

export function validatePerfil(v: unknown): Validation<PerfilOut> {
  if (!v || typeof v !== 'object') return { ok: false, error: 'no es un objeto JSON' }
  const o = v as Record<string, unknown>
  const explicacion = str(o.explicacion)
  const primerPaso = str(o.primerPaso)
  if (!explicacion) return { ok: false, error: 'falta «explicacion»' }
  if (!primerPaso) return { ok: false, error: 'falta «primerPaso»' }
  if (countSentences(explicacion) > 3 || explicacion.length > 500) return { ok: false, error: '«explicacion» demasiado larga' }
  if (primerPaso.length > 300) return { ok: false, error: '«primerPaso» demasiado largo' }
  return { ok: true, value: { explicacion, primerPaso } }
}
