// Esquemas de salida JSON por flujo. Si la salida no cumple, la capa ai/ reintenta UNA vez (criterio F2).
import { countSentences, type Validation } from './json.ts'

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

/** Flujo 2 · plan de estudio. Cada paso cita un fragmento de la biblioteca (A1, A2…). */
export interface PasoPlan {
  /** Qué hace el docente en este paso. */
  docente: string
  /** Qué hace el alumnado en este paso. */
  alumnado: string
  fuente: string
}

/** Tope de salida del plan. Holgado respecto a lo que ocupa (hasta ~1.100 tokens con 3 sesiones) para no cortar el JSON. */
export const MAX_TOKENS_PLAN = 1400
export const PASOS_MIN = 4
export const PASOS_MAX = 6
export interface SesionPlan {
  titulo: string
  minutos: number
  pasos: PasoPlan[]
}
export interface PlanOut {
  titulo: string
  objetivo: string
  sesiones: SesionPlan[]
  materiales: string[]
  comprobacion: string[]
  microaccion: string
}

export interface LimitesPlan {
  sesiones: number
  minutos: number
  fuentes: string[]
}

/** Esquema para la decodificación guiada del servidor. validatePlan comprueba además lo que depende del pedido. */
export function esquemaPlan({ sesiones, fuentes }: Pick<LimitesPlan, 'sesiones' | 'fuentes'>) {
  const texto = { type: 'string' }
  const lista = { type: 'array', items: texto, minItems: 1, maxItems: 4 }
  return {
    type: 'object',
    properties: {
      titulo: texto,
      objetivo: texto,
      sesiones: {
        type: 'array',
        minItems: sesiones,
        maxItems: sesiones,
        items: {
          type: 'object',
          properties: {
            titulo: texto,
            minutos: { type: 'integer' },
            pasos: {
              type: 'array',
              minItems: PASOS_MIN,
              maxItems: PASOS_MAX,
              items: {
                type: 'object',
                properties: { docente: texto, alumnado: texto, fuente: { type: 'string', enum: fuentes } },
                required: ['docente', 'alumnado', 'fuente'],
              },
            },
          },
          required: ['titulo', 'minutos', 'pasos'],
        },
      },
      materiales: lista,
      comprobacion: lista,
      microaccion: texto,
    },
    required: ['titulo', 'objetivo', 'sesiones', 'materiales', 'comprobacion', 'microaccion'],
  }
}

function listaStr(v: unknown): string[] | null {
  if (!Array.isArray(v)) return null
  const l = v.map(str).filter((x): x is string => !!x)
  return l.length ? l : null
}

/**
 * `limites` null = no comprobar número de sesiones ni minutos (modo demo: la respuesta grabada es fija
 * y el docente puede haber pedido otra duración). Las fuentes se comprueban siempre.
 */
export function validatePlan(v: unknown, fuentes: string[], limites: Omit<LimitesPlan, 'fuentes'> | null): Validation<PlanOut> {
  if (!v || typeof v !== 'object') return { ok: false, error: 'no es un objeto JSON' }
  const o = v as Record<string, unknown>
  const titulo = str(o.titulo)
  const objetivo = str(o.objetivo)
  const microaccion = str(o.microaccion)
  const materiales = listaStr(o.materiales)
  const comprobacion = listaStr(o.comprobacion)
  if (!titulo) return { ok: false, error: 'falta «titulo»' }
  if (!objetivo) return { ok: false, error: 'falta «objetivo»' }
  if (!materiales) return { ok: false, error: 'falta «materiales»' }
  if (!comprobacion) return { ok: false, error: 'falta «comprobacion»' }
  if (!microaccion) return { ok: false, error: 'falta «microaccion»' }
  if (microaccion.split(/\s+/).length > 40) return { ok: false, error: '«microaccion» supera las 40 palabras' }
  if (!Array.isArray(o.sesiones) || !o.sesiones.length) return { ok: false, error: 'falta «sesiones»' }
  if (limites && o.sesiones.length !== limites.sesiones) {
    return { ok: false, error: `hay ${o.sesiones.length} sesiones y se pidieron ${limites.sesiones}` }
  }
  const sesiones: SesionPlan[] = []
  for (const s of o.sesiones as Record<string, unknown>[]) {
    const tituloS = str(s?.titulo)
    const minutos = s?.minutos
    if (!tituloS) return { ok: false, error: 'una sesión no tiene «titulo»' }
    if (typeof minutos !== 'number' || !Number.isInteger(minutos) || minutos <= 0) return { ok: false, error: 'una sesión no tiene «minutos» válidos' }
    if (limites && minutos > limites.minutos) return { ok: false, error: `una sesión dura ${minutos} min y el máximo es ${limites.minutos}` }
    if (!Array.isArray(s.pasos) || s.pasos.length < PASOS_MIN || s.pasos.length > PASOS_MAX) return { ok: false, error: `una sesión no tiene de ${PASOS_MIN} a ${PASOS_MAX} pasos` }
    const pasos: PasoPlan[] = []
    for (const p of s.pasos as Record<string, unknown>[]) {
      const docente = str(p?.docente)
      const alumnado = str(p?.alumnado)
      const fuente = str(p?.fuente)
      if (!docente) return { ok: false, error: 'un paso no dice qué hace el docente' }
      if (!alumnado) return { ok: false, error: 'un paso no dice qué hace el alumnado' }
      if (!fuente || !fuentes.includes(fuente)) return { ok: false, error: `un paso cita una fuente que no se le dio (${fuente})` }
      pasos.push({ docente, alumnado, fuente })
    }
    sesiones.push({ titulo: tituloS, minutos, pasos })
  }
  return { ok: true, value: { titulo, objetivo, sesiones, materiales, comprobacion, microaccion } }
}
