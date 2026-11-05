// Flujo 1 · Perfil rápido: 5 preguntas → punto de partida DigCompEdu (issue #6).
// Fuente: marco DigCompEdu (5 preguntas → nivel).
// Los cortes son una hipótesis propia del equipo, SIN VALIDAR (se prueban en B6). El nivel es un punto
// de partida orientativo que el docente puede corregir; nunca una nota (DECISIÓN en #4 y #6).
// Textos: app/src/copy/es.ts (zona del writer, #8). Aquí solo la lógica.
import { NIVEL_CODES, type NivelCode } from '@ai/index'
import { es } from '../copy/es'

export type { NivelCode }

export interface Nivel {
  code: NivelCode
  /** Nombre de la traducción oficial INTEF/Universia 2020 (brief §1). */
  nombre: string
  /** Una frase en llano; se usa si el modelo no responde y en «¿Qué significan los niveles?». */
  descripcion: string
}

export const NIVELES: Nivel[] = NIVEL_CODES.map((code) => ({
  code,
  nombre: es.perfil.niveles[code].nombre,
  descripcion: es.perfil.niveles[code].resumen,
}))

export function nivelPorCode(code: NivelCode): Nivel {
  return NIVELES.find((n) => n.code === code)!
}

export type AreaId = (typeof es.perfil.preguntas)[number]['id']

export interface Pregunta {
  id: AreaId
  /** Área del marco, en llano (se usa para «por dónde empezar»). */
  area: string
  texto: string
  /** 5 opciones, puntúan 0..4 en este orden. */
  opciones: readonly string[]
}

export const PREGUNTAS: Pregunta[] = es.perfil.preguntas.map((p) => ({
  id: p.id,
  area: es.perfil.areas[p.id],
  texto: p.texto,
  opciones: p.opciones,
}))

/** Respuesta a una pregunta: 0..4, o null si el docente la salta («no encaja con mi escuela»). */
export type Respuesta = 0 | 1 | 2 | 3 | 4 | null

export interface Resultado {
  code: NivelCode
  /** Puntos 0–20 (si hubo preguntas saltadas, reescalado a 20). */
  puntos: number
  respondidas: number
  /** Área con menos puntos entre las respondidas: por donde conviene empezar (brief §1). */
  areaBaja: string
}

/** Cortes [H] del brief, sin validar: A1 0–3 · A2 4–7 · B1 8–11 · B2 12–14 · C1 15–17 · C2 18–20. */
export function nivelDePuntos(puntos: number): NivelCode {
  if (puntos <= 3) return 'A1'
  if (puntos <= 7) return 'A2'
  if (puntos <= 11) return 'B1'
  if (puntos <= 14) return 'B2'
  if (puntos <= 17) return 'C1'
  return 'C2'
}

/** Cálculo determinista en el navegador: el modelo NO decide el nivel, solo lo explica. */
export function calcularResultado(respuestas: Respuesta[]): Resultado {
  const respondidas = respuestas.filter((r): r is Exclude<Respuesta, null> => r !== null)
  const suma = respondidas.reduce<number>((a, r) => a + r, 0)
  const puntos = respondidas.length ? Math.round((suma * PREGUNTAS.length) / respondidas.length) : 0
  let areaBaja = PREGUNTAS[0].area
  let min = Infinity
  respuestas.forEach((r, i) => {
    if (r !== null && r < min) {
      min = r
      areaBaja = PREGUNTAS[i].area
    }
  })
  return { code: nivelDePuntos(puntos), puntos, respondidas: respondidas.length, areaBaja }
}
