// Prompts versionados en ai/prompts/*.md. Se importan como texto.
import hola from './prompts/hola.md?raw'
import perfil from './prompts/perfil.md?raw'
import plan from './prompts/plan.md?raw'

export const PROMPTS = { hola, perfil, plan } as const
