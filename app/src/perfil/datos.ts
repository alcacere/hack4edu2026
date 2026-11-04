// Flujo 1 · Perfil rápido: 5 preguntas → punto de partida DigCompEdu (issue #6).
// Fuente: docs/research/brief-v1.md §1, «Tabla: 5 preguntas candidatas → nivel DigCompEdu [H]».
// Los cortes son una hipótesis propia del equipo, SIN VALIDAR (se prueban en B6). El nivel es un punto
// de partida orientativo que el docente puede corregir; nunca una nota (DECISIÓN en #4 y #6).
// Los textos vienen del brief; cuando exista app/src/copy/es.ts (#8) se pasarán allí.

export type NivelCode = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'

export interface Nivel {
  code: NivelCode
  /** Nombre de la traducción oficial INTEF/Universia 2020 (brief §1). */
  nombre: string
  /** Descripción en llano, para cuando el modelo no responde (y para la tabla «¿Qué significa?»). */
  descripcion: string
}

export const NIVELES: Nivel[] = [
  { code: 'A1', nombre: 'Novel', descripcion: 'Usas la tecnología sobre todo para preparar clases y comunicarte; dentro del aula, todavía poco. Un buen comienzo es una idea sencilla con algo que ya conoces.' },
  { code: 'A2', nombre: 'Explorador', descripcion: 'Ya has probado la tecnología en algunas cosas, aunque todavía sin un plan fijo. Ahora ayuda ver ejemplos de colegas y elegir con qué seguir.' },
  { code: 'B1', nombre: 'Integrador', descripcion: 'Usas la tecnología en muchas situaciones de clase. El siguiente paso es darte tiempo para probar y fijarte en qué funciona y cuándo.' },
  { code: 'B2', nombre: 'Experto', descripcion: 'Eliges herramientas con criterio según lo que quieres conseguir y te atreves a probar. Puedes ampliar y ordenar tu repertorio.' },
  { code: 'C1', nombre: 'Líder', descripcion: 'Tienes una forma propia y pensada de usar la tecnología y revisas lo que haces. Compartirlo con colegas te ayuda a renovarlo.' },
  { code: 'C2', nombre: 'Pionero', descripcion: 'Cuestionas las prácticas habituales y pruebas cosas nuevas. Te sirve tener espacio para innovar y contarlo a otros.' },
]

export function nivelPorCode(code: NivelCode): Nivel {
  return NIVELES.find((n) => n.code === code)!
}

export interface Pregunta {
  id: number
  /** Área del marco, en llano (se usa para «por dónde empezar»). */
  area: string
  texto: string
  /** 5 opciones, puntúan 0..4 en este orden. */
  opciones: [string, string, string, string, string]
}

export const PREGUNTAS: Pregunta[] = [
  {
    id: 1,
    area: 'materiales digitales',
    texto: 'El último mes, ¿qué hiciste con materiales digitales (un vídeo, una ficha, una app)?',
    opciones: ['Ninguno', 'Usé uno tal cual', 'Lo adapté a mi grupo', 'Elegí entre varios con un criterio', 'Creé uno y lo compartí con colegas'],
  },
  {
    id: 2,
    area: 'la tecnología dentro de clase',
    texto: 'El último mes, ¿para qué usaste la tecnología dentro de clase?',
    opciones: [
      'No la usé',
      'La usé yo para mostrar algo',
      'Mis alumnos la usaron en una actividad',
      'La elegí según el objetivo y la ajusté después',
      'Rediseñé una actividad que sin ella no era posible y analicé el resultado',
    ],
  },
  {
    id: 3,
    area: 'cómo compruebas lo que aprenden',
    texto: 'El último mes, ¿cómo supiste qué habían aprendido tus alumnos?',
    opciones: [
      'Solo con examen en papel',
      'Probé un cuestionario digital',
      'Uso herramientas digitales con regularidad para comprobarlo',
      'Uso esos datos para dar retroalimentación y adaptar la clase',
      'Reviso con espíritu crítico cómo evalúo con tecnología',
    ],
  },
  {
    id: 4,
    area: 'lo que hace tu alumnado con la tecnología',
    texto: 'El último mes, ¿qué hicieron tus alumnos con la tecnología?',
    opciones: [
      'Nada',
      'Consultaron algo que les indiqué',
      'Colaboraron o crearon algo sencillo',
      'Trabajaron a distinto ritmo, con apoyo para quien tiene menos acceso',
      'Les enseñé a contrastar fuentes o a usar la IA con criterio, de forma habitual',
    ],
  },
  {
    id: 5,
    area: 'aprender y compartir con colegas',
    texto: 'El último mes, ¿aprendiste o compartiste algo sobre tecnología educativa?',
    opciones: ['No', 'Busqué algo puntual', 'Probé algo que vi en un curso o a un colega', 'Reflexioné sobre lo que funcionó y lo cambié', 'Formé o acompañé a otros colegas'],
  },
]

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
