// Biblioteca local: leer fichas, entender el pedido y buscar. Sin IA, sin red y sin dependencias de Vite,
// para que scripts/check-library.ts pueda probar lo mismo que usa la app.

export interface Seccion {
  titulo: string
  texto: string
}

export interface Ficha {
  id: string
  grado: number
  area: string
  tema: string
  alias: string[]
  competencia: string
  fuente: string
  url: string
  /** true solo cuando una persona la ha contrastado con la fuente. */
  revisado: boolean
  secciones: Seccion[]
}

export const SECCIONES_OBLIGATORIAS = [
  'Qué debe lograr',
  'Ideas clave',
  'Errores frecuentes',
  'Actividades sin tecnología',
  'Cómo comprobar lo aprendido',
] as const

/** Convierte el Markdown de una ficha en datos. Lanza un error con el motivo si falta algo. */
export function parseFicha(raw: string, origen = 'ficha'): Ficha {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  if (!m) throw new Error(`${origen}: falta la cabecera entre ---`)
  const meta: Record<string, string> = {}
  for (const linea of m[1].split(/\r?\n/)) {
    const i = linea.indexOf(':')
    if (i > 0) meta[linea.slice(0, i).trim()] = linea.slice(i + 1).trim()
  }
  for (const campo of ['id', 'grado', 'area', 'tema', 'competencia', 'fuente', 'url', 'revisado']) {
    if (!meta[campo]) throw new Error(`${origen}: falta «${campo}»`)
  }
  const grado = Number(meta.grado)
  if (!Number.isInteger(grado) || grado < 1 || grado > 6) throw new Error(`${origen}: «grado» debe ser de 1 a 6`)
  if (meta.revisado !== 'true' && meta.revisado !== 'false') throw new Error(`${origen}: «revisado» debe ser true o false`)
  const secciones = m[2]
    .split(/^## +/m)
    .slice(1)
    .map((bloque) => {
      const fin = bloque.indexOf('\n')
      return { titulo: bloque.slice(0, fin).trim(), texto: bloque.slice(fin + 1).trim() }
    })
  for (const titulo of SECCIONES_OBLIGATORIAS) {
    if (!secciones.some((s) => s.titulo === titulo && s.texto)) throw new Error(`${origen}: falta la sección «${titulo}»`)
  }
  return {
    id: meta.id,
    grado,
    area: meta.area,
    tema: meta.tema,
    alias: (meta.alias ?? '')
      .replace(/^\[|\]$/g, '')
      .split(',')
      .map((a) => a.trim())
      .filter(Boolean),
    competencia: meta.competencia,
    fuente: meta.fuente,
    url: meta.url,
    revisado: meta.revisado === 'true',
    secciones,
  }
}

// ---- Entender el pedido (sin IA) ----

export interface Pedido {
  /** null = no lo ha dicho: se pregunta, nunca se adivina. */
  grado: number | null
  sesiones: number | null
  /** Minutos de cada sesión. */
  minutos: number | null
  /** Las palabras del tema, tal como las escribió el docente. */
  tema: string
}

const quitarAcentos = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '')

const ORDINALES: Record<string, number> = {
  primero: 1, primer: 1, first: 1, segundo: 2, second: 2, tercero: 3, tercer: 3, third: 3,
  cuarto: 4, fourth: 4, quinto: 5, fifth: 5, sexto: 6, sixth: 6,
}
const CANTIDADES: Record<string, number> = { una: 1, un: 1, one: 1, dos: 2, two: 2, tres: 3, three: 3 }

function extraerGrado(t: string): number | null {
  const ord = Object.keys(ORDINALES).join('|')
  const patrones: [RegExp, (m: RegExpMatchArray) => number][] = [
    [/\b(?:grado|grade|curso)\s*([1-9])\b/, (m) => Number(m[1])],
    [/\b([1-9])\s*(?:\.?\s*[ºo°]|er|ro|do|to|th|st|nd|rd)?\s*(?:grado|grade|curso|de primaria|primaria)\b/, (m) => Number(m[1])],
    [/(?:^|\s)([1-9])\s*(?:\.\s*[ºo°]|[º°]|er|ro|do|to|th|st|nd|rd)(?=\s|[.,;:]|$)/, (m) => Number(m[1])],
    [new RegExp(`\\b(${ord})\\s+(?:grado|grade|curso|de primaria|primaria)\\b`), (m) => ORDINALES[m[1]]],
    [new RegExp(`\\b(?:para|de|en|a|grado)\\s+(${ord})\\b`), (m) => ORDINALES[m[1]]],
  ]
  for (const [re, valor] of patrones) {
    const m = t.match(re)
    if (m) {
      const g = valor(m)
      return g >= 1 && g <= 6 ? g : null
    }
  }
  return null
}

const PATRON_TEMA = /(?:^|\s)(?:sobre|acerca de|about|on|tema:?)\s+(.+?)(?=\s+(?:para|for|en|in|con|with|de\s+\d)\s|[,.;]|$)/

