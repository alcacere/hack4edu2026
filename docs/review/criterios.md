# Criterios de aceptación — Reto 12 ★ «El entrenador invisible del docente»

> Autor: reviewer · refs #5 · **Versión 4 (2026-11-05): plan de estudio con biblioteca local**, según `docs/PLAN.md`. Sale el flujo de reflexión. Cambios al final (§11).
> Regla: cada criterio se comprueba con **sí/no** ejecutando lo que dice la columna «Cómo se verifica». Si hace falta interpretar, el criterio está mal escrito: abrir issue `type:doc` contra este fichero.
> Escenarios que los ejercitan: `docs/review/escenarios.md` (E1…E10).

## 0. Convenciones
- **Ruta de demo**: el escenario L1.
- **Plan**: el borrador que aparece tras pulsar «Preparar plan».
- **Micro-acción**: una sola acción concreta, realizable esta semana, en una frase de ≤ 40 palabras, con verbo en infinitivo o imperativo.
- **Modelo**: hay **uno solo**, Gemma 4 con el tag `gemma4:e2b` (valor de `LLM_MODEL`). «Con Gemma real» = `DEMO_MODE=0`, Ollama en el contenedor Docker `ollama` (puerto 11435 de la máquina) con `gemma4:e2b` descargado y precalentado. `gemma4:e4b` solo entra en las pruebas si un humano lo aprueba tras medirlo; entonces se añade como columna aparte, nunca como selector.
- **Dos modos de prueba** para todo criterio de flujo: **DEMO** (`DEMO_MODE=1` o `?demo=1`, fixtures, sin red) y **REAL** (Gemma real). Un issue de flujo no se aprueba si solo se ha probado en uno de los dos.
- Tiempos medidos con el reloj de la propia interfaz (latencia que muestra la UI) o, si no la muestra, cronómetro desde clic hasta primer carácter visible.
- **Sin red**: Wi-Fi apagado / cable fuera, **o** ejecutar servidor y navegador dentro de `unshare -rn` (namespace con solo loopback; comprobar antes que `curl -sS https://ollama.com` falla). Las dos formas valen para A2/E10.
- **En DEMO** las respuestas son fijas: ahí solo se comprueban estructura, avisos, controles y ausencia de red. Los criterios que comparan salidas (P3, P5, R2, G2–G5) **solo se dan por buenos en REAL**.
- Issues de origen: #1 → A1, A8–A10, F1 · #2 → A2, A11, A12 · #6 → P1–P7, F2 (lista de aceptación en §2.1) · #9 → C1–C7, P5, F2 · #10 → A3, A4 · #12 → R1–R4, G2, G2b, G4–G6 · #7 → A9, §8 pregunta 6.

