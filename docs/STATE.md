# STATE — Hack4Edu 2026 · Reto 12 ★ "El entrenador invisible del docente"

> Lo mantiene el coordinator. Se actualiza al final de cada bloque y tras cada `DECISIÓN:`.
> Si llegas nuevo: lee esto, luego `docs/PROTOCOLO.md`, luego los issues `status:doing`.
> Bases oficiales: `hack4edu_2026_Bases_de_participacion.md` (raíz del repo).

## Ahora mismo
- Bloque actual: B2 (mié 09:00–13:00), adelantado: los 4 agentes entregaron a las 09:00. Siguiente: B3 (plan de clase, #9) ya lanzado.
- Último update: 2026-11-04 09:10 por coordinator
- Máquina: 16 núcleos, 30 GB de RAM, sin GPU. Ollama **solo en Docker** (contenedor `ollama`, 127.0.0.1:11434, volumen `ollama`, rootless). Nadie ejecuta `ollama serve` nativo. `gemma4:e2b` descargado (4,6 GB).
- Qué funciona hoy: demo grabada sin red (`npm run demo`, #2 aprobado) y **flujo de perfil #6** (5 preguntas → nivel calculado por la app, explicación de Gemma en JSON validado con 1 reintento, nivel corregible, aviso «no es una nota»), en demo y con `gemma4:e2b` real. Medido por el builder en esta máquina: 5,8 s en frío, 0,8–1,0 s el saludo en caliente (~52 tok/s), explicación de perfil 2,6–4,8 s. Aún lo verifica el reviewer.
- En `status:review` (los revisa el reviewer ahora): #1, #3 (rev. 2), #4 (rev. 2), #6, #7 (ficha Gemma 4), #8 (textos `es.ts`). Aprobados/cerrados: #2, #5 (lo cerró el coordinator), #25.
- En curso: builder #9 (plan de clase), researcher #11 (validación pedagógica del perfil), writer #16 (guion de pruebas con docentes).
- `needs-human`: #17, #21 (tareas de los humanos).
- Próximo hito demostrable: flujo de plan de clase con micro-acción (B3, #9).
- Avisos: (1) El reviewer ya tiene shell y comenta/commitea él mismo. (2) Dos cifras del informe de retos son erróneas (Sudáfrica 5 USD; ProFuturo 87,2 % vs 17,2 %); ver #3. (3) «Ceiba» es nombre provisional del mentor. (4) `~/.gitconfig` global tiene `merge.conflictstyle=zdiff3`, que git 2.34 no soporta: `git pull --rebase` falla al haber que fusionar; los agentes usan `GIT_CONFIG_GLOBAL=/dev/null` solo en ese comando (pendiente de que un humano cambie a `diff3`). (5) Memoria del contenedor con el modelo cargado: ~8,5 GB.

## Producto (alcance estrecho, confirmado)
Chat web de mentor pedagógico, un docente a la vez, sin cuentas. Tres flujos:
1. **Perfil rápido** — 5 preguntas → nivel de competencia digital (DigCompEdu). Todo lo demás se adapta a ese nivel.
2. **Planificar una clase** — etapa, asignatura, objetivo, tiempo → plan + idea de tecnología ajustada al nivel + micro-acción para esta semana.
3. **Reflexionar tras una clase** — preguntas guiadas → nueva micro-acción.
Siempre: anima a consultar con colegas o mentor humano, reconoce incertidumbre, no pide datos de alumnos.

**Diferencial de pitch:** corre con **un único modelo open source local, Gemma 4**, para mostrar coste 0, privacidad y funcionamiento offline. (Antes: selector con varios modelos; descartado el 2026-11-04 por decisión humana.)

Fuera de alcance: memoria entre sesiones, RAG de currículos, voz, LMS, login.

## Decisiones tomadas
- Presupuesto API: 0 €. Modelo local vía Ollama en Docker.
- **Un solo modelo: Gemma 4** (2026-11-04, Ariel). Sin selector de modelos ni Qwen. Tag por defecto `gemma4:e2b` (Apache-2.0; medido 3,1 s en caliente y 14,6 tok/s en la máquina anterior). `gemma4:e4b` solo si se mide en la máquina nueva y compensa; lo decide un humano. Efecto en el backlog: #10 se reduce a mostrar modelo, tokens/s y latencia (sin selector); #7 pasa a justificar Gemma 4 (licencia, tamaño, RAM, idiomas).
- Licencia: MIT.
- Repo: `alcacere/hack4edu2026`, **público** desde ya (issues incluidos). Demo pública desplegada solo con OK humano.
- Formato final (#25, Ariel): vídeo de 3 min + presentación de 5 min + enlace a GitHub.
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

**Con modelo local (Ollama, modelo único Gemma 4 `gemma4:e2b`, por defecto sin `.env`):**
```bash
cp .env.example .env            # opcional: LLM_MODEL=gemma4:e2b ya es el defecto; ajusta LLM_TIMEOUT_MS si hace falta
npm install && npm run dev      # http://localhost:5173 → «Saludar al mentor»
```
Con un solo modelo en `LLM_MODELS` la interfaz muestra su nombre (sin selector).
El navegador llama a `/llm/…` y Vite lo reenvía a `LLM_BASE_URL` (por defecto `http://localhost:11434/v1`). No hay backend aparte. La app envía `reasoning_effort=none` (variable `LLM_REASONING_EFFORT`): sin eso Gemma 4 «piensa» antes de responder y en CPU tarda ~10× más.

**Máquina actual (30 GB, sin GPU): Ollama en Docker. No uses `ollama serve` nativo.**
```bash
# Creado el 2026-11-04 09:00 (comando exacto)
docker run -d --name ollama --restart unless-stopped -p 127.0.0.1:11434:11434 \
  -v ollama:/root/.ollama -e OLLAMA_KEEP_ALIVE=30m ollama/ollama
docker exec ollama ollama pull gemma4:e2b
docker exec ollama ollama list
LLM_MODEL=gemma4:e2b LLM_MODELS=gemma4:e2b npm run dev
```
Las cifras de latencia de abajo son de la máquina anterior; hay que repetirlas aquí (#1).

**Medido en la máquina actual** (builder, 2026-11-04 ~09:10; 16 núcleos, 30 GB, sin GPU; Ollama en Docker, `gemma4:e2b` Q4_K_M; latencia de punta a punta en la interfaz, `npm run smoke`):

| Qué | En frío (1.ª petición) | En caliente | Tokens/s |
|---|---|---|---|
| Saludo «hola mentor» | 5,8 s | 0,8–1,0 s | ~52 |
| Perfil (explicación JSON, 8 ejecuciones E1/E2) | — | 2,6–4,8 s | 18–37 |


**(Obsoleto, solo como registro: Qwen 3.5 y el selector se descartaron el 2026-11-04) En la máquina anterior del builder (7 GB de RAM, sin GPU, Ollama en espacio de usuario, sin sudo):**
```bash
# Ollama 0.40.14 oficial (ollama.com/download → release de GitHub, SHA-256 verificado), extraído en goinfre:
OLLAMA_DIR=~/goinfre/ollama   # dist/ = binario, models/ = modelos
export OLLAMA_HOST=127.0.0.1:11434 OLLAMA_MODELS=$OLLAMA_DIR/models
export OLLAMA_MAX_LOADED_MODELS=1 OLLAMA_KEEP_ALIVE=30m   # solo cabe un modelo a la vez en RAM
$OLLAMA_DIR/dist/bin/ollama serve &      # escucha solo en 127.0.0.1; parar: kill %1
$OLLAMA_DIR/dist/bin/ollama list         # gemma4:e2b (4,6 GB), qwen3.5:4b (3,3 GB)
# Precalentar ANTES de la demo (la carga en frío tarda 2–7 min aquí):
curl -s http://127.0.0.1:11434/api/generate -d '{"model":"gemma4:e2b","keep_alive":"30m"}'
LLM_MODEL=gemma4:e2b LLM_MODELS=gemma4:e2b,qwen3.5:4b npm run dev
```
Medido el 2026-11-04 en la interfaz (Chrome headless, `scripts/smoke-browser.mjs`), latencia de punta a punta del saludo:

| Modelo | En frío (carga + respuesta) | En caliente | Tokens/s en caliente |
|---|---|---|---|
| `gemma4:e2b` | 121,7 s (444 s la primera vez tras descargar) | 3,1 s | 14,6 |
| `qwen3.5:4b` | 136,1 s (166 s por API) | 7,2 s | 7,0 |

Con 7 GB los dos modelos no caben a la vez: **cambiar de modelo en el selector descarga el anterior y la primera respuesta del nuevo es «en frío»** (supera el timeout por defecto de 60 s; la interfaz lo dice y sigue usable). Para la demo en directo con selector: un portátil de 16 GB con `OLLAMA_MAX_LOADED_MODELS=2`, o grabar el cambio de modelo en el vídeo. `gemma4:e4b` no se ha probado (no descargado: no cabe bien en 7 GB).

**Pruebas sin Ollama:** `npm run mock-llm` (servidor falso compatible OpenAI en :11555) y `LLM_BASE_URL=http://localhost:11555/v1 npm run dev`. Por defecto responde texto **no JSON** (sirve para comprobar el reintento único del perfil: 2 peticiones y error amable); con `MOCK_JSON=1` responde un JSON válido del perfil.
**Smoke del perfil (#6):** `npm run smoke:perfil -- http://localhost:5173/ [esperaMs]` responde las 5 preguntas y lista nivel, explicación, aviso, métricas, alertas y peticiones a `/llm`. `SMOKE_ANSWERS=0,0,0,0,1` (E1, por defecto) o `4,4,3,4,4` (E2); `SMOKE_CORREGIR=B2` corrige el nivel a mano (P6/P7); `SMOKE_WIDTH=375` para móvil; `SMOKE_SHOT=fichero.png` para captura.
**Smoke test:** `npm run smoke -- http://localhost:5173/ [esperaMs]` (Chrome headless: pulsa el botón y lista respuesta, métricas, alertas y peticiones externas). `SMOKE_SHOT=fichero.png` guarda una captura.
**Versión estática demo:** `npm run build:demo && npm run preview` → http://localhost:4173.

Estado (2026-11-04 04:40): ruta demo verificada sin red (el fixture `hola` ahora es texto generado por `gemma4:e2b`); ruta real verificada **con Ollama real** y los dos modelos (`gemma4:e2b`, `qwen3.5:4b`) en la máquina del builder (ver #1). Capturas: `docs/pitch/captura-hola-*.png`.

## Preguntas abiertas para humanos
- #25 — Formato de entrega: las bases dicen «ppt **o** vídeo» en una sección y «presentación **y** vídeo» en otra. Recomendación del coordinator: vídeo de 3 min + presentación de 5 min. Pendiente de respuesta humana.
- #17 y #21 — Tareas de los humanos (pruebas con docentes, grabar y enviar la entrega).
