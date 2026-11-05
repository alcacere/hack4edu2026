// Flujo 2 · Plan de estudio: pedido → fichas de la biblioteca → borrador editable con cada paso citado.
// Lo que escribe el docente solo se usa aquí para buscar: al modelo le llegan los campos y las fichas (ver mensajePlan).
import { useEffect, useMemo, useRef, useState } from 'react'
import {
  AIError,
  biblioteca,
  buscar,
  fragmentos,
  parsePedido,
  planClase,
  type Busqueda,
  type Ficha,
  type JsonResult,
  type PlanOut,
} from '@ai/index'
import { Metricas } from '../Metricas'
import { es } from '../copy/es'
import { textoError } from '../perfil/Perfil'
import { useNivelSesion } from '../session'

const btn =
  'min-h-11 rounded-lg px-4 font-semibold transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-500 disabled:cursor-not-allowed disabled:opacity-50'
const btnPrimary = `${btn} bg-emerald-800 text-white hover:bg-emerald-900`
const btnSecondary = `${btn} border border-stone-500 bg-white text-stone-800 hover:bg-stone-100`
const chip =
  'min-h-11 rounded-full border border-stone-400 bg-white px-3 py-1 text-left text-sm text-stone-800 transition-colors hover:border-emerald-700 hover:bg-emerald-50 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-500'
const campo = 'mt-1 min-h-11 w-full rounded-lg border border-stone-400 bg-white px-3 text-base focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-600'
const etiqueta = 'block text-sm font-semibold text-stone-800'

const GRADOS = [1, 2, 3, 4, 5, 6]
const limitar = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n))

type Generacion =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'done'; out: JsonResult<PlanOut>; fichas: Ficha[] }
  | { status: 'error'; error: { docente: string; tecnico: string } }