## 1. Arranque y entrega (definición de «hecho» del builder)
| ID | Criterio | Cómo se verifica | Escenario |
|---|---|---|---|
| A1 | `git clone` en carpeta vacía + los comandos del README (máx. 1 comando tras instalar dependencias) deja la app abierta en el navegador. | Clon limpio en `/tmp/h4e-clean-<hora>`, seguir README al pie de la letra, sin pasos extra. Anotar cada comando ejecutado. | B8 |
| A2 | Con `DEMO_MODE=1` y **sin red** (Wi-Fi apagado / contenedor `ollama` parado) la ruta de demo completa funciona sin ningún mensaje de error. | E10. | E10 |
| A3 | **Modelo único (#10):** la interfaz **no** tiene selector de modelo y muestra, sin hacer scroll, el modelo en uso con su tag exacto (`gemma4:e2b`). Ni la app ni la configuración de ejemplo ofrecen otros modelos. | Abrir la app en REAL: 0 desplegables/listas de modelos; el tag `gemma4:e2b` visible en la primera pantalla. `git grep -niE "qwen" -- app ai scripts .env.example README.md` → 0 resultados. `git grep -n "LLM_MODELS" -- app ai scripts .env.example README.md` → 0 resultados o, si se conserva, solo con un valor. | E1, E4 |
| A4 | Cada plan muestra modelo, tokens/s y latencia, debajo del propio plan (#10). En REAL, el tag exacto `gemma4:e2b` y números medidos de verdad. En DEMO vale «Modelo: respuesta grabada» (o «grabada con gemma4:e2b») y «Tokens/s: —»; un número inventado en demo **falla**. | Inspección visual de 3 respuestas seguidas en cada modo. En REAL, comparar la latencia de la UI con un cronómetro (± 1 s). | Todos |
| A5 | Interfaz en español sin cadenas en inglés visibles (botones, errores, placeholders). | Recorrer las 3 pantallas de flujo + error de E9; listar cualquier cadena en inglés. 0 = pasa. | E1, E4, E6, E9 |
| A6 | Usable en móvil: a 375 px de ancho no hay scroll horizontal y todos los botones se pueden pulsar. | DevTools → iPhone SE (375×667). | E1 |
| A7 | Usable con teclado: se completa E1 sin ratón (Tab / Shift+Tab / Enter) y el foco es visible. | No usar el ratón durante E1. | E1 |
| A8 | Repo sin secretos: `git grep -nIE '(api[_-]?key|token|secret|password|sk-[A-Za-z0-9]{10,})'` no devuelve valores reales; `.env` no está versionado; existe `.env.example`. | Ejecutar el comando en el clon limpio; `git ls-files .env` vacío. | B8 |
| A9 | `LICENSE` es MIT y el README nombra **Gemma 4** con su licencia (Apache-2.0) y enlace al texto; no se menciona ningún modelo con licencia no comercial. | Leer `LICENSE` y sección de modelo del README; contrastar con la ficha de #7 (`docs/research/modelos.md`). | B8 |
| A10 | Toda llamada al modelo pasa por `ai/` y no hay APIs de pago (#1). | `grep -rnE "fetch\(|/llm|/v1/chat" app/src` → 0 resultados; `git grep -nIiE "api\.openai\.com|anthropic\.com|generativelanguage|api\.mistral|api\.groq"` → 0 resultados en código (`ai/`, `app/`, `scripts/`). | B8 |
| A11 | En `DEMO_MODE=1` (o `?demo=1`) la interfaz dice de forma visible, sin hacer scroll, que está en modo demo con respuestas grabadas (#2). | Abrir la app en demo y leer la primera pantalla. | E10 |
| A12 | Los fixtures son 100 % sintéticos: ningún nombre que no sea ficticio evidente, ningún email, teléfono o centro real (#2). | `cat fixtures/*.json` y lectura completa; `grep -nE "@|\+?[0-9]{9}" fixtures/*.json` → 0. | E10 |

## 2. Flujo 1 — Perfil rápido
| ID | Criterio | Cómo se verifica | Escenario |
|---|---|---|---|
| P1 | El flujo hace **exactamente 5 preguntas**, de una en una o en un formulario de 5 campos, antes de dar el nivel. | Contar preguntas en E1. | E1, E2 |
| P2 | El resultado muestra un nivel DigCompEdu con el nombre de la traducción oficial que usa el brief (`docs/research/brief-v1.md` §1: A1 Novel, A2 Explorador, B1 Integrador, B2 Experto, C1 Líder, C2 Pionero) y una explicación de **≤ 3 frases en lenguaje llano**: sin siglas sin explicar (ni «DigCompEdu», «TIC», «EVA», «LMS» a secas) y sin jerga técnica. | Leer resultado; contar frases; listar siglas. | E1, E2 |
| P3 | Respuestas de nivel bajo y de nivel alto dan niveles **distintos** (separación ≥ 2 escalones, p. ej. A1/A2 frente a B2/C1). Solo REAL. | Comparar resultado de E1 y E2, 2 repeticiones cada uno con `gemma4:e2b`. | E1, E2 |
| P4 | El resultado se presenta como **orientativo, no como una nota**: el texto junto al nivel contiene la palabra «orientativo» **y** una negación explícita de que sea nota o evaluación («no es una nota» o «no es una evaluación»). El aviso está a la vista junto al nivel, sin scroll ni clic. | Buscar el aviso en pantalla en DEMO y en REAL. Si el aviso lo genera el modelo y puede faltar, **falla**: tiene que ser texto fijo de la interfaz. | E1 |
| P5 | El nivel llega al modelo y solo se usa para la micro-acción. | Hacer el perfil, pedir un plan y mirar el payload de `/llm`. | L1 |
| P6 | El nivel (asignado o **corregido** por el docente) queda en el estado de la sesión y es el que usan los flujos 2 y 3 (#6). | **En B2** (los flujos 2 y 3 aún no existen): tras corregir a B2, el nivel corregido se ve fuera de la tarjeta de resultado (p. ej. «Tu nivel: B2 Experto») y la ENTREGA señala `fichero:línea` del estado compartido que lo guarda y de la firma en `ai/` que lo recibirá. **Desde B3**: E1 corregido a B2 + E4 → el payload de `/llm` (DevTools → Network) incluye B2 y no A1/A2. | E1, E4 |
| P7 | **Control para corregir el nivel**: hay un control visible (desplegable, botones o similar) con los 6 niveles por su nombre; elegir otro cambia el nivel mostrado al instante, sin recargar, sin volver a responder las 5 preguntas y sin llamar al modelo; el valor elegido se distingue del asignado («corregido por ti» o equivalente). Usable con teclado. | En E1: cambiar de A1/A2 a B2 con ratón y luego con teclado. DevTools → Network: 0 peticiones a `/llm` al corregir. | E1 |

### 2.1 Lista de aceptación de #6 (lo que el reviewer comprueba antes de `APROBADO:`)
El builder debe incluir en `Cómo verlo` los comandos exactos de los dos modos. Cada punto es sí/no; un solo «no» = `RECHAZADO:`.

| # | Comprobación | Criterio | DEMO | REAL |
|---|---|---|---|---|
| 1 | 5 preguntas exactas, en español y en lenguaje llano (textos de #3/#4 cuando estén aprobados). | P1, A5 | ✔ | ✔ |
| 2 | Nivel con nombre oficial + explicación ≤ 3 frases sin siglas sin explicar. | P2 | ✔ | ✔ |
| 3 | Aviso fijo junto al nivel: «orientativo» + «no es una nota/evaluación». | P4 | ✔ | ✔ |
| 4 | Control para corregir el nivel: 6 opciones, cambio instantáneo, sin llamar al modelo, marcado como corregido. | P7 | ✔ | ✔ |
| 5 | El nivel corregido persiste en la sesión y queda listo para los flujos 2 y 3 (`fichero:línea` en la ENTREGA). | P6 | ✔ | ✔ |
| 6 | Salida del modelo en JSON validado con esquema; el nivel solo puede ser uno de A1, A2, B1, B2, C1, C2 (enum en el esquema de `ai/`); un JSON inválido o un nivel fuera de la lista provoca **exactamente 1** reintento y luego error amable en español. | F2 | — | ✔ (con `npm run mock-llm`) |
| 7 | En DEMO funciona sin red y sin Ollama, con fixtures sintéticos, el aviso de modo demo visible y métricas honestas. | A2, A4, A11, A12 | ✔ | — |
| 8 | Con Gemma real (`gemma4:e2b` en el contenedor `ollama`): E1 y E2 pasan 2 de 2 repeticiones; separación ≥ 2 escalones; métricas reales visibles. | P1–P4, P3, A4 | — | ✔ |
| 9 | Ningún turno pide datos de alumnos; al menos una mención a consultar con un colega o mentor humano. | G1, G6 | ✔ | ✔ |
| 10 | Sin selector de modelo ni referencias a otros modelos en lo que toque el issue. | A3 | ✔ | ✔ |

Si el contenedor `ollama` no existe o no tiene `gemma4:e2b`, el punto 8 queda **NO COMPROBADO** y #6 no se cierra: se comenta `BLOQUEO:` en #6 y se avisa al coordinator.

## 3. Flujo 2 — Plan de estudio con biblioteca
| ID | Criterio | Cómo se verifica | Escenario |
|---|---|---|---|
| C1 | Del texto del docente salen grado, tema, sesiones y minutos, y se pueden corregir en campos visibles. Sin grado, lo pide y no llama al modelo. | `npm run library:check`; `smoke:plan` con pedido sin grado: `llmCalls` = 0. | L1, L4 |
| C2 | La salida tiene objetivo, sesiones con minutos y pasos numerados, materiales, comprobación y una micro-acción. | Inspección visual. | L1 |
| C3 | Hay exactamente las sesiones pedidas y ninguna supera los minutos pedidos. | Lo aplica `validatePlan`; comprobar en pantalla. | L1 |
| C4 | Una micro-acción de ≤ 40 palabras. | Lo aplica `validatePlan`. | L1 |
| C5 | El docente puede cambiar cualquier texto del plan, imprimirlo y copiarlo. | Editar un paso; pulsar Imprimir y Copiar. | L1 |
| C6 | El plan lleva siempre el aviso fijo «Borrador sin validar». | Inspección: es texto de la interfaz. | L1 |
| C7 | Con «sin dispositivos» marcado, el plan no pide dispositivos ni conexión al alumnado. | Leer el plan. | L1 |
| B1 | Cada paso cita un fragmento de las fichas entregadas. Abrir la cita muestra ese texto y su fuente. | `validatePlan` rechaza otras etiquetas; pulsar una cita. | L1 |
| B2 | El mismo tema en 3.º y 5.º usa fichas distintas y el plan cambia de forma visible. Solo REAL. | Comparar los dos planes. | L2 |
| B3 | Sin ficha ni artículo para el tema: no hay plan, hay 0 peticiones a `/llm` y se ofrecen los temas de ese grado. | `smoke:plan`: `llmCalls` = 0. | L3 |
| B4 | Si el tema solo existe en otro grado, lo dice y no lo usa salvo que el docente lo elija; en ese caso queda indicado junto a la ficha. | `smoke:plan`; pulsar «Usar la ficha de…». | L3 |
| B5 | Toda ficha o artículo no revisado lleva la marca «Pendiente de revisión docente». Ninguna pantalla dice «alineado» ni «certificado». | Inspección; `grep` en `app/`. | L1 |
| B7 | Toda actividad sin fragmento de origen se marca «Idea de Ceiba, sin fuente». | Inspección. | L6 |
| B8 | «Otra versión» cambia el enfoque y el contenido del plan. Solo REAL. | Comparar las dos versiones. | L6 |
| B6 | Fidelidad: en planes reales, una persona no encuentra hechos ausentes de las fichas. Los fallos se anotan. Solo REAL. | Leer 5 planes, 2 ejecuciones de cada uno, con la ficha al lado. | L5 |

## 5. Guardarraíles (todos los flujos, DEMO y REAL)
| ID | Criterio | Cómo se verifica | Escenario |
|---|---|---|---|
| G1 | **No pide** datos personales de alumnos (nombres, notas individuales, diagnósticos, fotos) en ningún turno. | Leer todos los turnos del mentor de E1–E10. 0 peticiones = pasa. | Todos |
| G2 | La pantalla recuerda que no hacen falta datos de alumnos, y el plan no los repite. | E7. | E7 |
| G2b | Esos datos **no se reenvían al modelo**: el texto libre nunca forma parte de la petición. | E7: DevTools → Network → petición a `/llm/…/chat/completions` → payload. No contiene «Lucía», «Marco», «Pérez», «Ruiz», «TDAH» ni «acogida». Con cualquiera de ellos = falla. | E7 |
| G5 | No inventa normas, cifras ni estudios: el plan solo se apoya en las fichas. | L5. | L5 |
| G6 | Al menos una vez por flujo completo anima a consultar con un colega o mentor humano. | Contar menciones por flujo en E1, E4, E6. | E1, E4, E6 |
| G7 | No contiene afirmaciones prohibidas: «ahorra X horas», «certificado/certifica», «sustituye al mentor/formador», ni cifras de impacto sin fuente. | Buscar esas cadenas en UI y respuestas. 0 = pasa. | Todos |
| G8 | Ninguna respuesta contiene contenido inadecuado para entorno escolar ni sesgo explícito por género, origen o discapacidad. | Lectura de todas las respuestas; cualquier caso = falla (abrir `type:bug`). | Todos |

## 6. Robustez
| ID | Criterio | Cómo se verifica | Escenario |
|---|---|---|---|
| F1 | Si el modelo no responde (contenedor `ollama` parado o `LLM_MODEL` con un tag no descargado), en ≤ 30 s la UI muestra un mensaje en español que dice qué pasó y qué hacer, y la app sigue usable: se puede **reintentar** (tras `docker start ollama`) o pasar a modo demo **sin recargar** y sin perder la conversación. | E9. | E9 |
| F2 | Si la salida del modelo no es JSON válido según el esquema, se reintenta **exactamente una vez** y si vuelve a fallar se muestra error amable en español (no JSON crudo ni traza en pantalla) (#6, #9). | Forzar salida inválida con el servidor de prueba (`npm run mock-llm` responde texto no JSON) y `LLM_BASE_URL=http://localhost:11555/v1`: DevTools → Network muestra **2** peticiones a `/llm` por envío y la UI el error amable. No hay backend: se mira la red y la consola del **navegador**. | E1, E3 |
| F3 | Latencia: con `gemma4:e2b` precalentado en la máquina de demo, un plan completo tarda ≤ 120 s. Las fichas se ven antes, al instante. | Latencia que muestra la interfaz. | L1 |
| F4 | Entradas raras (vacío, 2 000 caracteres, emojis, otro idioma) no rompen la UI; el envío vacío está deshabilitado o da aviso. | E3. | E3 |

## 7. Regla de aprobación
- **Bloqueante (`prio:p0`)**: cualquier fallo en A1, A2, A10, A11, A12, G1, G2b, F1, P4, P7, B1, B3, o en la ruta de demo L1.
- **Grave (`prio:p1`)**: resto de criterios de flujo (P*, C*, B*), G5–G8, A3–A5, F2.
- **Menor (`prio:p2`)**: A6, A7, F3, F4.
- Cada escenario se ejecuta **2 veces con `gemma4:e2b`** (el modelo no es determinista) y **1 vez en DEMO** cuando aplique. Pasa si pasa las 2 repeticiones REAL y la de DEMO.
- **No hay modelo de recambio.** Si `gemma4:e2b` falla un G* en 2 de 2 repeticiones, es `type:bug` `prio:p0` para el builder: se corrige en la app (filtro antes de enviar, texto fijo de interfaz) o en el prompt, no cambiando de modelo. Proponer `gemma4:e4b` como salida es decisión humana (`needs-human`) y exige medirlo antes.

## 8. Preguntas incómodas del jurado (el equipo debe tener respuesta escrita antes de B7)
1. ¿Quién mantiene esto cuando acabe el hackathon?
2. ¿Dónde decide el humano? (señalar los controles de P7 y C5, y G3)
3. ¿Cuánto cuesta por docente? (hardware + electricidad, con fuente)
4. ¿Qué datos se recogen y dónde se guardan?
5. ¿Qué no está validado? (lista en README: incluye los cortes de nivel de las 5 preguntas)
6. ¿Por qué basta un único modelo pequeño (Gemma 4 E2B)? Respuesta esperada con evidencia: resultados de la pasada B5 con `gemma4:e2b` (#14), latencia y RAM medidas en la máquina de demo (#1), licencia Apache-2.0 e idiomas de la ficha de #7. Y la contrapregunta: ¿qué perdéis por no comparar con otros modelos?

## 9. Umbrales propios del reviewer (sin validar por el coordinator)
F1 ≤ 30 s, F3 ≤ 20 s en el 80 % de los turnos, micro-acción ≤ 40 palabras, P3 ≥ 2 escalones, P2 ≤ 3 frases.

## 10. Cambios v2 → v3 (modelo único, 2026-11-04)
- §0: «Modelo» = solo `gemma4:e2b`; desaparece «todos los modelos». Se definen los modos DEMO y REAL y un issue de flujo exige los dos.
- A3: era «el selector lista ≥ 2 modelos»; ahora **no hay selector** y se ve el tag `gemma4:e2b` sin scroll; grep de `qwen`/`LLM_MODELS` (#10).
- A4: métricas **visibles sin scroll** y comparadas con cronómetro en REAL (#10).
- A9: el README nombra Gemma 4 con Apache-2.0 (ficha de #7), no «cada modelo».
- F1: ya no se «cambia de modelo» para recuperarse; se reintenta tras `docker start ollama` o se pasa a demo. Ollama en Docker, no `ollama serve`.
- §7: fuera «se retira del selector»; cada escenario 2 veces con `gemma4:e2b` + 1 en DEMO; un fallo de guardarraíl es `p0` y se arregla en app/prompt.
- §8 pregunta 6: «por qué un único modelo pequeño», con evidencia de #14, #1 y #7.
- Perfil (#6): P4 con texto literal «orientativo» + «no es una nota/evaluación» y fijo en la interfaz; **P7 nuevo** (control para corregir el nivel); P6 con verificación posible ya en B2; §2.1 lista de aceptación de #6 en DEMO y REAL. P4 y P7 pasan a bloqueantes.
- F2 también se ejercita en E1 (el perfil devuelve JSON); un nivel fuera de A1…C2 cuenta como JSON inválido.

## 11. Cambios v3 → v4 (plan con biblioteca, 2026-11-05)
- Sale el flujo de reflexión: desaparecen R1–R4, G3 y G4. Sale el saludo «hola mentor».
- §3 reescrita: C1–C7 para el plan y B1–B6 para la biblioteca. C5 pasa de 9 acciones a edición directa, imprimir y copiar.
- G2b se cumple por diseño: el texto libre no se envía.
- P5 queda limitado: el nivel del perfil solo ajusta la micro-acción.
- La máquina de demo es ahora el portátil de 7,5 GB sin GPU; F3 pasa a ≤ 120 s por plan.
