// Comprueba la biblioteca sin modelo ni red. Uso: npm run library:check (Node ≥ 22.6).
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { buscar, parseFicha, parsePedido, type Ficha } from '../ai/library/search.ts'

const raiz = new URL('../library/fichas', import.meta.url).pathname
const rutas = readdirSync(raiz, { recursive: true, encoding: 'utf8' }).filter((r) => r.endsWith('.md'))
let fallos = 0
const fallo = (m: string) => {
  fallos++
  console.error(`  ✗ ${m}`)
}

const fichas: Ficha[] = []
for (const r of rutas) {
  try {
    fichas.push(parseFicha(readFileSync(join(raiz, r), 'utf8'), r))
  } catch (e) {
    fallo((e as Error).message)
  }
}
const ids = fichas.map((f) => f.id)
for (const id of new Set(ids)) if (ids.filter((x) => x === id).length > 1) fallo(`id duplicado: ${id}`)
console.log(`${fichas.length} fichas, ${fichas.filter((f) => f.revisado).length} revisadas por una persona`)
console.table(fichas.map((f) => ({ id: f.id, grado: f.grado, area: f.area, tema: f.tema, revisado: f.revisado })))

// Lo que el docente escribe → lo que se debe entender y encontrar.
const casos: { texto: string; grado: number | null; sesiones?: number; minutos?: number; ficha?: string; otros?: string; nada?: boolean }[] = [
  { texto: 'Plan de estudio para 5.º sobre el ciclo del agua', grado: 5, ficha: 'cyt-5-ciclo-agua' },
  { texto: 'please generate a study plan for 5 grade students about the water cycle', grado: 5, ficha: 'cyt-5-ciclo-agua' },
  { texto: 'Plan para quinto de primaria sobre el ciclo del agua, 2 sesiones de 50 minutos', grado: 5, sesiones: 2, minutos: 50, ficha: 'cyt-5-ciclo-agua' },
  { texto: 'Plan sobre el ciclo del agua para 3er grado', grado: 3, ficha: 'cyt-3-ciclo-agua' },
  { texto: 'lesson on fractions for 5th grade', grado: 5, ficha: 'mat-5-fracciones' },
  { texto: 'Quiero una clase de 3.º de primaria sobre fracciones', grado: 3, ficha: 'mat-3-fracciones' },
  { texto: 'Plan para 4.º sobre el ciclo del agua', grado: 4, otros: 'cyt-3-ciclo-agua' },
  { texto: 'Plan para 5.º sobre la fotosíntesis', grado: 5, nada: true },
  { texto: 'Plan para 5.º sobre el ciclo de las rocas', grado: 5, nada: true },
  { texto: 'Plan sobre el ciclo del agua', grado: null },
  { texto: '2 sesiones de 45 minutos sobre el agua', grado: null, sesiones: 2, minutos: 45 },
  { texto: '🙂🙂🙂📚📚', grado: null },
]
for (const c of casos) {
  const p = parsePedido(c.texto)
  const antes = fallos
  if (p.grado !== c.grado) fallo(`«${c.texto}»: grado ${p.grado}, esperaba ${c.grado}`)
  if (c.sesiones && p.sesiones !== c.sesiones) fallo(`«${c.texto}»: sesiones ${p.sesiones}, esperaba ${c.sesiones}`)
  if (c.minutos && p.minutos !== c.minutos) fallo(`«${c.texto}»: minutos ${p.minutos}, esperaba ${c.minutos}`)
  if (c.grado) {
    const b = buscar(fichas, c.grado, p.tema)
    if (c.ficha && b.fichas[0]?.id !== c.ficha) fallo(`«${c.texto}»: ficha ${b.fichas[0]?.id}, esperaba ${c.ficha}`)
    if (c.otros && (b.fichas.length || !b.otrosGrados.some((f) => f.id === c.otros))) fallo(`«${c.texto}»: debía ofrecer ${c.otros} sin usarla`)
    if (c.nada && (b.fichas.length || b.otrosGrados.length)) fallo(`«${c.texto}»: no debía encontrar nada, encontró ${[...b.fichas, ...b.otrosGrados].map((f) => f.id)}`)
  }
  if (fallos === antes) console.log(`  ✓ ${c.texto}`)
}
if (fallos) {
  console.error(`${fallos} fallos`)
  process.exit(1)
}
console.log('Biblioteca correcta.')
