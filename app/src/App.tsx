import { useRef, useState } from 'react'
import { AIError, config, holaMentor, type ChatResult } from '@ai/index'
import { Metricas } from './Metricas'
import { Perfil } from './perfil/Perfil'
import { useNivelSesion } from './session'

type Status = 'idle' | 'loading' | 'done' | 'error'
type Vista = 'inicio' | 'perfil'

export default function App() {
  const [model, setModel] = useState(config.defaultModel)
  const [vista, setVista] = useState<Vista>('inicio')
  const { nivel } = useNivelSesion()
  const [status, setStatus] = useState<Status>('idle')
  const [result, setResult] = useState<ChatResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const abortRef = useRef<AbortController | null>(null)

  async function saludar() {
    abortRef.current?.abort()
    const ctrl = new AbortController()
    abortRef.current = ctrl
    setStatus('loading')
    setError(null)
    try {
      const r = await holaMentor(model, ctrl.signal)
      setResult(r)
      setStatus('done')
    } catch (e) {
      if (ctrl.signal.aborted && !(e instanceof AIError && e.code === 'timeout')) {
        setStatus('idle')
        return
      }
      setError(e instanceof AIError ? e.message : 'Ha pasado algo inesperado al hablar con el modelo.')
      setStatus('error')
    }
  }

  function cancelar() {
    abortRef.current?.abort()
  }

  return (
    <div className="mx-auto flex min-h-dvh max-w-2xl flex-col gap-4 p-4 sm:p-6">
      <header className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-2xl font-bold text-emerald-900">Ceiba · mentor para docentes</h1>
        {config.demoMode && (
          <span
            role="status"
            className="rounded-full border-2 border-amber-700 bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-900"
          >
            Modo demo: respuestas grabadas, sin modelo ni red
          </span>
        )}
      </header>

      {nivel && vista !== 'perfil' && (
        <p className="text-base text-stone-800" data-nivel-sesion={nivel.code}>
          Tu punto de partida: <span className="font-semibold">{nivel.nombre}</span> ({nivel.code}, orientativo).{' '}
          <button type="button" className="underline focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-500" onClick={() => setVista('perfil')}>
            Ver o cambiar
          </button>
        </p>
      )}

      {vista === 'perfil' ? (
        <Perfil model={model} onSalir={() => setVista('inicio')} />
      ) : (
      <>
      <section className="rounded-xl border border-stone-300 bg-white p-4 shadow-sm">
        <label htmlFor="modelo" className="block text-sm font-semibold text-stone-800">
          Modelo
        </label>
        <div className="mt-1 flex flex-col gap-2 sm:flex-row">
          {config.models.length === 1 ? (
            // Modelo único (Gemma 4, decisión del 2026-11-04 en #1): sin selector, solo el nombre.
            <output
              id="modelo"
              className="flex min-h-11 flex-1 items-center rounded-lg border border-stone-300 bg-stone-50 px-3 text-base font-medium text-stone-900"
            >
              {model}
            </output>
          ) : (
          <select
            id="modelo"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            disabled={config.demoMode}
            className="min-h-11 flex-1 rounded-lg border border-stone-400 bg-white px-3 text-base focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-600 disabled:bg-stone-100 disabled:text-stone-600"
          >
            {config.models.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
          )}
          {status === 'loading' ? (
            <button
              type="button"
              onClick={cancelar}
              className="min-h-11 rounded-lg border-2 border-stone-700 px-4 font-semibold text-stone-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-600"
            >
              Cancelar
            </button>
          ) : (
            <button
              type="button"
              onClick={saludar}
              className="min-h-11 rounded-lg bg-emerald-800 px-4 font-semibold text-white hover:bg-emerald-900 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400"
            >
              Saludar al mentor
            </button>
          )}
          <button
            type="button"
            onClick={() => setVista('perfil')}
            className="min-h-11 rounded-lg border-2 border-emerald-800 px-4 font-semibold text-emerald-900 hover:bg-emerald-50 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400"
          >
            {nivel ? 'Mi punto de partida' : 'Conocerte: 5 preguntas'}
          </button>
        </div>
        <p className="mt-2 text-sm text-stone-700">
          {config.demoMode
            ? 'En modo demo las respuestas vienen de fixtures/: no se llama al modelo.'
            : `Modelo local vía Ollama (${config.upstreamUrl}). Coste 0 €, nada sale de este ordenador.`}
        </p>
      </section>

      <section aria-live="polite" className="flex flex-col gap-3">
        {status === 'loading' && <p className="text-stone-700">El mentor está pensando…</p>}

        {error && (
          <div role="alert" className="rounded-xl border-2 border-red-700 bg-red-50 p-4 text-red-900">
            <p className="font-semibold">{error}</p>
            <p className="mt-1 text-sm">
              Puedes volver a intentarlo{config.models.length > 1 ? ', elegir otro modelo' : ''} o abrir la demo grabada con{' '}
              <a className="underline" href="?demo=1">
                ?demo=1
              </a>
              .
            </p>
          </div>
        )}

        {result && status !== 'error' && (
          <article className="rounded-xl border border-emerald-300 bg-emerald-50 p-4">
            <p className="whitespace-pre-wrap text-lg leading-relaxed">{result.text}</p>
            <Metricas result={result} />
          </article>
        )}
      </section>
      </>
      )}

      <footer className="mt-auto text-xs text-stone-600">
        Prototipo Hack4Edu 2026 · Reto 12 · Licencia MIT. Las ideas del mentor son propuestas: decide el docente.
      </footer>
    </div>
  )
}
