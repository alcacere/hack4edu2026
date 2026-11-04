# STATE — Hack4Edu 2026 · Reto 12 ★ "El entrenador invisible del docente"

> Lo mantiene el coordinator. Se actualiza al final de cada bloque y tras cada `DECISIÓN:`.
> Si llegas nuevo: lee esto, luego `docs/PROTOCOLO.md`, luego los issues `status:doing`.
> Bases oficiales: `hack4edu_2026_Bases_de_participacion.md` (raíz del repo).

## Ahora mismo
- Bloque actual: B1 (mié 01:00–05:00)
- Último update: 2026-11-04 03:45 por coordinator
- Qué funciona hoy: nada ejecutable todavía. Hecho: kit de agentes aplicado en la raíz, labels creadas, backlog inicial creado (issues #1–#25).
- B1 en curso: #1 y #2 (builder), #3 (researcher), #4 (writer), #5 (reviewer). Objetivo de B1: 05:00; si hay retraso, `HANDOFF:` y se retoma antes de B2 (09:00).
- Próximo hito demostrable: repo con esqueleto que responde "hola mentor"

## Producto (alcance estrecho, confirmado)
Chat web de mentor pedagógico, un docente a la vez, sin cuentas. Tres flujos:
1. **Perfil rápido** — 5 preguntas → nivel de competencia digital (DigCompEdu). Todo lo demás se adapta a ese nivel.
2. **Planificar una clase** — etapa, asignatura, objetivo, tiempo → plan + idea de tecnología ajustada al nivel + micro-acción para esta semana.
3. **Reflexionar tras una clase** — preguntas guiadas → nueva micro-acción.
Siempre: anima a consultar con colegas o mentor humano, reconoce incertidumbre, no pide datos de alumnos.

**Diferencial de pitch:** corre con modelos open source locales (Gemma 4 por defecto) y permite **alternar de modelo** en caliente para mostrar coste 0, privacidad y funcionamiento offline.

Fuera de alcance: memoria entre sesiones, RAG de currículos, voz, LMS, login.

## Decisiones tomadas
- Presupuesto API: 0 €. Modelo local vía Ollama. Por defecto Gemma 4 E4B (Apache-2.0).
- Licencia: MIT.
- Repo: `alcacere/hack4edu2026`, **público** desde ya (issues incluidos). Demo pública desplegada solo con OK humano.
- Formato final: vídeo de 3 min.
- Memoria compartida: GitHub Issues + este fichero.

## Calendario (hora Madrid)
| Bloque | Cuándo | Entregable |
|---|---|---|
| B1 | Mié 01–05 | Esqueleto "hola mentor", brief v1, persona y pitch borrador |
| B2 | Mié 09–13 | Flujo de perfil adaptando respuestas |
| B3 | Mié 13–17 | Flujo de plan de clase con micro-acción |
| B4 | Mié 17–21 | Flujo de reflexión + guardarraíles; revisión B2–B3 |
| B5 | Mié 21–Jue 01 | Pasada completa de escenarios + correcciones |
| B6 | Jue 09–13 | Pruebas con 2–3 docentes reales, UX, README borrador |
| B7 | Jue 13–17 | **Congelado 17:00**. v1.0 etiquetada |
| B8 | Jue 17–21 | Vídeo 3 min, README final, licencia, clon limpio OK |
| Margen | Jue 21–23:59 | Entrega objetivo 23:00 |

## Cómo arrancar la demo
(lo rellena el builder en cuanto exista)

## Preguntas abiertas para humanos
- #25 — Formato de entrega: las bases dicen «ppt **o** vídeo» en una sección y «presentación **y** vídeo» en otra. Recomendación del coordinator: vídeo de 3 min + presentación de 5 min. Pendiente de respuesta humana.
- #17 y #21 — Tareas de los humanos (pruebas con docentes, grabar y enviar la entrega).
