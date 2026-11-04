// Smoke test de la ruta de demo con Chrome headless vía CDP (sin dependencias).
// Uso: node scripts/smoke-browser.mjs <url> [esperaMs]
// Abre la URL, pulsa «Saludar al mentor», espera y muestra: insignia demo, texto, métricas,
// alertas y TODAS las peticiones de red que no son al propio origen.
import { spawn } from 'node:child_process'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const url = process.argv[2] || 'http://localhost:5173/'
const waitMs = Number(process.argv[3] || 3000)
const chrome = process.env.CHROME || 'google-chrome'
const port = 9333 + Math.floor(Math.random() * 500)
const profile = mkdtempSync(join(tmpdir(), 'smoke-chrome-'))
const proc = spawn(chrome, ['--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, '--no-first-run', ...(process.env.SMOKE_NO_SANDBOX ? ['--no-sandbox'] : []), 'about:blank'], { stdio: 'ignore' })
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

let ws
try {
  let targets
  // Hasta 60 s: con poca RAM libre (p. ej. un modelo cargado en Ollama) Chrome tarda en arrancar.
  for (let i = 0; i < 300; i++) {
    try { targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); break } catch { await sleep(200) }
  }
  if (!targets) throw new Error(`Chrome no arrancó (${chrome}). Prueba CHROME=<ruta> o SMOKE_NO_SANDBOX=1.`)
  const page = targets.find((t) => t.type === 'page')
  ws = new WebSocket(page.webSocketDebuggerUrl)
  await new Promise((r) => ws.addEventListener('open', r, { once: true }))
  let id = 0
  const pending = new Map()
  const requests = []
  ws.addEventListener('message', (ev) => {
    const msg = JSON.parse(ev.data)
    if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg.result); pending.delete(msg.id) }
    if (msg.method === 'Network.requestWillBeSent') requests.push(msg.params.request.url)
  })
  const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })) })
  const evaluate = async (expr) => (await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true })).result.value

  await send('Network.enable')
  await send('Page.enable')
  await send('Page.navigate', { url })
  for (let i = 0; i < 100; i++) {
    if (await evaluate(`!!document.querySelector('#modelo')`)) break
    await sleep(200)
  }
  const before = await evaluate(`({ title: document.title, badge: document.querySelector('[role=status]')?.textContent ?? null,
    models: [...document.querySelectorAll('#modelo option')].map(o => o.value), selectDisabled: document.querySelector('#modelo')?.disabled })`)
  if (process.env.SMOKE_MODEL) {
    // Cambia el selector como lo haría un usuario (setter nativo + evento change para React).
    await evaluate(`(() => { const s = document.querySelector('#modelo');
      Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, 'value').set.call(s, ${JSON.stringify(process.env.SMOKE_MODEL)});
      s.dispatchEvent(new Event('change', { bubbles: true })); })()`)
    await sleep(200)
  }
  await evaluate(`[...document.querySelectorAll('button')].find(b => b.textContent.includes('Saludar'))?.click()`)
  const t0 = Date.now()
  while (Date.now() - t0 < waitMs) {
    if (await evaluate(`!!(document.querySelector('article p') || document.querySelector('[role=alert]'))`)) break
    await sleep(200)
  }
  const after = await evaluate(`({ answer: document.querySelector('article p')?.textContent ?? null,
    metrics: document.querySelector('article dl')?.innerText.replace(/\\n/g,' ') ?? null,
    alert: document.querySelector('[role=alert]')?.innerText.replace(/\\n/g,' ') ?? null,
    stillUsable: !!document.querySelector('button') })`)
  if (process.env.SMOKE_SHOT) {
    // Captura PNG de la página tal cual queda (para docs/pitch/).
    const { writeFileSync } = await import('node:fs')
    const shot = await send('Page.captureScreenshot', { format: 'png' })
    writeFileSync(process.env.SMOKE_SHOT, Buffer.from(shot.data, 'base64'))
  }
  const origin = new URL(url).origin
  const external = requests.filter((u) => !u.startsWith(origin) && !u.startsWith('data:'))
  const llmCalls = requests.filter((u) => u.includes('/llm/'))
  console.log(JSON.stringify({ url, ...before, ...after, requests: requests.length, llmCalls, external }, null, 2))
} finally {
  ws?.close()
  proc.kill()
  await sleep(300)
  rmSync(profile, { recursive: true, force: true })
}
