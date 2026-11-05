// Carga las fichas de library/fichas/ en el navegador. Añadir una ficha = añadir un fichero .md.
import { parseFicha, type Ficha } from './search'

const crudas = import.meta.glob('../../library/fichas/**/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>

export const biblioteca: Ficha[] = Object.entries(crudas).map(([ruta, raw]) => parseFicha(raw, ruta))
