# STATE — Hack4Edu 2026 · Reto 12 ★ "El entrenador invisible del docente"

> Lo mantiene el coordinator. Se actualiza al final de cada bloque y tras cada `DECISIÓN:`.
> Si llegas nuevo: lee esto, luego `docs/PROTOCOLO.md`, luego los issues `status:doing`.
> Bases oficiales: `hack4edu_2026_Bases_de_participacion.md` (raíz del repo).

## Ahora mismo
- Bloque actual: B1 casi cerrado (mié 01:00–05:00). Siguiente: B2 a las 09:00.
- Último update: 2026-11-04 03:58 por coordinator
- Qué funciona hoy: `npm install && npm run demo` en un clon limpio enseña «hola mentor» con respuesta grabada, sin modelo ni red (#2, probado por el builder en un namespace sin red). La ruta real contra un servidor falso compatible OpenAI también (#1). NO probado: respuesta de Gemma 4 vía Ollama real.
- Entregado y pendiente de reviewer (`status:review`): #2 (demo mode), #3 (brief v1), #4 (persona y pitch v0), #5 (criterios y escenarios E1–E10).
- Bloqueado: #1 (`needs-human`): Ollama no está instalado en la máquina del builder (7 GB de RAM, sin GPU; `gemma4:e4b` pesa 6,6 GB).
- Próximo hito demostrable: flujo de perfil adaptando respuestas (B2).
- Avisos: (1) el reviewer no tiene shell, así que no puede commitear ni comentar; el coordinator publicó sus ficheros (`c783e3e`). (2) Dos cifras del informe de retos son erróneas (Sudáfrica 5 USD; ProFuturo 87,2 % vs 17,2 %); ver #3. (3) «Ceiba» es nombre provisional del mentor.

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
> Lo mantiene el builder. Requisitos: Node ≥ 20.19 (probado con Node 24) y, para el modelo real, Ollama.

**Demo grabada (sin modelo ni red), la ruta segura:**
```bash
git clone https://github.com/alcacere/hack4edu2026 && cd hack4edu2026
npm install
npm run demo            # DEMO_MODE=1 → http://localhost:5173
```
Con la app ya abierta en modo normal, añadir `?demo=1` a la URL fuerza también el modo demo.

**Con modelo local (Ollama):**
```bash
ollama pull gemma4:e4b          # o gemma4:e2b / qwen3.5:4b (tags verificados el 2026-11-04)
cp .env.example .env            # opcional: ajusta LLM_MODEL / LLM_MODELS / LLM_TIMEOUT_MS
npm install && npm run dev      # http://localhost:5173 → «Saludar al mentor»
```
El navegador llama a `/llm/…` y Vite lo reenvía a `LLM_BASE_URL` (por defecto `http://localhost:11434/v1`). No hay backend aparte.

**Pruebas sin Ollama:** `npm run mock-llm` (servidor falso compatible OpenAI en :11555) y `LLM_BASE_URL=http://localhost:11555/v1 npm run dev`.
**Smoke test:** `npm run smoke -- http://localhost:5173/` (Chrome headless: pulsa el botón y lista respuesta, métricas, alertas y peticiones externas).
**Versión estática demo:** `npm run build:demo && npm run preview` → http://localhost:4173.

Estado (2026-11-04 04:20): ruta demo verificada sin red; ruta real verificada solo contra el mock, **no con Ollama** (no está instalado en la máquina del builder; ver #1).

## Preguntas abiertas para humanos
- #25 — Formato de entrega: las bases dicen «ppt **o** vídeo» en una sección y «presentación **y** vídeo» en otra. Recomendación del coordinator: vídeo de 3 min + presentación de 5 min. Pendiente de respuesta humana.
- #17 y #21 — Tareas de los humanos (pruebas con docentes, grabar y enviar la entrega).
