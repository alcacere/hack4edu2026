// Estado de la sesión del docente (solo esta pestaña, sin cuentas ni servidor).
// sessionStorage: sobrevive a recargar la página, se borra al cerrar la pestaña. Nada sale del navegador.
// Los flujos 2 y 3 (#9, #12) leen el nivel con nivelSesion() o useNivelSesion().nivel (criterio P6).
import { useCallback, useSyncExternalStore } from 'react'
import { nivelPorCode, type Nivel, type NivelCode, type Resultado } from './perfil/datos'

export interface PerfilSesion {
  /** Lo que salió de las 5 preguntas. */
  resultado: Resultado
  /** Nivel elegido a mano por el docente, si lo corrigió. Manda sobre el calculado. */
  corregido: NivelCode | null
}

const KEY = 'ceiba.perfil.v1'
const listeners = new Set<() => void>()
let cache: { raw: string | null; value: PerfilSesion | null } = { raw: null, value: null }

function read(): PerfilSesion | null {
  const raw = typeof sessionStorage === 'undefined' ? null : sessionStorage.getItem(KEY)
  if (raw !== cache.raw) {
    try {
      cache = { raw, value: raw ? (JSON.parse(raw) as PerfilSesion) : null }
    } catch {
      cache = { raw, value: null }
    }
  }
  return cache.value
}

function write(v: PerfilSesion | null) {
  if (v) sessionStorage.setItem(KEY, JSON.stringify(v))
  else sessionStorage.removeItem(KEY)
  listeners.forEach((l) => l())
}

/** Nivel vigente (corregido por el docente o, si no, el calculado). null si no hay perfil. */
export function nivelSesion(): Nivel | null {
  const p = read()
  return p ? nivelPorCode(p.corregido ?? p.resultado.code) : null
}

export function useNivelSesion() {
  const perfil = useSyncExternalStore(
    (l) => {
      listeners.add(l)
      return () => listeners.delete(l)
    },
    read,
    () => null,
  )
  const guardarResultado = useCallback((resultado: Resultado) => write({ resultado, corregido: null }), [])
  const corregir = useCallback((code: NivelCode | null) => {
    const p = read()
    if (p) write({ ...p, corregido: code === p.resultado.code ? null : code })
  }, [])
  const borrar = useCallback(() => write(null), [])
  const nivel = perfil ? nivelPorCode(perfil.corregido ?? perfil.resultado.code) : null
  return { perfil, nivel, guardarResultado, corregir, borrar }
}
