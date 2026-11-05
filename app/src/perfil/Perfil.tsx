// Flujo 1 · Perfil rápido (#6). 5 preguntas → punto de partida orientativo que el docente puede corregir.
import { useEffect, useRef, useState } from 'react'
import { AIError, perfilRapido, type JsonResult, type PerfilOut } from '@ai/index'
import { Metricas } from '../Metricas'
import { es } from '../copy/es'
import { useNivelSesion } from '../session'
import { calcularResultado, NIVELES, nivelPorCode, PREGUNTAS, type NivelCode, type Respuesta, type Resultado } from './datos'

const btn =
  'min-h-11 rounded-lg px-4 font-semibold focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-500 disabled:cursor-not-allowed disabled:opacity-50'
const btnPrimary = `${btn} bg-emerald-800 text-white hover:bg-emerald-900`
const btnSecondary = `${btn} border-2 border-stone-700 text-stone-800 hover:bg-stone-100`

type Eleccion = Respuesta | 'skip' | undefined

export function Perfil({ model, onSalir }: { model: string; onSalir: () => void }) {
  const { perfil, nivel, guardarResultado, corregir } = useNivelSesion()
  // -1 = intro; 0..4 = pregunta; 5 = resultado
  const [paso, setPaso] = useState(perfil ? PREGUNTAS.length : -1)
  const [elecciones, setElecciones] = useState<Eleccion[]>(() => PREGUNTAS.map(() => undefined))
  const [ia, setIa] = useState<{ status: 'idle' | 'loading' | 'done' | 'error'; out?: JsonResult<PerfilOut>; error?: { docente: string; tecnico: string } }>({
    status: 'idle',
  })
  const [aviso, setAviso] = useState<string | null>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    headingRef.current?.focus()
  }, [paso])
  useEffect(() => () => abortRef.current?.abort(), [])

  async function explicar(resultado: Resultado, respuestas: Respuesta[]) {
    abortRef.current?.abort()
    const ctrl = new AbortController()
    abortRef.current = ctrl
    setIa({ status: 'loading' })
    const n = nivelPorCode(resultado.code)
    try {
      const out = await perfilRapido(
        model,
        {
          nivelCode: n.code,
          nivelNombre: n.nombre,
          areaBaja: resultado.areaBaja,
          respuestas: PREGUNTAS.flatMap((p, i) => {
            const r = respuestas[i]
            return r === null || r === undefined ? [] : [{ area: p.area, respuesta: p.opciones[r] }]
          }),
        },
        ctrl.signal,
      )
      setIa({ status: 'done', out })
    } catch (e) {
      if (ctrl.signal.aborted && !(e instanceof AIError && e.code === 'timeout')) return
      setIa({ status: 'error', error: textoError(e) })
    }
  }

  function terminar() {
    const respuestas: Respuesta[] = elecciones.map((e) => (e === 'skip' || e === undefined ? null : e))
    const resultado = calcularResultado(respuestas)
    guardarResultado(resultado)
    setAviso(null)
    setPaso(PREGUNTAS.length)
    void explicar(resultado, respuestas)
  }

  function repetir() {
    abortRef.current?.abort()
    setElecciones(PREGUNTAS.map(() => undefined))
    setIa({ status: 'idle' })
    setAviso(null)
    setPaso(0)
  }

  // ---- Intro ----
  if (paso === -1) {
    return (
      <section className="rounded-xl border border-stone-300 bg-white p-4 shadow-sm" aria-labelledby="perfil-h">
        <h2 id="perfil-h" ref={headingRef} tabIndex={-1} className="text-xl font-bold text-emerald-900 focus:outline-none">
          {es.perfil.titulo}
        </h2>
        <p className="mt-2 text-base">{es.perfil.intro}</p>
        <p className="mt-1 text-base">{es.perfil.introSaltar}</p>
        <p className="mt-1 text-base text-stone-700">{es.bienvenida.opcionPerfilAyuda}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button type="button" className={btnPrimary} onClick={() => setPaso(0)}>
            Empezar
          </button>
          <button type="button" className={btnSecondary} onClick={onSalir}>
            Volver
          </button>
        </div>
      </section>
    )
  }

  // ---- Preguntas ----
  if (paso < PREGUNTAS.length) {
    const p = PREGUNTAS[paso]
    const actual = elecciones[paso]
    const ultima = paso === PREGUNTAS.length - 1
    const elegir = (v: Eleccion) => setElecciones((prev) => prev.map((e, i) => (i === paso ? v : e)))
    return (
      <section className="rounded-xl border border-stone-300 bg-white p-4 shadow-sm">
        <form
          onSubmit={(ev) => {
            ev.preventDefault()
            if (actual === undefined) return
            if (ultima) terminar()
            else setPaso(paso + 1)
          }}
        >
          <fieldset>
            <legend className="w-full">
              <span className="block text-sm font-semibold text-stone-700">
                {es.perfil.progreso(paso + 1, PREGUNTAS.length)}
              </span>
              <h2 ref={headingRef} tabIndex={-1} className="mt-1 text-xl font-bold text-emerald-900 focus:outline-none">
                {p.texto}
              </h2>
            </legend>
            <div className="mt-3 flex flex-col gap-2">
              {[...p.opciones.map((o, i) => ({ v: i as Respuesta, label: o })), { v: 'skip' as const, label: es.comun.saltar }].map(
                ({ v, label }) => (
                  <label
                    key={String(v)}
                    className={`flex min-h-11 cursor-pointer items-center gap-3 rounded-lg border-2 px-3 py-2 text-base has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-emerald-500 ${
                      actual === v ? 'border-emerald-700 bg-emerald-50' : 'border-stone-300'
                    } ${v === 'skip' ? 'italic text-stone-700' : ''}`}
                  >
                    <input
                      type="radio"
                      name={`p${p.id}`}
                      value={String(v)}
                      checked={actual === v}
                      onChange={() => elegir(v)}
                      className="h-5 w-5 shrink-0 accent-emerald-800"
                    />
                    {label}
                  </label>
                ),
              )}
            </div>
          </fieldset>
          <div className="mt-4 flex flex-wrap gap-2">
            <button type="button" className={btnSecondary} onClick={() => (paso === 0 ? setPaso(-1) : setPaso(paso - 1))}>
              {es.comun.anterior}
            </button>
            <button type="submit" className={btnPrimary} disabled={actual === undefined}>
              {ultima ? es.perfil.verResultado : es.comun.siguiente}
            </button>
          </div>
        </form>
      </section>
    )
  }

  // ---- Resultado ----
  if (!perfil || !nivel) return null
  const propuesto = nivelPorCode(perfil.resultado.code)
  const corregido = perfil.corregido !== null
  const usarIa = ia.status === 'done' && ia.out && !corregido
  return (
    <section className="flex flex-col gap-3" aria-labelledby="resultado-h" data-perfil-resultado>
      <article className="rounded-xl border border-emerald-300 bg-emerald-50 p-4">
        <h2 id="resultado-h" ref={headingRef} tabIndex={-1} className="text-sm font-semibold uppercase tracking-wide text-emerald-900 focus:outline-none">
          {es.perfil.resultadoTitulo}
        </h2>
        <p className="mt-1 text-3xl font-bold text-emerald-950" data-nivel={nivel.code}>
          {nivel.nombre}{' '}
          <span className="text-base font-normal text-stone-700">({es.perfil.codigoOpcional(nivel.code)})</span>
          {corregido && (
            <span className="ml-2 inline-block rounded-full border-2 border-emerald-800 bg-white px-2 py-0.5 align-middle text-sm font-semibold text-emerald-900" data-corregido>
              {es.perfil.corregidoEtiqueta}
            </span>
          )}
        </p>
        {corregido && (
          <p className="mt-1 text-sm text-stone-800">
            Las 5 preguntas proponían: {propuesto.nombre} ({propuesto.code}).
          </p>
        )}

        <div aria-live="polite" className="mt-3">
          {ia.status === 'loading' && !corregido && <p className="text-stone-700">{es.perfil.calculando}</p>}
          <p className="text-lg leading-relaxed" data-explicacion>
            {usarIa ? ia.out!.data.explicacion : nivel.descripcion}
          </p>
          <p className="mt-2 text-base font-medium">{es.perfil.areaInicio(perfil.resultado.areaBaja)}</p>
          {usarIa && (
            <p className="mt-2 text-base">
              <span className="font-semibold">Un primer paso posible (decides tú):</span> {ia.out!.data.primerPaso}
            </p>
          )}
        </div>

        <p className="mt-3 rounded-lg border-2 border-amber-700 bg-amber-50 p-3 text-base font-semibold text-amber-950" data-aviso-orientativo>
          {es.perfil.avisoOrientativo} <span className="font-normal">{es.perfil.avisoUso}</span>
        </p>

        {perfil.resultado.respondidas < 3 && (
          <p className="mt-2 text-sm text-stone-800">
            Has respondido {perfil.resultado.respondidas} de 5 preguntas, así que este punto de partida es todavía más aproximado.
          </p>
        )}

        <div className="mt-4">
          <label htmlFor="corregir-nivel" className="block text-base font-semibold text-stone-900">
            {es.perfil.corregirBoton}
          </label>
          <p className="text-sm text-stone-700">{es.perfil.corregirAyuda}</p>
          <select
            id="corregir-nivel"
            value={nivel.code}
            onChange={(e) => {
              const code = e.target.value as NivelCode
              corregir(code)
              setAviso(
                code === perfil.resultado.code
                  ? `Vuelvo a usar ${nivelPorCode(code).nombre}, el que proponían las 5 preguntas.`
                  : es.perfil.corregidoConfirmacion(nivelPorCode(code).nombre),
              )
            }}
            className="mt-1 min-h-11 w-full rounded-lg border border-stone-400 bg-white px-3 text-base focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-600 sm:w-auto"
          >
            {NIVELES.map((n) => (
              <option key={n.code} value={n.code}>
                {n.nombre} ({n.code}){n.code === perfil.resultado.code ? ' · propuesto' : ''}
              </option>
            ))}
          </select>
          <p role="status" aria-live="polite" className="mt-1 min-h-6 text-base text-emerald-900">
            {aviso}
          </p>
        </div>

        <p className="mt-2 text-base">Si quieres, comenta este punto de partida con un colega o con tu mentor: dos miradas ven más que una.</p>

        <details className="mt-3 text-base">
          <summary className="cursor-pointer font-semibold text-emerald-900 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-500">
            ¿Qué significan los niveles?
          </summary>
          <ul className="mt-2 flex flex-col gap-1">
            {NIVELES.map((n) => (
              <li key={n.code}>
                <span className="font-semibold">
                  {n.nombre} ({n.code}):
                </span>{' '}
                {n.descripcion}
              </li>
            ))}
          </ul>
          <p className="mt-2 text-sm text-stone-700">
            Nombres del Marco Europeo para la Competencia Digital de los Educadores (DigCompEdu; Redecker 2017, traducción
            oficial INTEF 2020). El marco no es un instrumento de evaluación. Las 5 preguntas y sus cortes son nuestros y
            todavía no están validados.
          </p>
        </details>

        {ia.status === 'done' && ia.out && <Metricas result={ia.out.result} intentos={ia.out.intentos} />}
      </article>

      {ia.status === 'error' && !corregido && (
        <div role="alert" className="rounded-xl border-2 border-red-700 bg-red-50 p-4 text-red-900">
          <p className="font-semibold">{es.errores.titulo}</p>
          <p className="mt-1">{ia.error?.docente}</p>
          <p className="mt-1 text-sm">Mientras, te muestro la descripción general del nivel.</p>
          <details className="mt-1 text-sm">
            <summary className="cursor-pointer">{es.errores.verDetalle}</summary>
            {ia.error?.tecnico}
          </details>
          <a className="mt-1 inline-block text-sm underline" href="?demo=1">
            {es.errores.abrirDemo}
          </a>
          <button
            type="button"
            className={`${btnSecondary} mt-2 border-red-800 text-red-900`}
            onClick={() => void explicar(perfil.resultado, elecciones.map((e) => (e === 'skip' || e === undefined ? null : e)))}
          >
            {es.comun.reintentar}
          </button>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <button type="button" className={btnSecondary} onClick={repetir}>
          Repetir las 5 preguntas
        </button>
        <button type="button" className={btnSecondary} onClick={onSalir}>
          {es.comun.volverInicio}
        </button>
      </div>
    </section>
  )
}

export function textoError(e: unknown): { docente: string; tecnico: string } {
  if (!(e instanceof AIError)) return es.errores.desconocido
  switch (e.code) {
    case 'unreachable':
      return es.errores.unreachable
    case 'timeout':
      return { docente: es.errores.timeout.docente, tecnico: e.message }
    case 'http':
      return { docente: es.errores.http.docente, tecnico: e.message }
    case 'empty':
      return es.errores.empty
    case 'invalid':
      return es.errores.invalida
    case 'fixture':
      return es.errores.fixture
  }
}
