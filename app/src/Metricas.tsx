import type { ChatResult } from '@ai/index'

export function formatMs(ms: number) {
  return ms < 1000 ? `${Math.round(ms)} ms` : `${(ms / 1000).toFixed(1)} s`
}

/** Modelo, latencia y tokens/s de una respuesta. En demo no se inventan métricas (criterio A4). */
export function Metricas({ result, intentos }: { result: ChatResult; intentos?: number }) {
  return (
    <dl className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-stone-700" data-metricas>
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
      {intentos === 2 && (
        <div className="flex gap-1">
          <dt className="font-semibold">Intentos:</dt>
          <dd>2 (la primera respuesta no era válida)</dd>
        </div>
      )}
      {result.source === 'demo' && (
        <div className="flex gap-1">
          <dt className="font-semibold">Origen:</dt>
          <dd>fixture grabado</dd>
        </div>
      )}
    </dl>
  )
}