export function parsePedido(texto: string): Pedido {
  const t = quitarAcentos(texto.toLowerCase())
  const nSes = t.match(/\b(\d+|una|un|one|dos|two|tres|three)\s*(?:sesion(?:es)?|clases?|sessions?|lessons?)\b/)
  const sesiones = nSes ? (CANTIDADES[nSes[1]] ?? Number(nSes[1])) : null
  const nMin = t.match(/\b(\d{2,3})\s*(?:min(?:uto|ute)?s?)\b/)
  const nHor = t.match(/\b(\d)\s*(?:horas?|hours?)\b/)
  const minutos = nMin ? Number(nMin[1]) : nHor ? Number(nHor[1]) * 60 : null
  const seg = t.match(PATRON_TEMA)
  return { grado: extraerGrado(t), sesiones, minutos, tema: (seg ? seg[1] : texto).trim() }
}

// ---- Buscar ----

/** Palabras que no dicen de qué trata la clase (incluye las de pedir un plan, en español e inglés). */
const VACIAS = new Set(
  `a al algo como con de del el en la las lo los mi mis o para por que se sobre su sus un una unas unos y e u
   acerca alumnado alumno alumnos clase clases curso dame estudiante estudio favor genera generar grado haz hazme
   leccion lecciones minuto nino nivel plan planificacion por primaria quiero sesion unidad tema necesito
   about an and be for generate give grade i in lesson me my of on please session student students study teacher the to with`
    .split(/\s+/)
    .filter(Boolean),
)

function raiz(p: string): string {
  if (p.length > 4 && p.endsWith('es')) return p.slice(0, -2)
  if (p.length > 3 && p.endsWith('s')) return p.slice(0, -1)
  return p
}

export function tokens(texto: string): string[] {
  return quitarAcentos(texto.toLowerCase())
    .split(/[^a-z0-9ñ]+/)
    .filter((p) => p && !/^\d+$/.test(p))
    .map(raiz)
    .filter((p) => !VACIAS.has(p) && !VACIAS.has(`${p}s`))
}

const nombreDeFicha = (f: Ficha) => new Set(tokens([f.tema, ...f.alias].join(' ')))

/**
 * Una ficha solo responde si su tema o sus alias cubren más de la mitad de las palabras pedidas.
 * Así «el ciclo de las rocas» no devuelve «el ciclo del agua», y una palabra suelta en el cuerpo
 * de una ficha no basta para generar un plan sobre ella.
 */
function cubre(f: Ficha, consulta: string[]): boolean {
  const nombre = nombreDeFicha(f)
  return consulta.filter((p) => nombre.has(p)).length / consulta.length > 0.5
}

/** BM25 sobre el cuerpo de las fichas, con el tema y los alias pesando 3 veces más. */
function puntuar(fichas: Ficha[], consulta: string[]): Map<string, number> {
  const k1 = 1.2
  const b = 0.75
  const docs = fichas.map((f) => {
    const cuerpo = tokens(f.secciones.map((s) => s.texto).join(' '))
    const nombre = tokens([f.tema, ...f.alias].join(' '))
    return { id: f.id, t: [...cuerpo, ...nombre, ...nombre, ...nombre] }
  })
  const media = docs.reduce((s, d) => s + d.t.length, 0) / (docs.length || 1)
  const puntos = new Map<string, number>()
  for (const d of docs) {
    let total = 0
    for (const q of new Set(consulta)) {
      const n = docs.filter((x) => x.t.includes(q)).length
      const tf = d.t.filter((x) => x === q).length
      if (!tf) continue
      const idf = Math.log(1 + (docs.length - n + 0.5) / (n + 0.5))
      total += (idf * tf * (k1 + 1)) / (tf + k1 * (1 - b + (b * d.t.length) / media))
    }
    puntos.set(d.id, total)
  }
  return puntos
}

export interface Busqueda {
  /** Fichas de ese grado que responden al tema (máximo 2, la mejor primero). */
  fichas: Ficha[]
  /** El tema existe, pero en otros grados. Nunca se usan sin que el docente lo elija. */
  otrosGrados: Ficha[]
  /** Lo que sí hay para ese grado, para ofrecerlo cuando no hay coincidencia. */
  temasDelGrado: string[]
}

export function buscar(biblioteca: Ficha[], grado: number, tema: string): Busqueda {
  const consulta = tokens(tema)
  const temasDelGrado = biblioteca.filter((f) => f.grado === grado).map((f) => f.tema)
  if (!consulta.length) return { fichas: [], otrosGrados: [], temasDelGrado }
  const candidatas = biblioteca.filter((f) => cubre(f, consulta))
  const puntos = puntuar(biblioteca, consulta)
  const orden = (a: Ficha, b: Ficha) => (puntos.get(b.id) ?? 0) - (puntos.get(a.id) ?? 0)
  return {
    fichas: candidatas.filter((f) => f.grado === grado).sort(orden).slice(0, 2),
    otrosGrados: candidatas.filter((f) => f.grado !== grado).sort((a, b) => a.grado - b.grado),
    temasDelGrado,
  }
}

// ---- Fragmentos que ve el modelo y que el docente puede abrir ----

export interface Fragmento {
  /** Etiqueta corta que cita el modelo: A1…A5 para la primera ficha, B1…B5 para la segunda. */
  etiqueta: string
  ficha: Ficha
  seccion: Seccion
}

export function fragmentos(fichas: Ficha[]): Fragmento[] {
  return fichas.flatMap((ficha, i) =>
    ficha.secciones.map((seccion, j) => ({ etiqueta: `${'AB'[i]}${j + 1}`, ficha, seccion })),
  )
}
