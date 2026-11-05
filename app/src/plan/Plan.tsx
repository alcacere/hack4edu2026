// Flujo 2 · Plan de estudio: pedido → fichas de la biblioteca → borrador editable con cada paso citado.
// Lo que escribe el docente solo se usa aquí para buscar: al modelo le llegan los campos y las fichas (ver mensajePlan).
import { useEffect, useMemo, useRef, useState } from 'react'
import {
  AIError,
  biblioteca,
  buscar,
  config,
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
  'min-h-11 rounded-lg px-4 font-semibold focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-500 disabled:cursor-not-allowed disabled:opacity-50'
const btnPrimary = `${btn} bg-emerald-800 text-white hover:bg-emerald-900`
const btnSecondary = `${btn} border-2 border-stone-700 text-stone-800 hover:bg-stone-100`
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
  const ultimoTexto = useRef('')
  const abortRef = useRef<AbortController | null>(null)
  const planRef = useRef<HTMLDivElement>(null)

  useEffect(() => () => abortRef.current?.abort(), [])
  useEffect(() => {
    if (gen.status !== 'loading') return
    setSegundos(0)
    const t = setInterval(() => setSegundos((s) => s + 1), 1000)
    return () => clearInterval(t)
  }, [gen.status])

  async function generar(fichas: Ficha[], g: number, ses: number, min: number) {
    abortRef.current?.abort()
    const ctrl = new AbortController()
    abortRef.current = ctrl
    setCopiado(false)
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

  function usarOtroGrado(ficha: Ficha) {
    if (grado === null) return
    setBusqueda({ fichas: [ficha], otrosGrados: [], temasDelGrado: [] })
    void generar([ficha], grado, sesiones, minutos)
  }

  async function copiar() {
    if (!planRef.current) return
    await navigator.clipboard.writeText(planRef.current.innerText)
    setCopiado(true)
  }

  const cargando = gen.status === 'loading'

  return (
    <div className="flex flex-col gap-4">
      <form
        className="no-print flex flex-col gap-3 rounded-xl border border-stone-300 bg-white p-4 shadow-sm"
        onSubmit={(e) => {
          e.preventDefault()
          preparar()
        }}
      >
        <div>
          <label htmlFor="pedido" className={etiqueta}>
            {es.plan.pedidoEtiqueta}
          </label>
          <textarea
            id="pedido"
            rows={2}
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder={es.plan.pedidoEjemplo}
            className="mt-1 w-full rounded-lg border border-stone-400 bg-white p-3 text-base focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-600"
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
              className={`${campo} ${faltaGrado ? 'border-2 border-red-700' : ''}`}
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
          <input type="checkbox" checked={sinDispositivos} onChange={(e) => setSinDispositivos(e.target.checked)} className="size-5" />
          {es.plan.sinDispositivos}
        </label>

        <div className="flex flex-wrap gap-2">
          <button type="submit" disabled={cargando || (!texto.trim() && !tema.trim())} className={btnPrimary}>
            {es.plan.generar}
          </button>
          {cargando && (
            <button type="button" className={btnSecondary} onClick={() => abortRef.current?.abort()}>
              {es.comun.cancelar}
            </button>
          )}
        </div>
      </form>

      <section aria-live="polite" className="flex flex-col gap-4">
        {faltaGrado && (
          <p role="alert" data-falta-grado className="rounded-xl border-2 border-amber-700 bg-amber-50 p-4 font-semibold text-amber-950">
            {es.plan.faltaGrado}
          </p>
        )}

        {busqueda && !busqueda.fichas.length && grado !== null && (
          <SinMaterial busqueda={busqueda} grado={grado} onTema={preparar} onOtroGrado={usarOtroGrado} />
        )}

        {busqueda && busqueda.fichas.length > 0 && <Fuentes fichas={busqueda.fichas} grado={grado} />}

        {cargando && (
          <p data-generando className="no-print rounded-xl border border-stone-300 bg-white p-4 text-stone-800">
            {es.plan.generando} <span className="font-semibold tabular-nums">{segundos} s</span>
            {segundos > 90 && <span className="block text-sm">{es.comun.pensandoLento}</span>}
          </p>
        )}

        {gen.status === 'error' && (
          <div role="alert" className="no-print rounded-xl border-2 border-red-700 bg-red-50 p-4 text-red-900">
            <p className="font-semibold">{es.errores.titulo}</p>
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
          <article data-plan className="rounded-xl border border-emerald-300 bg-emerald-50 p-4">
            <p data-aviso-borrador className="rounded-lg border-2 border-amber-700 bg-amber-100 p-2 text-sm font-semibold text-amber-950">
              {es.plan.avisoBorrador}
            </p>
            <div ref={planRef}>
              <PlanVista plan={gen.out.data} fichas={gen.fichas} />
            </div>
            <p className="mt-3 text-sm text-stone-800">{es.plan.consultarColega}</p>
            <div className="no-print mt-3 flex flex-wrap gap-2">
              <button type="button" className={btnSecondary} onClick={() => window.print()}>
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
    <div data-sin-material className="rounded-xl border-2 border-stone-500 bg-white p-4">
      <p className="font-semibold text-stone-900">{es.plan.sinMaterial(grado)}</p>
      <p className="mt-1 text-stone-800">{es.plan.sinMaterialAyuda}</p>
      {busqueda.otrosGrados.length > 0 && (
        <div className="mt-3" data-otros-grados>
          <p className="text-sm font-semibold text-stone-800">{es.plan.otrosGrados(grado)}</p>
          <div className="mt-1 flex flex-wrap gap-2">
            {busqueda.otrosGrados.map((f) => (
              <button key={f.id} type="button" className={btnSecondary} onClick={() => onOtroGrado(f)}>
                {es.plan.usarFichaDe(f.grado, f.tema)}
              </button>
            ))}
          </div>
        </div>
      )}
      {busqueda.temasDelGrado.length > 0 && (
        <div className="mt-3" data-temas-grado>
          <p className="text-sm font-semibold text-stone-800">{es.plan.temasDisponibles(grado)}</p>
          <div className="mt-1 flex flex-wrap gap-2">
            {busqueda.temasDelGrado.map((t) => (
              <button key={t} type="button" className={btnSecondary} onClick={() => onTema(t)}>
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
    <div data-fuentes className="no-print rounded-xl border border-stone-300 bg-white p-4">
      <h2 className="font-semibold text-stone-900">{es.plan.fuentesTitulo}</h2>
      <ul className="mt-2 flex flex-col gap-3">
        {fichas.map((f) => (
          <li key={f.id} data-ficha={f.id}>
            <p className="text-stone-900">
              <span className="font-semibold">{f.tema}</span> · {es.plan.gradoNombre(f.grado)} · {f.area}
            </p>
            {grado !== null && f.grado !== grado && <p className="text-sm font-semibold text-amber-900">{es.plan.fichaDeOtroGrado(f.grado, grado)}</p>}
            <p className="text-sm text-stone-700">
              {f.fuente}
              {!f.revisado && <span className="ml-2 rounded bg-amber-100 px-1 font-semibold text-amber-950">{es.plan.sinRevisar}</span>}
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

function PlanVista({ plan, fichas }: { plan: PlanOut; fichas: Ficha[] }) {
  const frags = useMemo(() => fragmentos(fichas), [fichas])
  const [abierta, setAbierta] = useState<string | null>(null)
  return (
    <div className="mt-3 flex flex-col gap-4 text-stone-900">
      <p className="no-print text-sm text-stone-700">{es.plan.editableAyuda}</p>
      <Editable as="h2" className="block text-xl font-bold">
        {plan.titulo}
      </Editable>
      <p>
        <span className="font-semibold">{es.plan.objetivo}: </span>
        <Editable>{plan.objetivo}</Editable>
      </p>
      {plan.sesiones.map((s, i) => (
        <section key={i} data-sesion>
          <h3 className="font-semibold">
            {es.plan.sesionNumero(i + 1)}: <Editable>{s.titulo}</Editable> · {es.plan.minutos(s.minutos)}
          </h3>
          <ol className="mt-1 list-decimal pl-6">
            {s.pasos.map((p, j) => {
              const clave = `${i}-${j}`
              const frag = frags.find((f) => f.etiqueta === p.fuente)
              return (
                <li key={j} className="mt-1" data-paso>
                  <Editable>{p.texto}</Editable>{' '}
                  <button
                    type="button"
                    data-fuente={p.fuente}
                    aria-expanded={abierta === clave}
                    className="no-print rounded border border-emerald-800 px-1 text-sm text-emerald-900 hover:bg-emerald-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
                    onClick={() => setAbierta(abierta === clave ? null : clave)}
                  >
                    {frag ? frag.seccion.titulo : p.fuente}
                  </button>
                  {abierta === clave && frag && (
                    <blockquote data-fragmento className="no-print mt-1 border-l-4 border-emerald-700 bg-white p-2 text-sm">
                      <p className="font-semibold">
                        {frag.ficha.tema} · {es.plan.gradoNombre(frag.ficha.grado)} · {frag.seccion.titulo}
                      </p>
                      {frag.seccion.texto}
                      <p className="mt-1 text-stone-700">{frag.ficha.fuente}</p>
                    </blockquote>
                  )}
                </li>
              )
            })}
          </ol>
        </section>
      ))}
      <section>
        <h3 className="font-semibold">{es.plan.materiales}</h3>
        <ul className="list-disc pl-6">
          {plan.materiales.map((m, i) => (
            <li key={i}>
              <Editable>{m}</Editable>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h3 className="font-semibold">{es.plan.comprobacion}</h3>
        <ul className="list-disc pl-6">
          {plan.comprobacion.map((c, i) => (
            <li key={i}>
              <Editable>{c}</Editable>
            </li>
          ))}
        </ul>
      </section>
      <section data-microaccion className="rounded-lg border border-emerald-400 bg-white p-3">
        <h3 className="font-semibold">{es.plan.bloques.microaccion}</h3>
        <Editable>{plan.microaccion}</Editable>
      </section>
      {config.demoMode && <p className="no-print text-sm text-stone-700">{es.demo.origen}</p>}
    </div>
  )
}
