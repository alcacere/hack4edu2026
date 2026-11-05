// Prompts versionados en ai/prompts/*.md. Se importan como texto.
import perfil from './prompts/perfil.md?raw'
import plan from './prompts/plan.md?raw'

export const PROMPTS = { perfil, plan } as const
