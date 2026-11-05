# STATE — Hack4Edu 2026 · Reto 12 ★ "El entrenador invisible del docente"

> Lo mantiene el coordinator. Se actualiza al final de cada bloque y tras cada `DECISIÓN:`.
> Si llegas nuevo: lee esto, luego `docs/PROTOCOLO.md`, luego los issues `status:doing`.
> Bases oficiales: `hack4edu_2026_Bases_de_participacion.md` (raíz del repo).

## Ahora mismo
- Plan vigente: `docs/PLAN.md` (aprobado por un humano el 2026-11-05). Manda sobre el alcance anterior de este fichero y de los issues.
- Último update: 2026-11-05 por builder.
- Máquina de demo: portátil de 7,5 GB de RAM, 8 núcleos, sin GPU. Ollama 0.40.14 **en Docker** en `127.0.0.1:11435` (`.env`: `LLM_BASE_URL=http://localhost:11435/v1`), con `gemma4:e2b`. El Ollama nativo 0.12.11 de esta máquina (puerto 11434) no puede ejecutar Gemma 4 y no se usa.
- Qué funciona hoy: pantalla de plan de estudio con biblioteca local, modelo real (18–47 s por plan) y modo demo. Sin probar aún: modo avión real. Resultados: `docs/review/resultados-2026-11-05.md`.
- Falta, y lo hace una persona: contrastar las fichas con los documentos oficiales del MINEDU, confirmar con la sede el reto y la modalidad, probar con docentes, y grabar y enviar el vídeo y la presentación.

## Producto (alcance vigente)
**Ceiba**: herramienta sin internet para docentes de primaria. El docente pide un plan («plan de estudio para 5.º sobre el ciclo del agua») y recibe un borrador estructurado paso a paso, ajustado a ese grado y basado en una biblioteca local de fichas, con la fuente de cada paso. Cierra con una micro-acción para el docente: es el vínculo con el Reto 12.

1. **Plan de estudio** (pantalla principal): pedido → fichas → borrador editable, para imprimir o copiar.
2. **Perfil rápido** (opcional, por enlace): 5 preguntas → punto de partida orientativo. Solo ajusta la micro-acción.
Siempre: si no hay material lo dice y no genera nada; no se envía al modelo lo que escribe el docente; anima a consultar con un colega.

**Fuera de alcance:** flujo de reflexión (#12), chat libre, selector de modelos, embeddings, base de datos vectorial, SQLite, ingesta de PDF, consultas en vivo a internet, memoria entre sesiones, voz, LMS, login, PWA.

## Decisiones tomadas
- **Biblioteca + plan de estudio como producto central** (2026-11-05, humano). Revierte «RAG de currículos fuera de alcance». Reto 12 ★, currículo CNEB del Perú, demo en el portátil de 7,5 GB.
- **La biblioteca no usa base de datos**: filtro estricto por grado y búsqueda BM25 sobre tema y alias. Sin modelo de embeddings, porque competiría por la poca RAM.
- **Más contenido antes que contenido revisado** (2026-11-05, humano): 170 temas con artículos de Vikidia y Wikipedia descargados una vez, además de las 8 fichas curadas, que se usan primero. La revisión de contenido se deja para después de esta fase. Todo sigue marcado como sin revisar.
- **Variedad de respuestas** (2026-11-05, humano): enfoque elegido o al azar, y «Otra versión».
- **Lo que escribe el docente no llega al modelo**: solo campos y fichas.
- Presupuesto API: 0 €. **Un solo modelo: Gemma 4 `gemma4:e2b`** (2026-11-04, Ariel; Apache-2.0).
- Licencias: MIT para el código; CC BY-NC-SA 3.0 para la documentación; CC BY-SA para `library/`, por los artículos.
- Repo: `alcacere/hack4edu2026`, público. Formato final (#25): vídeo de 3 min + presentación de 5 min + enlace a GitHub.
- Memoria compartida: GitHub Issues + este fichero.

## Calendario de hoy, 2026-11-05 (hora Madrid)
| Hasta | Entregable |
|---|---|
| 15:00 | Biblioteca, plan, interfaz y fixtures grabados |
| 17:00 | Pruebas y **congelado**: etiqueta `v1.0` |
| 23:00 | README, vídeo de 3 min, presentación de 5 min y clon limpio. **Entrega objetivo** (límite: 23:59) |

## Cómo arrancar la demo
Los comandos están en `README.md`. El histórico de mediciones de máquinas anteriores está en el historial de git de este fichero.

**Pruebas sin Ollama:** `npm run mock-llm` y `LLM_BASE_URL=http://localhost:11555/v1 npm run dev`. Responde texto no JSON, para comprobar el reintento único. Con `MOCK_JSON=1` responde JSON válido de perfil o plan.
**Smokes:** `npm run smoke:plan -- <url> [esperaMs]` (`SMOKE_TEXT`, `SMOKE_GRADO`, `SMOKE_PROHIBIDAS`, `SMOKE_SHOT`, `SMOKE_WIDTH`) y `npm run smoke:perfil -- <url>`.
**Biblioteca:** `npm run library:check`. **Grabar el modo demo:** `npm run record:plan`.

## Preguntas abiertas para humanos
- #17 y #21 — Tareas de los humanos (pruebas con docentes, grabar y enviar la entrega).
- Después de esta fase: revisar temas, fichas y artículos con el documento oficial del MINEDU. Hoy nada está revisado.
- Confirmar con la sede el reto (12), la modalidad (innovadora) y la hora límite.
