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
  /** curada: escrita para enseñar, con actividades. articulo: enciclopedia libre + guía del grado. */
  tipo: 'curada' | 'articulo'
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
    tipo: 'curada',
    secciones,
  }
}

// ---- Fichas a partir de artículos descargados (library/temas.json + library/articulos.json) ----

export interface DatosTemas {
  guiaCiclo: Record<string, string>
  temas: { area: string; tema: string; grados: number[]; articulo: string; alias: string[] }[]
}
export interface DatosArticulos {
  articulos: { articulo: string; titulo: string; fuente: string; url: string; revision: number; licencia: string; secciones: Seccion[] }[]
}

const cicloDe = (grado: number) => (grado <= 2 ? 'III' : grado <= 4 ? 'IV' : 'V')
const slug = (s: string) => quitarAcentos(s.toLowerCase()).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

export function fichasDeArticulos({ guiaCiclo, temas }: DatosTemas, { articulos }: DatosArticulos): Ficha[] {
  return temas.flatMap((t) => {
    const a = articulos.find((x) => x.articulo === t.articulo)
    if (!a) return []
    return t.grados.map((grado) => ({
      id: `art-${slug(t.tema)}-${grado}`,
      grado,
      area: t.area,
      tema: t.tema,
      alias: t.alias,
      competencia: '',
      fuente: `${a.fuente}, «${a.titulo}», revisión ${a.revision} (${a.licencia})`,
      url: a.url,
      revisado: false,
      tipo: 'articulo' as const,
      secciones: [{ titulo: 'Qué debe lograr', texto: guiaCiclo[cicloDe(grado)] }, ...a.secciones],
    }))
  })
}

/** Un artículo no cabe entero en el contexto del modelo: guía del grado + los pasajes más relevantes. */
export function recortarFicha(f: Ficha, consulta: string, maxCaracteres = 2800): Ficha {
  if (f.tipo !== 'articulo') return f
  const q = new Set([...tokens(consulta), ...tokens(f.tema), ...f.alias.flatMap(tokens)])
  const [guia, intro, ...resto] = f.secciones
  const orden = resto
    .map((s, i) => ({ s, i, puntos: tokens(`${s.titulo} ${s.texto}`).filter((t) => q.has(t)).length / Math.sqrt(s.texto.length + 1) }))
    .sort((a, b) => b.puntos - a.puntos)
  let total = guia.texto.length + (intro?.texto.length ?? 0)
  const elegidas: typeof orden = []
  for (const o of orden) {
    if (total + o.s.texto.length > maxCaracteres) continue
    elegidas.push(o)
    total += o.s.texto.length
  }
  elegidas.sort((a, b) => a.i - b.i)
  return { ...f, secciones: [guia, ...(intro ? [intro] : []), ...elegidas.map((e) => e.s)] }
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
  const temasDelGrado = [...new Set(biblioteca.filter((f) => f.grado === grado).map((f) => f.tema))]
  if (!consulta.length) return { fichas: [], otrosGrados: [], temasDelGrado }
  const candidatas = biblioteca.filter((f) => cubre(f, consulta))
  const puntos = puntuar(candidatas, consulta)
  const pedidas = new Set(consulta)
  // Primero la ficha cuyo nombre es justo lo pedido («la tierra» → La Tierra, no El suelo).
  const nombreExacto = (f: Ficha) => (tokens(f.tema).every((t) => pedidas.has(t)) ? 100 : 0)
  const orden = (a: Ficha, b: Ficha) => nombreExacto(b) + (puntos.get(b.id) ?? 0) - nombreExacto(a) - (puntos.get(a.id) ?? 0)
  const delGrado = candidatas.filter((f) => f.grado === grado).sort(orden)
  // Las fichas curadas mandan: enseñan mejor que un artículo. Un artículo solo, porque el contexto es limitado.
  const curadas = delGrado.filter((f) => f.tipo === 'curada')
  const fichas = curadas.length ? curadas.slice(0, 2) : delGrado.slice(0, 1).map((f) => recortarFicha(f, tema))
  return {
    fichas,
    otrosGrados: candidatas
      .filter((f) => f.grado !== grado)
      // Una opción por grado y tema; la curada, si existe.
      .sort((a, b) => a.grado - b.grado || Number(b.tipo === 'curada') - Number(a.tipo === 'curada'))
      .filter((f, i, l) => l.findIndex((x) => x.grado === f.grado && (x.tema === f.tema || x.tipo !== f.tipo)) === i)
      .map((f) => recortarFicha(f, tema)),
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

// ---- Lo que recibe el modelo ----

/** El modelo puede proponer una actividad sin fuente, si la ficha no trae ninguna; la interfaz lo indica. */
export const FUENTE_IDEA = 'IDEA'

export function fuentesPermitidas(fichas: Ficha[]): string[] {
  const etiquetas = fragmentos(fichas).map((f) => f.etiqueta)
  return fichas.some((f) => f.tipo === 'articulo') ? [...etiquetas, FUENTE_IDEA] : etiquetas
}

export interface DatosPlan {
  grado: number
  fichas: Ficha[]
  sesiones: number
  minutos: number
  sinDispositivos: boolean
  nivelNombre?: string
  /** Forma de plantear la clase; da variedad entre planes. Viene de una lista fija, nunca de texto libre. */
  enfoque?: string
}

/** Mensaje para el modelo. El texto libre del docente NO entra aquí: solo datos elegidos y fichas. */
export function mensajePlan(input: DatosPlan): string {
  return [
    `Grado: ${input.grado}.º de primaria. Área: ${input.fichas[0].area}. Tema: ${input.fichas[0].tema}.`,
    `Sesiones: ${input.sesiones}, de ${input.minutos} minutos como máximo cada una.`,
    input.sinDispositivos ? 'Aula: el alumnado no tiene dispositivos ni conexión.' : 'Aula: puede haber algún dispositivo, pero el plan debe funcionar sin ellos.',
    ...(input.enfoque ? [`Enfoque de este plan: ${input.enfoque}. Que se note en los pasos.`] : []),
    ...(input.nivelNombre ? [`Experiencia digital del docente: ${input.nivelNombre}. Tenla en cuenta solo en la micro-acción.`] : []),
    'FRAGMENTOS:',
    ...fragmentos(input.fichas).map((f) => `[${f.etiqueta}] ${f.seccion.titulo}: ${f.seccion.texto}`),
  ].join('\n')
}
