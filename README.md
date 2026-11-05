# Ceiba: planes de estudio sin internet

**Hack4Edu 2026 · Reto 12 ★ «El entrenador invisible del docente».** Prototipo desarrollado del 3 al 5 de noviembre de 2026.

Un docente de primaria escribe «plan de estudio para 5.º sobre el ciclo del agua» y recibe un borrador paso a paso, ajustado a ese grado y hecho a partir de una biblioteca local con 170 temas de primaria. Cada paso muestra en qué parte de la ficha se apoya. No devuelve una lista de libros: devuelve un plan que se puede usar y cambiar. Funciona sin internet, en un portátil corriente, y lo que escribe el docente no sale de su ordenador.

## Por qué

Muchos docentes de escuelas rurales preparan sus clases solos y con mala conexión, y el acompañamiento pierde efecto cuando los programas crecen. Ceiba acerca a ese docente una ayuda práctica para planificar y termina cada plan con una acción pequeña para su semana. Ceiba propone; decide el docente.

## Ponerlo en marcha

Necesitas Node ≥ 22.6.

**Demo grabada, sin modelo ni red (la opción más rápida):**
```bash
npm install
npm run demo        # http://localhost:5173
```

**Con el modelo real (Docker; unos 5 GB de disco y 8 GB de RAM):**
```bash
docker run -d --name ollama --restart unless-stopped -p 127.0.0.1:11435:11434 \
  -v ollama:/root/.ollama -e OLLAMA_KEEP_ALIVE=30m -e OLLAMA_CONTEXT_LENGTH=4096 ollama/ollama
docker exec ollama ollama pull gemma4:e2b
cp .env.example .env
npm install
npm run dev         # http://localhost:5173
```
Solo hace falta internet para descargar el modelo la primera vez.

## Cómo funciona

```
Pedido del docente
 → 1. entender (sin IA): grado, tema, sesiones y minutos, en campos que se pueden corregir
 → 2. buscar (sin IA): filtro estricto por grado + BM25 sobre las fichas
 → 3. redactar (Gemma 4 local): instrucciones fijas + texto de las fichas → plan en JSON
 → 4. comprobar (sin IA): esquema, minutos y fuentes; un reintento → borrador editable
```

- **Biblioteca:** sin base de datos. Un mapa de temas por grado (`library/temas.json`), artículos de Vikidia y Wikipedia descargados una sola vez (`library/articulos.json`, menos de 1 MB) y fichas escritas a mano (`library/fichas/`), que se usan primero si existen. Filtrar por grado y buscar por tema basta, y evita cargar un segundo modelo en poca RAM. Para ampliarla: `library/README.md`.
- **Variedad:** cada plan sigue un enfoque (jugar, contar una historia, debatir…), elegido o al azar, y «Otra versión» propone uno distinto.
- **Sin fuente, se dice:** si un artículo no trae actividades, el modelo puede proponerlas, y se marcan como «Idea de Ceiba, sin fuente».
- **Si no hay material, lo dice** y no genera nada. Si el tema solo existe en otro grado, te deja elegir.
- **Privacidad:** al modelo le llegan los campos y las fichas, nunca el texto libre. Así los nombres de alumnos no llegan al modelo.
- **Código:** `ai/` (modelo, esquemas, biblioteca), `app/src/plan/` (pantalla principal), `fixtures/` (modo demo).

## Modelo

Gemma 4 E2B (`gemma4:e2b`) de Google DeepMind, licencia [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0), ejecutado con [Ollama](https://ollama.com).

## Qué es real y qué no

| | |
|---|---|
| **Real** | Búsqueda en la biblioteca, generación con el modelo local, validación, funcionamiento sin red. |
| **Grabado** | En `npm run demo`, el plan es una respuesta real del modelo guardada en `fixtures/`, solo para los temas grabados, y la interfaz lo indica |
| **Sin revisar** | Todo el contenido. El mapa de temas y las 8 fichas son un borrador orientado al currículo del Perú, sin contrastar con el MINEDU. Los artículos vienen de enciclopedias abiertas, editables por cualquiera, y pueden tener errores. La interfaz lo marca como pendiente de revisión |
| **Sin validar** | No hemos demostrado que Ceiba mejore la enseñanza ni el aprendizaje. Citar una ficha no garantiza que el paso sea fiel a ella: por eso el docente puede abrir la fuente y cada plan es un borrador. Los cortes de nivel del perfil tampoco están validados |

## Comprobar

```bash
npm run typecheck && npm run build && npm run library:check
npm run smoke:plan -- http://localhost:5173/    # con la app en marcha y Chrome instalado
```

## Licencias

Código: [MIT](LICENSE). Fuente Source Serif 4, incluida en la app: [SIL OFL 1.1](https://openfontlicense.org). Biblioteca: CC BY-SA, con el detalle en `library/README.md` y los créditos de cada artículo en `library/ATRIBUCIONES.md`. Sin datos reales de alumnos ni de docentes.
