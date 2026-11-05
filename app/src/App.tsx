import { useState } from 'react'
import { config } from '@ai/index'
import { Perfil } from './perfil/Perfil'
import { Plan } from './plan/Plan'
import { useNivelSesion } from './session'
import { es } from './copy/es'

type Vista = 'plan' | 'perfil'

const enlace = 'min-h-11 underline focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-500'

export default function App() {
  const model = config.defaultModel
  const [vista, setVista] = useState<Vista>('plan')
  const { nivel } = useNivelSesion()

  return (
    <div className="mx-auto flex min-h-dvh max-w-3xl flex-col gap-4 p-4 sm:p-6">
      <header className="no-print flex flex-col gap-1">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h1 className="text-2xl font-bold text-emerald-900">{es.app.titulo}</h1>
          {config.demoMode && (
            <span role="status" className="rounded-full border-2 border-amber-700 bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-900">
              {es.demo.insignia}
            </span>
          )}
        </div>
        <p className="text-sm text-stone-700">
          {config.demoMode ? es.avisos.privacidadDemo : es.avisos.privacidad}{' '}
          {!config.demoMode && (
            <>
              Modelo: <output id="modelo" className="font-semibold">{model}</output>.
            </>
          )}
        </p>
        <p className="text-sm text-stone-800" data-nivel-sesion={nivel?.code}>
          {vista === 'perfil' ? (
            <button type="button" className={enlace} onClick={() => setVista('plan')}>
              {es.comun.volverInicio}
            </button>
          ) : nivel ? (
            <>
              Tu punto de partida: <span className="font-semibold">{nivel.nombre}</span> ({nivel.code}, orientativo).{' '}
              <button type="button" className={enlace} onClick={() => setVista('perfil')}>
                Ver o cambiar
              </button>
            </>
          ) : (
            <button type="button" className={enlace} onClick={() => setVista('perfil')}>
              {es.bienvenida.opcionPerfil}
            </button>
          )}
        </p>
      </header>

      {/* Plan sigue montado al abrir el perfil, para no perder un borrador ya editado. */}
      <div hidden={vista !== 'plan'}>
        <Plan model={model} />
      </div>
      {vista === 'perfil' && <Perfil model={model} onSalir={() => setVista('plan')} />}

      <footer className="no-print mt-auto text-xs text-stone-600">{es.app.pie}</footer>
    </div>
  )
}
