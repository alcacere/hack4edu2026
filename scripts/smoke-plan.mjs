// Smoke test del plan de estudio con Chrome headless vía CDP (sin dependencias).
// Uso: node scripts/smoke-plan.mjs <url> [esperaMs]
//   SMOKE_TEXT="…"       lo que escribe el docente.   SMOKE_GRADO=5  grado elegido a mano después (si faltaba).
//   SMOKE_PROHIBIDAS=a,b palabras que no deben llegar al modelo.
//   SMOKE_SHOT=x.png     captura final.               SMOKE_WIDTH=375  ancho de ventana.
// Muestra: campos entendidos, fichas, plan, avisos, métricas, peticiones a /llm y peticiones externas.
import { spawn } from 'node:child_process'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const url = process.argv[2] || 'http://localhost:5173/'
const waitMs = Number(process.argv[3] || 180000)
const texto = process.env.SMOKE_TEXT || 'Plan de estudio para 5.º de primaria sobre el ciclo del agua, 2 sesiones de 45 minutos'
const chrome = process.env.CHROME || 'google-chrome'
const width = Number(process.env.SMOKE_WIDTH || 900)
const port = 9333 + Math.floor(Math.random() * 500)
const profile = mkdtempSync(join(tmpdir(), 'smoke-chrome-'))
const proc = spawn(chrome, ['--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, `--window-size=${width},1400`, '--no-first-run',
  ...(process.env.SMOKE_NO_SANDBOX ? ['--no-sandbox'] : []), 'about:blank'], { stdio: 'ignore' })
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
  const consola = []
  ws.addEventListener('message', (ev) => {
    const msg = JSON.parse(ev.data)
    if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg.result); pending.delete(msg.id) }
    if (msg.method === 'Network.requestWillBeSent') {
      requests.push(msg.params.request.url)
      if (msg.params.request.url.includes('/llm/')) llmBodies.push(msg.params.request.postData ?? '')
    }
    if (msg.method === 'Runtime.exceptionThrown') consola.push(msg.params.exceptionDetails.text)
  })
  const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })) })
  const evaluate = async (expr) => (await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true })).result.value
  const waitFor = async (expr, ms = 10000) => { const t = Date.now(); while (Date.now() - t < ms) { if (await evaluate(expr)) return true; await sleep(200) } return false }
  const submit = () => evaluate(`document.querySelector('form button[type=submit]').click()`)
  const fin = `!!(document.querySelector('[data-plan]') || document.querySelector('[role=alert]') || document.querySelector('[data-sin-material]'))`

  await send('Network.enable')
  await send('Runtime.enable')
  await send('Page.enable')
  // Ancho real: la ventana headless no baja de unos 500 px.
  if (process.env.SMOKE_WIDTH) await send('Emulation.setDeviceMetricsOverride', { width, height: 800, deviceScaleFactor: 1, mobile: true })
  await send('Page.navigate', { url })
  if (!(await waitFor(`!!document.querySelector('#pedido')`, 20000))) throw new Error('No aparece el cuadro de pedido.')
  await evaluate(`(() => { const t = document.querySelector('#pedido');
    Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value').set.call(t, ${JSON.stringify(texto)});
    t.dispatchEvent(new Event('input', { bubbles: true })); })()`)
  await sleep(100)
  if (process.env.SMOKE_SHOT_INICIO) {
    const s = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true })
    writeFileSync(process.env.SMOKE_SHOT_INICIO, Buffer.from(s.data, 'base64'))
  }
  await submit()
  const t0 = Date.now()
  await sleep(300)
  const faltaGrado = await evaluate(`document.querySelector('[data-falta-grado]')?.innerText ?? null`)
  if (faltaGrado && process.env.SMOKE_GRADO) {
    await evaluate(`(() => { const s = document.querySelector('#grado');
      Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, 'value').set.call(s, ${JSON.stringify(process.env.SMOKE_GRADO)});
      s.dispatchEvent(new Event('change', { bubbles: true })); })()`)
    await sleep(100)
    await submit()
  }
  if (process.env.SMOKE_SHOT_LOADING) {
    await sleep(1500)
    const s = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true })
    writeFileSync(process.env.SMOKE_SHOT_LOADING, Buffer.from(s.data, 'base64'))
  }
  const fuentesAlInstante = await evaluate(`[...document.querySelectorAll('[data-ficha]')].map(f => f.dataset.ficha)`)
  if (!faltaGrado || process.env.SMOKE_GRADO) await waitFor(fin, waitMs)
  const segundos = (Date.now() - t0) / 1000
  await evaluate(`document.querySelector('[data-fuente]')?.click()`)
  await sleep(150)
  const resultado = await evaluate(`({
    grado: document.querySelector('#grado').value, tema: document.querySelector('#tema').value,
    sesiones: document.querySelector('#sesiones').value, minutos: document.querySelector('#minutos').value,
    fichas: [...document.querySelectorAll('[data-ficha]')].map(f => f.dataset.ficha),
    sinMaterial: document.querySelector('[data-sin-material]')?.innerText ?? null,
    aviso: document.querySelector('[data-aviso-borrador]')?.innerText ?? null,
    sesionesVistas: document.querySelectorAll('[data-sesion]').length,
    enfoque: document.querySelector('[data-enfoque]')?.innerText ?? null,
    ideas: document.querySelectorAll('[data-idea]').length,
    pasos: [...document.querySelectorAll('[data-paso]')].map(p => p.innerText.replace(/\\n/g, ' ')),
    microaccion: document.querySelector('[data-microaccion]')?.innerText.replace(/\\n/g, ' ') ?? null,
    fragmentoAbierto: document.querySelector('[data-fragmento]')?.innerText.slice(0, 120) ?? null,
    metricas: document.querySelector('[data-metricas]')?.innerText.replace(/\\n/g, ' ') ?? null,
    alerta: document.querySelector('[role=alert]')?.innerText.replace(/\\n/g, ' ') ?? null,
    scrollHorizontal: document.documentElement.scrollWidth > window.innerWidth,
    anchoVentana: window.innerWidth,
    conexion: document.querySelector('[data-conexion]')?.innerText.replace(/\\n/g, ' ') ?? null,
  })`)
  // SMOKE_OTRA=1: pulsa «Otra versión» y devuelve los pasos de la segunda versión.
  let otra = null
  if (process.env.SMOKE_OTRA) {
    const antes = await evaluate(`document.querySelector('[data-enfoque]')?.innerText`)
    await evaluate(`document.querySelector('[data-otra-version]')?.click()`)
    await sleep(500)
    await waitFor(`!document.querySelector('[data-generando]') && !!document.querySelector('[data-plan]')`, waitMs)
    otra = await evaluate(`({ enfoqueAntes: ${JSON.stringify('')} , enfoque: document.querySelector('[data-enfoque]')?.innerText, pasos: [...document.querySelectorAll('[data-paso]')].map(p => p.innerText.replace(/\\n/g, ' ')), microaccion: document.querySelector('[data-microaccion]')?.innerText.replace(/\\n/g,' ') })`)
    otra.enfoqueAntes = antes
  }
  if (process.env.SMOKE_SHOT) {
    const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true })
    writeFileSync(process.env.SMOKE_SHOT, Buffer.from(shot.data, 'base64'))
  }
  // SMOKE_INTERACT=1: edita un paso, copia y guarda el PDF de la impresión.
  let interaccion = null
  if (process.env.SMOKE_INTERACT) {
    await send('Browser.grantPermissions', { origin: new URL(url).origin, permissions: ['clipboardReadWrite', 'clipboardSanitizedWrite'] })
    await send('Page.bringToFront')
    await evaluate(`(() => { const e = document.querySelector('[data-paso] [data-editable]'); e.focus(); document.execCommand('selectAll'); document.execCommand('insertText', false, 'PASO EDITADO POR EL DOCENTE') })()`)
    await evaluate(`[...document.querySelectorAll('[data-plan] button')].find(b => b.textContent === 'Copiar').click()`)
    await sleep(300)
    const copiado = await evaluate(`navigator.clipboard.readText()`)
    interaccion = { editadoEnCopia: copiado?.includes('PASO EDITADO POR EL DOCENTE'), controlesEnCopia: copiado?.includes('Imprimir') || /Puedes cambiar cualquier/.test(copiado ?? ''), fuenteEnCopia: copiado?.includes('Basado en:'), inicioCopia: copiado?.slice(0, 160) }
    const pdf = await send('Page.printToPDF', { printBackground: true })
    if (process.env.SMOKE_PDF) writeFileSync(process.env.SMOKE_PDF, Buffer.from(pdf.data, 'base64'))
  }
  // SMOKE_OFFLINE=1: corta la red del navegador y lee el indicador de conexión.
  let conexionSinRed = null
  if (process.env.SMOKE_OFFLINE) {
    await send('Network.emulateNetworkConditions', { offline: true, latency: 0, downloadThroughput: 0, uploadThroughput: 0 })
    await sleep(300)
    conexionSinRed = await evaluate(`document.querySelector('[data-conexion]')?.innerText ?? null`)
  }
  const origin = new URL(url).origin
  console.log(JSON.stringify({
    texto, segundos, faltaGrado, fuentesAlInstante, ...resultado, otra, interaccion, conexionSinRed, llmCalls: llmBodies.length,
    textoEnPayload: llmBodies.some((b) => b.includes(texto)),
    // SMOKE_PROHIBIDAS=a,b: palabras que no pueden aparecer en ninguna petición al modelo (datos de alumnos).
    prohibidasEnPayload: (process.env.SMOKE_PROHIBIDAS || '').split(',').filter((w) => w && llmBodies.some((b) => b.includes(w))),
    llmPayloadUser: llmBodies.map((b) => { try { return JSON.parse(b).messages.at(-1).content.slice(0, 200) } catch { return b } }),
    external: requests.filter((u) => !u.startsWith(origin) && !u.startsWith('data:')), errores: consola,
  }, null, 2))
} finally {
  ws?.close()
  proc.kill()
  await sleep(300)
  rmSync(profile, { recursive: true, force: true })
}