export function Plan({ model }: { model: string }) {
  const { nivel } = useNivelSesion()
  const [texto, setTexto] = useState('')
  const [grado, setGrado] = useState<number | null>(null)
  const [tema, setTema] = useState('')
  const [sesiones, setSesiones] = useState(1)
  const [minutos, setMinutos] = useState(45)
  const [sinDispositivos, setSinDispositivos] = useState(true)
  const [faltaGrado, setFaltaGrado] = useState(false)
  const [busqueda, setBusqueda] = useState<Busqueda | null>(null)
  const [gen, setGen] = useState<Generacion>({ status: 'idle' })
  const [segundos, setSegundos] = useState(0)
  const [copiado, setCopiado] = useState(false)
  /** El docente ha pulsado «Cambiar»: el formulario se muestra aunque ya haya un plan. */
  const [cambiando, setCambiando] = useState(false)
  const ultimoTexto = useRef('')
  const abortRef = useRef<AbortController | null>(null)
  const planRef = useRef<HTMLDivElement>(null)
  const pedidoRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => () => abortRef.current?.abort(), [])
  useEffect(() => {
    if (gen.status !== 'loading') return
    setSegundos(0)
    const t = setInterval(() => setSegundos((s) => s + 1), 1000)
    return () => clearInterval(t)
  }, [gen.status])
  useEffect(() => {
    if (cambiando) pedidoRef.current?.focus()
  }, [cambiando])

  async function generar(fichas: Ficha[], g: number, ses: number, min: number) {
    abortRef.current?.abort()
    const ctrl = new AbortController()
    abortRef.current = ctrl
    setCopiado(false)
    setCambiando(false)
    setGen({ status: 'loading' })
    try {
      const out = await planClase(model, { grado: g, fichas, sesiones: ses, minutos: min, sinDispositivos, nivelNombre: nivel?.nombre }, ctrl.signal)
      setGen({ status: 'done', out, fichas })
    } catch (e) {
      if (abortRef.current !== ctrl) return // ya hay una petición más nueva
      if (ctrl.signal.aborted && !(e instanceof AIError && e.code === 'timeout')) {
        setGen({ status: 'idle' })
        return
      }
      setGen({ status: 'error', error: textoError(e) })
    }
  }

  function preparar(temaElegido?: string) {
    // El texto solo rellena los campos si ha cambiado: lo que el docente corrige a mano manda.
    let g = grado
    let t = temaElegido ?? tema
    let ses = sesiones
    let min = minutos
    if (texto.trim() && texto !== ultimoTexto.current && temaElegido === undefined) {
      const p = parsePedido(texto)
      ultimoTexto.current = texto
      g = p.grado ?? g
      t = p.tema
      ses = limitar(p.sesiones ?? ses, 1, 3)
      min = limitar(p.minutos ?? min, 15, 120)
      setGrado(g)
      setTema(t)
      setSesiones(ses)
      setMinutos(min)
    } else if (temaElegido !== undefined) {
      setTema(t)
    }
    abortRef.current?.abort()
    setGen({ status: 'idle' })
    setBusqueda(null)
    if (!t.trim()) return
    if (g === null) {
      setFaltaGrado(true)
      return
    }
    setFaltaGrado(false)
    const b = buscar(biblioteca, g, t)
    setBusqueda(b)
    if (b.fichas.length) void generar(b.fichas, g, ses, min)
  }

  /** Atajo desde los temas de la biblioteca: un clic y empieza. */
  function usarFicha(f: Ficha) {
    setTexto('')
    ultimoTexto.current = ''
    setGrado(f.grado)
    setTema(f.tema)
    setFaltaGrado(false)
    setBusqueda({ fichas: [f], otrosGrados: [], temasDelGrado: [] })
    void generar([f], f.grado, sesiones, minutos)
  }

  function usarOtroGrado(ficha: Ficha) {
    if (grado === null) return
    setBusqueda({ fichas: [ficha], otrosGrados: [], temasDelGrado: [] })
    void generar([ficha], grado, sesiones, minutos)
  }

  async function copiar() {
    if (!planRef.current) return
    // Se copia el plan tal como se imprimiría, con los cambios del docente y sin los controles.
    const copia = planRef.current.cloneNode(true) as HTMLElement
    copia.querySelectorAll('.no-print').forEach((n) => n.remove())
    copia.querySelectorAll('.solo-impresion').forEach((n) => ((n as HTMLElement).style.display = 'block'))
    copia.style.cssText = 'position:absolute;left:-9999px;width:600px'
    document.body.append(copia)
    const plano = copia.innerText
    copia.remove()
    await navigator.clipboard.writeText(plano)
    setCopiado(true)
  }

  const cargando = gen.status === 'loading'
  const fichasEnUso = busqueda?.fichas ?? []
  const plegado = gen.status !== 'idle' && fichasEnUso.length > 0 && !cambiando
  const fichasOrdenadas = useMemo(() => [...biblioteca].sort((a, b) => a.grado - b.grado || a.tema.localeCompare(b.tema)), [])

  return (
    <div className="flex flex-col gap-4">
      {plegado && (
        <div data-resumen className="no-print flex flex-wrap items-center justify-between gap-2 rounded-xl border border-stone-300 bg-white px-4 py-2">
          <p className="text-stone-900">
            <span className="font-semibold">{grado !== null ? es.plan.gradoNombre(grado) : ''}</span>
            {' · '}
            {fichasEnUso[0].tema}
            {' · '}
            {es.plan.duracion(sesiones, minutos)}
          </p>
          {!cargando && (
            <button type="button" className={`${btn} text-emerald-900 underline underline-offset-2 hover:bg-stone-100`} onClick={() => setCambiando(true)}>
              {es.plan.cambiarPedido}
            </button>
          )}
        </div>
      )}

      <form
        hidden={plegado}
        className="no-print flex flex-col gap-3 rounded-xl border border-stone-300 bg-white p-4 shadow-sm sm:p-5"
        onSubmit={(e) => {
          e.preventDefault()
          preparar()
        }}
      >
        <div>
          <label htmlFor="pedido" className="block font-serif text-xl font-semibold text-emerald-900">
            {es.plan.pedidoEtiqueta}
          </label>
          <textarea
            id="pedido"
            ref={pedidoRef}
            rows={2}
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder={es.plan.pedidoEjemplo}
            className="mt-2 w-full rounded-lg border border-stone-400 bg-white p-3 text-base placeholder:text-stone-600 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-600"
          />
          <p className="mt-1 text-sm text-stone-700">{es.plan.avisoDatosAlumnos}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div>
            <label htmlFor="grado" className={etiqueta}>
              {es.plan.gradoEtiqueta}
            </label>
            <select
              id="grado"
              value={grado ?? ''}
              onChange={(e) => {
                setGrado(e.target.value ? Number(e.target.value) : null)
                setFaltaGrado(false)
              }}
              className={`${campo} ${faltaGrado ? 'border-2 border-barro-700' : ''}`}
            >
              <option value="">{es.plan.gradoElegir}</option>
              {GRADOS.map((g) => (
                <option key={g} value={g}>
                  {es.plan.gradoNombre(g)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="tema" className={etiqueta}>
              {es.plan.temaEtiqueta}
            </label>
            <input id="tema" value={tema} onChange={(e) => setTema(e.target.value)} className={campo} />
          </div>
          <div>
            <label htmlFor="sesiones" className={etiqueta}>
              {es.plan.sesionesEtiqueta}
            </label>
            <select id="sesiones" value={sesiones} onChange={(e) => setSesiones(Number(e.target.value))} className={campo}>
              {[1, 2, 3].map((n) => (
                <option key={n}>{n}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="minutos" className={etiqueta}>
              {es.plan.minutosEtiqueta}
            </label>
            <input
              id="minutos"
              type="number"
              min={15}
              max={120}
              step={5}
              value={minutos}
              onChange={(e) => setMinutos(limitar(Number(e.target.value) || 45, 15, 120))}
              className={campo}
            />
          </div>
        </div>

        <label className="flex min-h-11 items-center gap-2 text-base text-stone-800">
          <input type="checkbox" checked={sinDispositivos} onChange={(e) => setSinDispositivos(e.target.checked)} className="size-5 accent-emerald-800" />
          {es.plan.sinDispositivos}
        </label>

        <div>
          <button type="submit" disabled={cargando || (!texto.trim() && !tema.trim())} className={btnPrimary}>
            {es.plan.generar}
          </button>
        </div>
      </form>

      {gen.status === 'idle' && !busqueda && !faltaGrado && (
        <section data-temas-biblioteca className="no-print">
          <h2 className="text-sm font-semibold text-stone-800">{es.plan.temasBiblioteca}</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {fichasOrdenadas.map((f) => (
              <button key={f.id} type="button" className={chip} onClick={() => usarFicha(f)}>
                <span className="font-semibold text-emerald-900">{f.grado}.º</span> · {f.tema}
              </button>
            ))}
          </div>
        </section>
      )}

      <section aria-live="polite" className="flex flex-col gap-4">
        {faltaGrado && (
          <p role="alert" data-falta-grado className="rounded-xl border-l-4 border-barro-500 bg-barro-100 p-4 font-semibold text-barro-700">
            {es.plan.faltaGrado}
          </p>
        )}

        {busqueda && !busqueda.fichas.length && grado !== null && (
          <SinMaterial busqueda={busqueda} grado={grado} onTema={preparar} onOtroGrado={usarOtroGrado} />
        )}

        {cargando && <Progreso fichas={fichasEnUso} segundos={segundos} onCancelar={() => abortRef.current?.abort()} />}

        {fichasEnUso.length > 0 && <Fuentes fichas={fichasEnUso} grado={grado} />}

        {cargando && <Esqueleto />}

        {gen.status === 'error' && (
          <div role="alert" className="no-print rounded-xl border-l-4 border-barro-500 bg-barro-100 p-4 text-stone-900">
            <p className="font-semibold text-barro-700">{es.errores.titulo}</p>
            <p className="mt-1">{gen.error.docente}</p>
            <details className="mt-2 text-sm">
              <summary className="cursor-pointer">{es.errores.verDetalle}</summary>
              {gen.error.tecnico}
            </details>
            <div className="mt-3 flex flex-wrap gap-3">
              <button type="button" className={btnSecondary} onClick={() => preparar()}>
                {es.comun.reintentar}
              </button>
              <a className="flex min-h-11 items-center underline" href="?demo=1">
                {es.errores.abrirDemo}
              </a>
            </div>
          </div>
        )}

        {gen.status === 'done' && (
          <article data-plan className="hoja rounded-sm border border-stone-300 bg-white p-5 shadow-md sm:p-10">
            <div ref={planRef}>
              <PlanVista plan={gen.out.data} fichas={gen.fichas} grado={grado} />
            </div>
            <div className="no-print mt-6 flex flex-wrap items-center gap-2 border-t border-stone-300 pt-4">
              <button type="button" className={btnPrimary} onClick={() => window.print()}>
                {es.plan.imprimir}
              </button>
              <button type="button" className={btnSecondary} onClick={() => void copiar()}>
                {copiado ? es.comun.copiado : es.comun.copiar}
              </button>
            </div>
            <div className="no-print">
              <Metricas result={gen.out.result} intentos={gen.out.intentos} />
            </div>
          </article>
        )}
      </section>
    </div>
  )
}

function Progreso({ fichas, segundos, onCancelar }: { fichas: Ficha[]; segundos: number; onCancelar: () => void }) {
  const hecho = (texto: string) => (
    <li className="flex items-center gap-2 text-stone-800">
      <span className="grid size-5 place-items-center rounded-full bg-emerald-800 text-xs text-white" aria-hidden="true">
        ✓
      </span>
      {texto}
    </li>
  )
  return (
    <div data-generando className="no-print flex flex-wrap items-center justify-between gap-3 rounded-xl border border-stone-300 bg-white p-4">
      <ol className="flex flex-col gap-1">
        {hecho(es.plan.pasoEntendido)}
        {hecho(es.plan.pasoFicha(fichas[0].tema))}
        <li className="flex items-center gap-2 font-semibold text-stone-900">
          <span className="size-5 animate-spin rounded-full border-2 border-stone-300 border-t-emerald-800 motion-reduce:animate-none" aria-hidden="true" />
          {es.plan.generando} <span className="tabular-nums">{segundos} s</span>
        </li>
        {segundos > 90 && <li className="text-sm text-stone-700">{es.comun.pensandoLento}</li>}
      </ol>
      <button type="button" className={btnSecondary} onClick={onCancelar}>
        {es.comun.cancelar}
      </button>
    </div>
  )
}

/** Silueta de la hoja mientras el modelo redacta. */
function Esqueleto() {
  const linea = (ancho: string) => <div className={`h-3 rounded bg-stone-100 ${ancho}`} />
  return (
    <div aria-hidden="true" className="no-print flex animate-pulse flex-col gap-3 rounded-sm border border-stone-300 bg-white p-5 shadow-md motion-reduce:animate-none sm:p-10">
      <div className="h-6 w-1/2 rounded bg-stone-100" />
      {linea('w-full')}
      {linea('w-5/6')}
      <div className="mt-3 h-4 w-1/3 rounded bg-stone-100" />
      {linea('w-11/12')}
      {linea('w-full')}
      {linea('w-4/5')}
    </div>
  )
}

function SinMaterial({
  busqueda,
  grado,
  onTema,
  onOtroGrado,
}: {
  busqueda: Busqueda
  grado: number
  onTema: (tema: string) => void
  onOtroGrado: (f: Ficha) => void
}) {
  return (
    <div data-sin-material className="rounded-xl border border-stone-300 bg-white p-5">
      <p className="font-serif text-lg font-semibold text-stone-900">{es.plan.sinMaterial(grado)}</p>
      <p className="mt-1 text-stone-800">{es.plan.sinMaterialAyuda}</p>
      {busqueda.otrosGrados.length > 0 && (
        <div className="mt-3" data-otros-grados>
          <p className="text-sm font-semibold text-stone-800">{es.plan.otrosGrados(grado)}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {busqueda.otrosGrados.map((f) => (
              <button key={f.id} type="button" className={chip} onClick={() => onOtroGrado(f)}>
                {es.plan.usarFichaDe(f.grado, f.tema)}
              </button>
            ))}
          </div>
        </div>
      )}
      {busqueda.temasDelGrado.length > 0 && (
        <div className="mt-3" data-temas-grado>
          <p className="text-sm font-semibold text-stone-800">{es.plan.temasDisponibles(grado)}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {busqueda.temasDelGrado.map((t) => (
              <button key={t} type="button" className={chip} onClick={() => onTema(t)}>
                {t}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function Fuentes({ fichas, grado }: { fichas: Ficha[]; grado: number | null }) {
  return (
    <div data-fuentes className="no-print border-l-4 border-emerald-600 pl-3 text-sm">
      <h2 className="font-semibold text-stone-800">{es.plan.fuentesTitulo}</h2>
      <ul className="mt-1 flex flex-col gap-1">
        {fichas.map((f) => (
          <li key={f.id} data-ficha={f.id}>
            <p className="text-stone-900">
              {f.tema} · {es.plan.gradoNombre(f.grado)} · {f.area}
            </p>
            {grado !== null && f.grado !== grado && <p className="font-semibold text-barro-700">{es.plan.fichaDeOtroGrado(f.grado, grado)}</p>}
            <p className="text-xs text-stone-700">
              {f.fuente}
              {!f.revisado && <span className="ml-2 rounded bg-barro-100 px-1.5 py-0.5 font-semibold whitespace-nowrap text-barro-700">{es.plan.sinRevisar}</span>}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

/** Texto que el docente puede cambiar directamente en el borrador. */
function Editable({ children, as: Tag = 'span', className }: { children: string; as?: 'span' | 'h2' | 'h3'; className?: string }) {
  return (
    <Tag contentEditable suppressContentEditableWarning data-editable className={`rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 ${className ?? ''}`}>
      {children}
    </Tag>
  )
}

function Bloque({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <section>
      <h3 className="text-sm font-semibold tracking-wide text-emerald-800 uppercase">{titulo}</h3>
      {children}
    </section>
  )
}

function PlanVista({ plan, fichas, grado }: { plan: PlanOut; fichas: Ficha[]; grado: number | null }) {
  const frags = useMemo(() => fragmentos(fichas), [fichas])
  const [abierta, setAbierta] = useState<string | null>(null)
  return (
    <div className="flex flex-col gap-5 text-stone-900">
      <p data-aviso-borrador className="flex gap-2 text-sm font-semibold text-barro-700">
        <span aria-hidden="true" className="no-print">
          ●
        </span>
        {es.plan.avisoBorrador}
      </p>
      <header className="border-b-2 border-emerald-800 pb-3">
        {grado !== null && (
          <p className="text-sm font-semibold text-stone-700">
            {es.plan.gradoNombre(grado)} · {fichas[0].area}
          </p>
        )}
        <Editable as="h2" className="block font-serif text-3xl leading-tight font-semibold text-emerald-900">
          {plan.titulo}
        </Editable>
        <p className="mt-2 text-lg leading-snug">
          <span className="font-semibold">{es.plan.objetivo}: </span>
          <Editable>{plan.objetivo}</Editable>
        </p>
      </header>
      <p className="no-print text-sm text-stone-700">{es.plan.editableAyuda}</p>
      {plan.sesiones.map((s, i) => (
        <section key={i} data-sesion>
          <div className="flex items-start justify-between gap-3">
            <h3 className="min-w-0 font-serif text-xl leading-snug font-semibold">
              {es.plan.sesionNumero(i + 1)}: <Editable>{s.titulo}</Editable>
            </h3>
            <span className="mt-0.5 shrink-0 rounded-full bg-emerald-100 px-2.5 py-0.5 text-sm font-semibold whitespace-nowrap text-emerald-900">{es.plan.minutos(s.minutos)}</span>
          </div>
          <ol className="mt-2 flex list-decimal flex-col gap-2 pl-6 marker:font-semibold marker:text-emerald-800">
            {s.pasos.map((p, j) => {
              const clave = `${i}-${j}`
              const frag = frags.find((f) => f.etiqueta === p.fuente)
              return (
                <li key={j} className="pl-1 leading-relaxed" data-paso>
                  <Editable>{p.texto}</Editable>{' '}
                  <button
                    type="button"
                    data-fuente={p.fuente}
                    aria-expanded={abierta === clave}
                    className="no-print inline-flex min-h-6 items-center rounded border border-stone-300 px-1.5 align-baseline text-xs whitespace-nowrap text-stone-700 transition-colors hover:border-emerald-700 hover:bg-emerald-50 hover:text-emerald-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
                    onClick={() => setAbierta(abierta === clave ? null : clave)}
                  >
                    {frag ? frag.seccion.titulo : p.fuente}
                  </button>
                  {abierta === clave && frag && (
                    <blockquote data-fragmento className="no-print mt-2 rounded-r border-l-4 border-emerald-600 bg-stone-50 p-3 text-sm">
                      <p className="font-semibold">
                        {frag.ficha.tema} · {es.plan.gradoNombre(frag.ficha.grado)} · {frag.seccion.titulo}
                      </p>
                      <p className="mt-1">{frag.seccion.texto}</p>
                      <p className="mt-1 text-xs text-stone-700">{frag.ficha.fuente}</p>
                    </blockquote>
                  )}
                </li>
              )
            })}
          </ol>
        </section>
      ))}
      <div className="grid gap-5 sm:grid-cols-2 print:grid-cols-2">
        <Bloque titulo={es.plan.materiales}>
          <ul className="mt-1 list-disc pl-5 marker:text-emerald-700">
            {plan.materiales.map((m, i) => (
              <li key={i}>
                <Editable>{m}</Editable>
              </li>
            ))}
          </ul>
        </Bloque>
        <Bloque titulo={es.plan.comprobacion}>
          <ul className="mt-1 list-disc pl-5 marker:text-emerald-700">
            {plan.comprobacion.map((c, i) => (
              <li key={i}>
                <Editable>{c}</Editable>
              </li>
            ))}
          </ul>
        </Bloque>
      </div>
      <section data-microaccion className="rounded-r-lg border-l-4 border-barro-500 bg-barro-100 p-4">
        <h3 className="font-semibold text-barro-700">{es.plan.bloques.microaccion}</h3>
        <Editable className="mt-1 block">{plan.microaccion}</Editable>
        <p className="mt-2 text-sm text-stone-800">{es.plan.consultarColega}</p>
      </section>
      <p className="solo-impresion text-xs text-stone-700">
        {es.plan.basadoEn}: {fichas.map((f) => `${f.tema} (${es.plan.gradoNombre(f.grado)}), ${f.fuente}`).join('; ')}.{' '}
        {fichas.some((f) => !f.revisado) ? `${es.plan.sinRevisar}.` : ''}
      </p>
    </div>
  )
}
