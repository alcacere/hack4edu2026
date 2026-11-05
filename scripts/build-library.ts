// Descarga UNA VEZ los artículos de library/temas.json y los deja en library/articulos.json.
// Uso: npm run library:build. Después la app funciona sin internet: nunca consulta estas webs.
// Vikidia primero (escrita para niños); Wikipedia si falta o es muy corta. Guarda revisión y licencia.
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const raiz = new URL('..', import.meta.url).pathname
const { temas } = JSON.parse(readFileSync(join(raiz, 'library/temas.json'), 'utf8')) as { temas: { tema: string; articulo: string }[] }
const FUENTES = [
  { nombre: 'Vikidia', api: 'https://es.vikidia.org/w/api.php', web: 'https://es.vikidia.org/wiki/', licencia: 'CC BY-SA 3.0', licenciaUrl: 'https://creativecommons.org/licenses/by-sa/3.0/deed.es' },
  { nombre: 'Wikipedia', api: 'https://es.wikipedia.org/w/api.php', web: 'https://es.wikipedia.org/wiki/', licencia: 'CC BY-SA 4.0', licenciaUrl: 'https://creativecommons.org/licenses/by-sa/4.0/deed.es' },
]
const MIN_CARACTERES = 600
const MAX_CARACTERES = 9000
const MAX_PASAJE = 800
const SOBRAN = /^(v[eé]ase tambi[eé]n|referencias?|notas?|enlaces externos|bibliograf[ií]a|fuentes?|galer[ií]a|otros proyectos)/i
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

async function pedir(api: string, titulo: string) {
  const url = `${api}?${new URLSearchParams({ action: 'query', prop: 'extracts|revisions', rvprop: 'ids', explaintext: '1', redirects: '1', format: 'json', titles: titulo })}`
  for (let i = 0; i < 3; i++) {
    const r = await fetch(url, { headers: { 'User-Agent': 'hack4edu-library-builder/0.1' } })
    if (r.ok) {
      const p: any = Object.values((await r.json()).query.pages)[0]
      return p.missing !== undefined ? null : { titulo: p.title as string, texto: (p.extract ?? '') as string, revision: p.revisions?.[0]?.revid as number }
    }
    console.log(`  (HTTP ${r.status} en ${titulo}; espero)`)
    await sleep(r.status === 429 ? 15000 : 2000)
  }
  return null
}

/** Trocea por secciones y párrafos, sin apartados de enlaces, en pasajes de hasta MAX_PASAJE caracteres. */
function pasajes(texto: string) {
  const out: { titulo: string; texto: string }[] = []
  let total = 0
  let ignorar = false
  let actual = 'Introducción'
  let buffer = ''
  const volcar = () => {
    if (buffer.trim().length > 60 && total < MAX_CARACTERES) {
      out.push({ titulo: actual, texto: buffer.trim() })
      total += buffer.length
    }
    buffer = ''
  }
  for (const bruta of texto.split('\n')) {
    const linea = bruta.trim()
    const cab = linea.match(/^==+\s*(.*?)\s*==+$/)
    if (cab) {
      volcar()
      actual = cab[1]
      ignorar = SOBRAN.test(actual)
      continue
    }
    if (ignorar || !linea) continue
    if (buffer.length + linea.length > MAX_PASAJE) volcar()
    buffer += (buffer ? ' ' : '') + linea.replace(/\s+/g, ' ').slice(0, MAX_PASAJE)
  }
  volcar()
  return out
}

// Reanudable: lo ya descargado no se vuelve a pedir, así las revisiones no cambian sin querer.
const destino = join(raiz, 'library/articulos.json')
const previos: any[] = existsSync(destino) ? JSON.parse(readFileSync(destino, 'utf8')).articulos : []
const articulos: any[] = [...previos]
const fallos: string[] = []
const vistos = new Set<string>(previos.map((a) => a.articulo))
for (const t of temas) {
  if (vistos.has(t.articulo)) continue
  let elegido = null
  for (const f of FUENTES) {
    const p = await pedir(f.api, t.articulo)
    await sleep(f.nombre === 'Wikipedia' ? 1500 : 200)
    if (!p || p.texto.length < MIN_CARACTERES || /puede referirse a|desambiguaci[oó]n/i.test(p.texto.slice(0, 300))) continue
    const secciones = pasajes(p.texto)
    if (!secciones.length) continue
    elegido = { articulo: t.articulo, titulo: p.titulo, fuente: f.nombre, url: f.web + encodeURIComponent(p.titulo.replace(/ /g, '_')), revision: p.revision, licencia: f.licencia, licenciaUrl: f.licenciaUrl, secciones }
    break
  }
  if (elegido) {
    articulos.push(elegido)
    vistos.add(t.articulo)
    console.log(`✓ ${elegido.fuente.padEnd(9)} ${t.articulo} (${elegido.secciones.length} pasajes)`)
  } else {
    fallos.push(`${t.tema} → ${t.articulo}`)
    console.log(`✗ ${t.articulo}`)
  }
}
writeFileSync(
  join(raiz, 'library/articulos.json'),
  `${JSON.stringify({ descargado: new Date().toISOString().slice(0, 10), articulos })}\n`,
)
writeFileSync(
  join(raiz, 'library/ATRIBUCIONES.md'),
  `# Atribuciones de los artículos\n\nTexto de los artículos descargado el ${new Date().toISOString().slice(0, 10)}, recortado y troceado (sin apartados de enlaces). Se distribuye bajo la misma licencia que cada original. Autoría: las personas editoras de cada artículo, en el historial de su página.\n\n${articulos
    .map((a) => `- [${a.titulo}](${a.url}), ${a.fuente}, revisión ${a.revision}. [${a.licencia}](${a.licenciaUrl}).`)
    .join('\n')}\n`,
)
const v = articulos.filter((a) => a.fuente === 'Vikidia').length
console.log(`\n${articulos.length} artículos (${v} Vikidia, ${articulos.length - v} Wikipedia). Fallos: ${fallos.length}`)
fallos.forEach((f) => console.log(`  - ${f}`))
