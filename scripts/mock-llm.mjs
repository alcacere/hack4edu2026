// Servidor de prueba compatible OpenAI (sin dependencias). Sirve para probar la ruta "real"
// sin Ollama: `npm run mock-llm` y en otra terminal `LLM_BASE_URL=http://localhost:11555/v1 npm run dev`.
// MOCK_DELAY_MS controla la espera (útil para probar el timeout). NO es un modelo: responde un texto fijo.
// Por defecto responde texto NO JSON (sirve para probar el reintento único, criterio F2: 2 peticiones).
// MOCK_JSON=1: si la petición pide JSON (response_format), responde un JSON válido del flujo perfil.
import http from 'node:http'

const port = Number(process.env.MOCK_PORT || 11555)
const delay = Number(process.env.MOCK_DELAY_MS || 300)
const mockJson = process.env.MOCK_JSON === '1'
let n = 0

http
  .createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/v1/chat/completions') {
      let body = ''
      req.on('data', (c) => (body += c))
      req.on('end', () => {
        const { model = 'mock', response_format, messages = [] } = JSON.parse(body || '{}')
        const nivel = String(messages.at(-1)?.content ?? '').match(/código ([ABC][12])/)?.[1] ?? 'A1'
        const content =
          response_format && mockJson
            ? JSON.stringify({ nivel, explicacion: `[mock ${model}] Explicación de prueba. No soy un modelo.`, primerPaso: '[mock] Primer paso de prueba: coméntalo con un colega.' })
            : `[mock ${model}] Hola, soy el servidor de prueba. No soy un modelo.`
        console.log(`#${++n} ${new Date().toISOString()} json=${!!response_format}`)
        setTimeout(() => {
          res.writeHead(200, { 'Content-Type': 'application/json' })
          res.end(
            JSON.stringify({
              model,
              choices: [{ message: { role: 'assistant', content } }],
              usage: { prompt_tokens: 50, completion_tokens: 20 },
            }),
          )
        }, delay)
      })
      return
    }
    res.writeHead(404).end()
  })
  .listen(port, () => console.log(`mock-llm en http://localhost:${port}/v1 (delay ${delay} ms)`))
