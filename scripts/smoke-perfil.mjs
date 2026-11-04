// Smoke test del flujo 1 (perfil, #6) con Chrome headless vía CDP (sin dependencias).
// Uso: node scripts/smoke-perfil.mjs <url> [esperaMs]
//   SMOKE_ANSWERS=0,0,0,0,1  opciones elegidas (0–4, o «s» para saltar). Por defecto E1 (nivel bajo).
//   SMOKE_CORREGIR=B2        tras el resultado, corrige el nivel a mano (criterio P6).
//   SMOKE_SHOT=fichero.png   captura de pantalla final.  SMOKE_WIDTH=375 ancho de ventana (A6).
// Muestra: preguntas vistas, nivel, explicación, aviso, métricas, alerta, nivel en sesión y peticiones.
import { spawn } from 'node:child_process'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const url = process.argv[2] || 'http://localhost:5173/'
const waitMs = Number(process.argv[3] || 5000)
const answers = (process.env.SMOKE_ANSWERS || '0,0,0,0,1').split(',').map((s) => s.trim())
const chrome = process.env.CHROME || 'google-chrome'
const width = Number(process.env.SMOKE_WIDTH || 900)
const port = 9333 + Math.floor(Math.random() * 500)
const profile = mkdtempSync(join(tmpdir(), 'smoke-chrome-'))
const proc = spawn(
  chrome,
  ['--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, `--window-size=${width},1400`, '--no-first-run',
    ...(process.env.SMOKE_NO_SANDBOX ? ['--no-sandbox'] : []), 'about:blank'],
  { stdio: 'ignore' },
)
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

let ws
try {
  let targets
  for (let i = 0; i < 300; i++) {
    try { targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); break } catch { await sleep(200) }
  }
  if (!targets) throw new Error(`Chrome no arrancó (${chrome}). Prueba CHROME=<ruta> o SMOKE_NO_SANDBOX=1.`)
  ws = new WebSocket(targets.find((t) => t.type === 'page').webSocketDebuggerUrl)
  await new Promise((r) => ws.addEventListener('open', r, { once: true }))
  let id = 0
  const pending = new Map()
  const requests = []
  const llmBodies = []
  ws.addEventListener('message', (ev) => {
    const msg = JSON.parse(ev.data)
    if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg.result); pending.delete(msg.id) }
    if (msg.method === 'Network.requestWillBeSent') {
      requests.push(msg.params.request.url)
      if (msg.params.request.url.includes('/llm/')) llmBodies.push(msg.params.request.postData ?? '')
    }
  })
  const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })) })
  const evaluate = async (expr) => (await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true })).result.value
  const click = (text) => evaluate(`(() => { const b = [...document.querySelectorAll('button')].find(b => b.textContent.includes(${JSON.stringify(text)}) && !b.disabled); b?.click(); return !!b })()`)
  const waitFor = async (expr, ms = 10000) => { const t = Date.now(); while (Date.now() - t < ms) { if (await evaluate(expr)) return true; await sleep(150) } return false }

  await send('Network.enable')
  await send('Page.enable')
  await send('Page.navigate', { url })
  await waitFor(`!!document.querySelector('#modelo')`)
  await evaluate(`sessionStorage.clear()`)
  if (!(await click('Conocerte'))) throw new Error('No encuentro el botón «Conocerte: 5 preguntas».')
  await waitFor(`[...document.querySelectorAll('button')].some(b => b.textContent.includes('Empezar'))`)
  await click('Empezar')
  const preguntas = []
  for (let i = 0; i < 5; i++) {
    await waitFor(`!!document.querySelector('fieldset input[type=radio]')`)
    preguntas.push(await evaluate(`document.querySelector('fieldset h2')?.textContent`))
    const a = answers[i] ?? '0'
    const ok = await evaluate(`(() => { const r = document.querySelector('fieldset input[value=${JSON.stringify(a === 's' ? 'skip' : a)}]'); r?.click(); return !!r })()`)
    if (!ok) throw new Error(`No encuentro la opción ${a} en la pregunta ${i + 1}.`)
    await sleep(100)
    await evaluate(`document.querySelector('button[type=submit]').click()`)
    await sleep(150)
  }
  const preguntasTrasCinco = await evaluate(`!!document.querySelector('fieldset')`)
  await waitFor(`!!document.querySelector('[data-perfil-resultado]')`)
  await waitFor(`!!(document.querySelector('[data-metricas]') || document.querySelector('[role=alert]'))`, waitMs)
  const resultado = await evaluate(`({
    nivel: document.querySelector('[data-nivel]')?.innerText ?? null,
    explicacion: document.querySelector('[data-explicacion]')?.innerText ?? null,
    primerPaso: [...document.querySelectorAll('[data-perfil-resultado] p')].find(p => p.textContent.startsWith('Un primer paso'))?.innerText ?? null,
    aviso: document.querySelector('[data-aviso-orientativo]')?.innerText ?? null,
    controlCorregir: !!document.querySelector('#corregir-nivel'),
    metricas: document.querySelector('[data-metricas]')?.innerText.replace(/\\n/g, ' ') ?? null,
    alerta: document.querySelector('[role=alert]')?.innerText.replace(/\\n/g, ' ') ?? null,
    scrollHorizontal: document.documentElement.scrollWidth > window.innerWidth,
  })`)
  let correccion = null
  if (process.env.SMOKE_CORREGIR) {
    await evaluate(`(() => { const s = document.querySelector('#corregir-nivel');
      Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, 'value').set.call(s, ${JSON.stringify(process.env.SMOKE_CORREGIR)});
      s.dispatchEvent(new Event('change', { bubbles: true })); })()`)
    await sleep(300)
    correccion = await evaluate(`({ nivel: document.querySelector('[data-nivel]')?.innerText,
      confirmacion: document.querySelector('#corregir-nivel ~ [role=status]')?.innerText })`)
    await click('Volver al inicio')
    await sleep(200)
    correccion.cabecera = await evaluate(`document.querySelector('[data-nivel-sesion]')?.innerText ?? null`)
  }
  const sesion = await evaluate(`sessionStorage.getItem('ceiba.perfil.v1')`)
  if (process.env.SMOKE_SHOT) {
    if (process.env.SMOKE_CORREGIR) { await click('Ver o cambiar'); await sleep(300) }
    const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true })
    writeFileSync(process.env.SMOKE_SHOT, Buffer.from(shot.data, 'base64'))
  }
  const origin = new URL(url).origin
  console.log(JSON.stringify({
    url, answers, preguntasVistas: preguntas.length, preguntas, preguntasTrasCinco, ...resultado, correccion, sesion,
    llmCalls: llmBodies.length, llmPayloadUser: llmBodies.map((b) => { try { return JSON.parse(b).messages.at(-1).content } catch { return b } }),
    external: requests.filter((u) => !u.startsWith(origin) && !u.startsWith('data:')),
  }, null, 2))
} finally {
  ws?.close()
  proc.kill()
  await sleep(300)
  rmSync(profile, { recursive: true, force: true })
}
