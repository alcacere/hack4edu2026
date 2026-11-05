// Carga las fichas de library/fichas/ en el navegador. Añadir una ficha = añadir un fichero .md.
import { fichasDeArticulos, parseFicha, type DatosArticulos, type DatosTemas, type Ficha } from './search'
import temas from '../../library/temas.json'
import articulos from '../../library/articulos.json'

const crudas = import.meta.glob('../../library/fichas/**/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>

const curadas: Ficha[] = Object.entries(crudas).map(([ruta, raw]) => parseFicha(raw, ruta))

export const biblioteca: Ficha[] = [...curadas, ...fichasDeArticulos(temas as DatosTemas, articulos as DatosArticulos)]
