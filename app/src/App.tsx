import { useRef, useState } from 'react'
import { AIError, config, holaMentor, type ChatResult } from '@ai/index'

type Status = 'idle' | 'loading' | 'done' | 'error'

function formatMs(ms: number) {
  return ms < 1000 ? `${Math.round(ms)} ms` : `${(ms / 1000).toFixed(1)} s`
}

export default function App() {
  const [model, setModel] = useState(config.defaultModel)
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

      <section className="rounded-xl border border-stone-300 bg-white p-4 shadow-sm">
        <label htmlFor="modelo" className="block text-sm font-semibold text-stone-800">
          Modelo
        </label>
        <div className="mt-1 flex flex-col gap-2 sm:flex-row">
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
        </div>
        <p className="mt-2 text-sm text-stone-700">
          {config.demoMode
            ? 'En modo demo el selector está bloqueado: las respuestas vienen de fixtures/.'
            : `Modelo local vía Ollama (${config.upstreamUrl}). Coste 0 €, nada sale de este ordenador.`}
        </p>
      </section>

      <section aria-live="polite" className="flex flex-col gap-3">
        {status === 'loading' && <p className="text-stone-700">El mentor está pensando…</p>}

        {error && (
          <div role="alert" className="rounded-xl border-2 border-red-700 bg-red-50 p-4 text-red-900">
            <p className="font-semibold">{error}</p>
            <p className="mt-1 text-sm">
              Puedes volver a intentarlo, elegir otro modelo o abrir la demo grabada con{' '}
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
            <dl className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-stone-700">
              <div className="flex gap-1">
                <dt className="font-semibold">Modelo:</dt>
                <dd>{result.model}</dd>
              </div>
              <div className="flex gap-1">
                <dt className="font-semibold">Latencia:</dt>
                <dd>{formatMs(result.latencyMs)}</dd>
              </div>
              <div className="flex gap-1">
                <dt className="font-semibold">Tokens/s:</dt>
                <dd>{result.tokensPerSec ? result.tokensPerSec.toFixed(1) : '—'}</dd>
              </div>
              {result.source === 'demo' && (
                <div className="flex gap-1">
                  <dt className="font-semibold">Origen:</dt>
                  <dd>fixture grabado</dd>
                </div>
              )}
            </dl>
          </article>
        )}
      </section>

      <footer className="mt-auto text-xs text-stone-600">
        Prototipo Hack4Edu 2026 · Reto 12 · Licencia MIT. Las ideas del mentor son propuestas: decide el docente.
      </footer>
    </div>
  )
}
