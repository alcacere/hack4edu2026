// Utilidades para salidas JSON de modelos pequeños: extraer el objeto y validarlo con un esquema mínimo.
// Sin dependencias: cada flujo define su validador (ver ai/schemas.ts).

/** Extrae el primer objeto JSON del texto (tolera ```json … ``` y texto alrededor). null si no hay. */
export function extractJsonObject(text: string): unknown {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i)
  const body = fenced ? fenced[1] : text
  const start = body.indexOf('{')
  const end = body.lastIndexOf('}')
  if (start < 0 || end <= start) return null
  try {
    return JSON.parse(body.slice(start, end + 1))
  } catch {
    return null
  }
}

export type Validation<T> = { ok: true; value: T } | { ok: false; error: string }

export function countSentences(s: string): number {
  return s
    .split(/(?<=[.!?…])\s+/)
    .map((x) => x.trim())
    .filter(Boolean).length
}
