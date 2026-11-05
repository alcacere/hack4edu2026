// Graba fixtures/plan.json con respuestas REALES del modelo, una por ficha. Uso: npm run record:plan
// Las métricas son las medidas en esta ejecución; nunca se escriben a mano.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { fichasDeArticulos, fuentesPermitidas, mensajePlan, parseFicha, recortarFicha, type DatosTemas, type DatosArticulos } from '../ai/library/search.ts'
import { extractJsonObject } from '../ai/json.ts'
import { esquemaPlan, validatePlan } from '../ai/schemas.ts'

const raiz = new URL('..', import.meta.url).pathname
const base = process.env.LLM_BASE_URL || 'http://localhost:11435/v1'
const model = process.env.LLM_MODEL || 'gemma4:e2b'
const prompt = readFileSync(join(raiz, 'ai/prompts/plan.md'), 'utf8')
const dir = join(raiz, 'library/fichas')
const curadas = readdirSync(dir, { recursive: true, encoding: 'utf8' })
  .filter((r) => r.endsWith('.md'))
  .map((r) => parseFicha(readFileSync(join(dir, r), 'utf8'), r))
const leerJson = (r: string) => JSON.parse(readFileSync(join(raiz, 'library', r), 'utf8'))
const deArticulos = fichasDeArticulos(leerJson('temas.json') as DatosTemas, leerJson('articulos.json') as DatosArticulos)
// Una muestra variada de temas descargados, además de todas las curadas.
const MUESTRA = ['art-la-fotosintesis-5', 'art-los-volcanes-4', 'art-el-imperio-inca-5', 'art-la-multiplicacion-3', 'art-la-fabula-3', 'art-el-sistema-solar-4', 'art-los-terremotos-5', 'art-los-derechos-del-nino-2', 'art-la-poesia-4', 'art-el-reciclaje-1', 'art-el-cuerpo-humano-2', 'art-los-angulos-5']
const fichas = [...curadas, ...MUESTRA.map((id) => deArticulos.find((f) => f.id === id)!).map((f) => recortarFicha(f, f.tema))]
const ENFOQUES = ['observar y experimentar', 'jugar', 'contar una historia', 'resolver un problema del entorno', 'debatir en grupos', 'dibujar y construir']

const entries = []
for (const f of fichas) {
  const sesiones = f.id === 'cyt-5-ciclo-agua' ? 2 : 1
  const fuentes = fuentesPermitidas([f])
  const user = mensajePlan({ grado: f.grado, fichas: [f], sesiones, minutos: 45, sinDispositivos: true, enfoque: ENFOQUES[entries.length % ENFOQUES.length] })
  for (let intento = 1; intento <= 3; intento++) {
    const t0 = performance.now()
    const r = await fetch(`${base}/chat/completions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model, stream: false, reasoning_effort: 'none', max_tokens: 900, temperature: 0.9,
        response_format: { type: 'json_schema', json_schema: { name: 'plan', schema: esquemaPlan({ sesiones, fuentes }) } },
        messages: [{ role: 'system', content: prompt }, { role: 'user', content: user }],
      }),
    })
    const d = await r.json()
    const seg = (performance.now() - t0) / 1000
    const text = d.choices?.[0]?.message?.content ?? ''
    const v = validatePlan(extractJsonObject(text), fuentes, { sesiones, minutos: 45 })
    const tok = d.usage?.completion_tokens ?? 0
    console.log(`${f.id} intento ${intento}: ${seg.toFixed(1)} s, ${tok} tokens, ${v.ok ? 'válido' : v.error}`)
    if (v.ok) {
      entries.push({ key: f.id, text: JSON.stringify(v.value), recordedModel: model, recordedTokensPerSec: Number((tok / seg).toFixed(1)) })
      break
    }
  }
}
writeFileSync(
  join(raiz, 'fixtures/plan.json'),
  `${JSON.stringify({ flow: 'plan', version: 2, origen: `Generado por ${model} con scripts/record-fixtures.ts el ${new Date().toISOString().slice(0, 10)} en un portátil de 7,5 GB sin GPU. Sin datos de alumnos.`, entries }, null, 2)}\n`,
)
console.log(`${entries.length} de ${fichas.length} fichas grabadas`)
