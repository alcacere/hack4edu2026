// Graba fixtures/plan.json con respuestas REALES del modelo, una por ficha. Uso: npm run record:plan
// Las métricas son las medidas en esta ejecución; nunca se escriben a mano.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { fragmentos, parseFicha } from '../ai/library/search.ts'
import { extractJsonObject } from '../ai/json.ts'
import { esquemaPlan, validatePlan } from '../ai/schemas.ts'

const raiz = new URL('..', import.meta.url).pathname
const base = process.env.LLM_BASE_URL || 'http://localhost:11435/v1'
const model = process.env.LLM_MODEL || 'gemma4:e2b'
const prompt = readFileSync(join(raiz, 'ai/prompts/plan.md'), 'utf8')
const dir = join(raiz, 'library/fichas')
const fichas = readdirSync(dir, { recursive: true, encoding: 'utf8' })
  .filter((r) => r.endsWith('.md'))
  .map((r) => parseFicha(readFileSync(join(dir, r), 'utf8'), r))

const entries = []
for (const f of fichas) {
  const sesiones = f.id === 'cyt-5-ciclo-agua' ? 2 : 1
  const frs = fragmentos([f])
  const fuentes = frs.map((x) => x.etiqueta)
  const user = [
    `Grado: ${f.grado}.º de primaria. Área: ${f.area}. Tema: ${f.tema}.`,
    `Sesiones: ${sesiones}, de 45 minutos como máximo cada una.`,
    'Aula: el alumnado no tiene dispositivos ni conexión.',
    'FRAGMENTOS:',
    ...frs.map((x) => `[${x.etiqueta}] ${x.seccion.titulo}: ${x.seccion.texto}`),
  ].join('\n')
  for (let intento = 1; intento <= 3; intento++) {
    const t0 = performance.now()
    const r = await fetch(`${base}/chat/completions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model, stream: false, reasoning_effort: 'none', max_tokens: 900,
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
