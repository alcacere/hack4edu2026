import { useEffect, useState } from 'react'
import { config } from '@ai/index'
import { Perfil } from './perfil/Perfil'
import { Plan } from './plan/Plan'
import { useNivelSesion } from './session'
import { es, mentorName } from './copy/es'

type Vista = 'plan' | 'perfil'

const enlace = 'min-h-6 underline underline-offset-2 hover:text-emerald-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-500'

/** La ceiba: tronco ancho y copa extendida. */
function Logo() {
  return (
    <svg viewBox="0 0 48 48" className="size-11 shrink-0" aria-hidden="true">
      <circle cx="24" cy="24" r="24" className="fill-emerald-800" />
      <path d="M21.5 39c1-5 1-9 .4-13h4.2c-.6 4-.6 8 .4 13h3.5H18z" className="fill-stone-50" />
      <path d="M24 28c-3-3-6-4-9-4M24 28c3-3 6-4 9-4" className="fill-none stroke-stone-50" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M9 22c0-4 3-6 6-6 1-4 5-6 9-6s8 2 9 6c3 0 6 2 6 6 0 3-3 4-6 4H15c-3 0-6-1-6-4z" className="fill-emerald-400" />
    </svg>
  )
}

/** Estado real de la conexión del equipo: en el modo avión de la demo se ve el cambio. */
function useEnLinea() {
  const [enLinea, setEnLinea] = useState(() => navigator.onLine)
  useEffect(() => {
    const cambio = () => setEnLinea(navigator.onLine)
    window.addEventListener('online', cambio)
    window.addEventListener('offline', cambio)
    return () => {
      window.removeEventListener('online', cambio)
      window.removeEventListener('offline', cambio)
    }
  }, [])
  return enLinea
}

export default function App() {
  const model = config.defaultModel
  const [vista, setVista] = useState<Vista>('plan')
  const { nivel } = useNivelSesion()
  const enLinea = useEnLinea()

  return (
    <div className="mx-auto flex min-h-dvh max-w-3xl flex-col gap-5 p-4 sm:p-6">
      <header className="no-print flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Logo />
          <div>
            <h1 className="font-serif text-2xl leading-tight font-semibold text-emerald-900">{mentorName}</h1>
            <p className="text-sm text-stone-700">{es.app.lema}</p>
          </div>
        </div>
        {config.demoMode ? (
          <span role="status" className="rounded-full border border-barro-700 bg-barro-100 px-3 py-1 text-xs font-semibold text-barro-700">
            {es.demo.insignia}
          </span>
        ) : (
          <p className="text-right text-sm text-stone-700" data-conexion={enLinea ? 'en-linea' : 'sin-red'}>
            <span className="flex items-center justify-end gap-2 font-semibold text-emerald-900">
              <span className={`size-2.5 rounded-full ${enLinea ? 'bg-stone-400' : 'bg-emerald-600'}`} aria-hidden="true" />
              {enLinea ? es.app.conRed : es.app.sinRed}
            </span>
            <span className="text-xs">
              {es.app.modeloLocal}: <output id="modelo">{model}</output>
            </span>
          </p>
        )}
      </header>

      {/* Plan sigue montado al abrir el perfil, para no perder un borrador ya editado. */}
      <div hidden={vista !== 'plan'}>
        <Plan model={model} />
      </div>
      {vista === 'perfil' && <Perfil model={model} onSalir={() => setVista('plan')} />}

      <footer className="no-print mt-auto flex flex-col gap-1 border-t border-stone-300 pt-3 text-xs text-stone-600">
        <p data-nivel-sesion={nivel?.code}>
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
        <p>{es.app.pie}</p>
      </footer>
    </div>
  )
}
