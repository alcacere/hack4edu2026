# Resultados de revisión — B1 (2026-11-04)

> Autor: reviewer · refs #2 #3 #4 #5 · Criterios: `docs/review/criterios.md` v2 (commit 3e1c851).
> Solo cuenta lo que ejecuté o leí yo. Lo que no pude comprobar está marcado **NO COMPROBADO**.

## Resumen
| Issue | Veredicto | Motivo principal |
|---|---|---|
| #2 DEMO_MODE | **APROBADO** | 5/5 criterios con evidencia propia en un clon limpio (`npm run demo`, `?demo=1`, `build:demo` + `preview`): 0 llamadas a `/llm` y 0 peticiones externas |
| #3 Brief v1 | **RECHAZADO** | El resumen (línea 10) repite como [D] la comparación 87 % frente a 17 % que el propio brief invalida; matiz incorrecto sobre la actualización de DigCompEdu; probablemente pasa de 4 páginas |
| #4 Persona + pitch v0 | **RECHAZADO** | 8 afirmaciones de cosas que hoy no existen van como «[REAL previsto]», no como «POR CONFIRMAR»; además la persona choca con #6 en si se muestra el nivel |
| #5 Criterios y escenarios | Entregado v2 | Lo revisa el coordinator |
| #1 | No revisado | Por instrucción: el builder lo está terminando con Ollama real |

---

## #2 — DEMO_MODE=1 con fixtures

**Entorno.** Clon limpio `git clone https://github.com/alcacere/hack4edu2026` en `/tmp/h4e-rv-b1-0404/`, commit `3e1c851`, Node v24.22.2, `npm install` (0 vulnerabilidades). Chrome headless con `scripts/smoke-browser.mjs` del repo.

**Cómo hice «sin red».** El servidor de demo arrancó dentro de `unshare -rn`, con solo loopback: `curl https://ollama.com` → exit 7, y `:11434` → exit 7. Ahí `npm run demo` sirve `index` → 200. Chrome no levantó su puerto de depuración (CDP) dentro del namespace, así que el smoke corrió en el anfitrión con Chrome **sin red**: un envoltorio `--proxy-server=http://127.0.0.1:9` manda todo lo que no es loopback a un proxy inexistente. Control: `--dump-dom https://example.com` → `<body class="neterror">`.
**Ollama.** Mientras probaba, había un Ollama en marcha en el anfitrión (v0.40.14, del builder para #1); no lo paré porque no es mío. No afecta al resultado: en modo demo hubo **0 llamadas a `/llm`**. Además, el servidor demo dentro del namespace no veía `:11434`.

| Criterio de #2 | Resultado | Evidencia |
|---|---|---|
| `DEMO_MODE=1` activa en `ai/` un proveedor de fixtures con la misma interfaz | ✅ | `ai/index.ts`: `provider = config.demoMode ? createFixtureProvider() : createOpenAIProvider(...)`. Ambos implementan `LLMProvider.chat()` (`ai/types.ts`) |
| Fixture «hola mentor» + estructura para los 3 flujos | ✅ | `fixtures/hola.json` con 1 entrada; `perfil.json`, `plan.json` y `reflexion.json` con `entries: []`; formato en `fixtures/README.md` |
| Sin red y sin Ollama, la ruta de demo funciona | ✅ | `npm run demo` (literal) → smoke: `answer` = texto del fixture, `alert: null`, `stillUsable: true`, `llmCalls: []`, `external: []`, 24 peticiones, todas al propio origen. Lo mismo con `npm run dev` + `?demo=1` y con `npm run build:demo && npm run preview` (4 peticiones, 0 externas) |
| La interfaz indica visiblemente el modo demo | ✅ | `badge: "Modo demo: respuestas grabadas, sin modelo ni red"` en la cabecera (sin scroll); selector bloqueado (`selectDisabled: true`) |
| Fixtures 100 % sintéticos | ✅ | Lectura completa de `fixtures/*.json`: un único texto, sin personas; `grep -nE "@\|[0-9]{9}" fixtures/*.json` → 0 |

**Control negativo** (sirve para fiarse del detector): `npm run dev` sin demo → `llmCalls: ["…/llm/chat/completions"]` y alerta en español «El modelo respondió con un error (404): model 'gemma4:e4b' not found…». El smoke sí detecta las llamadas al modelo cuando existen.
**Métricas honestas (A4):** «Modelo: respuesta grabada · Latencia: 400 ms · Tokens/s: — · Origen: fixture grabado». No se inventan números.
**Bundle estático:** solo aparecen `react.dev` y `w3.org`, que son cadenas internas de React/SVG y no peticiones; las peticiones reales salen en el smoke (0 externas).

**No bloqueante (p2), para B2–B4:**
1. La latencia de 400 ms en demo es una pausa artificial (`delayMs = 400`), no una medida. Se muestra como «Latencia» junto a «Origen: fixture grabado». Es aceptable, pero en el vídeo no se debe presentar como velocidad del modelo.
2. En demo, el error de un flujo sin fixture (`Modo demo: aún no hay respuesta grabada para «perfil»`) es correcto hoy, pero E10 exigirá fixtures para los 3 flujos.
3. El script `demo` no funciona en el cmd de Windows (riesgo ya declarado por el builder). El salvavidas `?demo=1` sí funciona.
4. `.env.example` trae `LLM_TIMEOUT_MS=60000`: con un modelo lento, el aviso tardaría 60 s, por encima del umbral F1 (≤ 30 s). Se revisará en #1/B5. Con Ollama caído el error es inmediato.

---

## #3 — Brief v1 (`docs/research/brief-v1.md`, commit bc934e6)

**Enlaces abiertos: 10 de 10 citados (cifras clave incluidas).** Los PDF los leí con `pdftotext`.

| # | Fuente | Afirmación del brief | Resultado |
|---|---|---|---|
| 1 | Kraft et al. 2018 (Annenberg + PDF UMD) | 0,49 DE práctica / 0,18 DE aprendizaje, 60 estudios causales | ✅ Resumen: «Combining results across 60 studies… 0.49 standard deviations (SD) on instruction and 0.18 SD on achievement» |
| 2 | Kraft, tabla 6 | 0,63→0,34 y 0,28→0,10 DE, corte en 100 docentes | ✅ «Efficacy trials of smaller programs 0.631 / 0.281; Effectiveness trials of larger programs 0.342 / 0.099… n(Teachers) < 100» |
| 3 | Kraft, p. 18 | Virtual frente a presencial: sin diferencia significativa, EE grandes | ✅ «standard errors are too large to rule out even moderately sized differences» |
| 4 | Kraft | Definición: individual, intensivo (cada 2–3 semanas)…; un coach que no es evaluador reduce recelos | ✅ «individualized… intensive—coaches and teachers interact at least every couple of weeks»; «same person serve as both coach and evaluator can undercut» |
| 5 | JRC DigCompEdu | Revisión lanzada en mayo de 2026, final en primavera de 2027; 6 áreas; «añade el juicio profesional y la alfabetización en IA **de forma transversal**» | ⚠️ Fechas y 6 áreas ✅ («launched the update of DigCompEdu in May 2026», «scheduled to be launched in spring 2027», «keep the structure of six competence areas»). Pero la lanza **la Comisión Europea**, no el JRC, y la página dice «stronger prominence to educators' professional agency and judgement» y «AI literacy is integrated throughout». El único eje **transversal** que nombra es «well-being and sustainability». El brief lo atribuye mal |
| 6 | ProFuturo, encuestas 2022 (PDF) | 87,20 % (tabla 13); 71,54 % «bastante + mucho» y 17,23 % «mucho» (tabla 15) | ✅ Cifras exactas en las tablas 13 y 15. Las preguntas son distintas («¿Has modificado…?» sí/no frente a «¿Crees que los docentes han modificado…?» en 4 grados) |
| 7 | Banco Mundial (Sudáfrica) | 180 escuelas, virtual ≈ presencial, 1 coach virtual = 3, diferencia de coste < 5 USD, la coach virtual sobre todo anima | ✅ «within US$5 of each other»; «one coach to do the same work that three coaches did»; «provides mostly encouragement». Matiz: 80 de las 180 escuelas son de control |
| 8 | arXiv 2502.12397v3 | 529 docentes, 40.350 consultas, 17 meses; IA > web; 98 % más barato; evaluación ciega | ✅ Todo en el resumen; no mide aprendizaje (el brief ya lo dice) |
| 9 | NSSA Tutor CoPilot | > 700 tutores, 1.000 alumnos, +4 pp (+9 pp), ~20 USD/tutor/año, más preguntas de sondeo y menos elogio genérico | ✅ |
| 10 | AI Act, anexo III | 3.b, 3.c, 4.b | ✅ Texto literal coincide |
| 11 | EI sobre TALIS 2024 | 41 % / 66 % / 75 % | ✅ (fuente secundaria, ya marcada) |
| 12 | Common Sense, 6 ago 2025 | Sesgo según el origen percibido; «outsourced thinking»; partir del currículo y revisar | ✅ Matiz: la página dice «perceived student backgrounds», no «origen» |
| 13 | UNESCO AI CFT | 15 competencias, 5 dimensiones, 3 niveles | ✅ |
| 14 | Ghomi y Redecker 2019 (PDF) | 22 ítems, 0–88, α 0,934, áreas 2 y 4 < 0,7, n = 335 | ✅ Tabla 2: total .934, área 2 .687, área 4 .690; «335 participants in Germany» |

**Criterios de #3**
| Criterio | Resultado | Evidencia |
|---|---|---|
| Fuente con enlace en cada afirmación relevante; lo no verificable, marcado | ✅ con un fallo | Las 14 comprobaciones de arriba. Fallo: atribución de la actualización de DigCompEdu (fila 5) |
| Distingue demostrado, recomendado e hipótesis | ❌ parcial | La leyenda y las marcas existen, pero la **línea 10 del resumen** dice: «el 87 % de los docentes dice haber cambiado su práctica, pero solo el 17 % de los coaches ve "mucho" cambio [D]». Es la misma comparación que la §1 califica de errónea («mezcla "sí/no" con "mucho"») y sobre la que el coordinator avisó en #4. El resumen es lo que copia el writer. Además, la **línea 8** («las preguntas abiertas funcionan mejor que el elogio genérico [D en tutoría]») sobrevende: Tutor CoPilot demuestra que la herramienta *cambió* el tipo de pregunta y que *subió* el dominio, no que la pregunta abierta cause la mejora. Es [R] |
| Tabla 5 preguntas → nivel | ✅ | §1, con cortes 0–20 marcados [H] y sin validar |
| ≤ 4 páginas; resumen de 10 líneas | ❌ / ✅ | El resumen tiene 10 puntos. **Extensión: 2.713 palabras visibles** (markdown renderizado con `python-markdown`, sin URL). La ENTREGA dice «~2.400». A 11 pt en A4 son unas 5 páginas. **NO COMPROBADO en PDF**: Chrome y LibreOffice no terminaron de convertirlo en esta máquina (timeout), así que es una estimación. Carga de la prueba: el researcher debe adjuntar las páginas reales o recortar |
| ENTREGA con ruta e incertidumbres | ✅ | Comentario en #3 |

---

## #4 — Persona v0 (`app/src/copy/persona.md`) y pitch v0 (`docs/pitch/pitch-v0.md`), commit faf450a

| Criterio de #4 | Resultado | Evidencia |
|---|---|---|
| Reglas fijas: colegas/mentor humano, incertidumbre, sin datos de alumnos | ✅ | persona §3, reglas 1–3, más «decide el docente» y «no inventa» |
| El pitch marca real/simulado/sin validar; no inventa cifras | ❌ parcial | **0 cifras** en el texto leído (`grep` de %, USD, €, horas: solo «100 % sintéticos» dentro de una marca). Pero **8 afirmaciones** de cosas que hoy no existen van como «[REAL previsto]»: flujos 1–3, guardarraíles, «usa Gemma 4», «cambiamos de modelo y la conversación sigue», «desconectamos la red». La marca [REAL] se define como «existe y se verá funcionando». Regla del encargo: lo que hoy no existe va como **POR CONFIRMAR**. Además, la línea 15 («Hoy (B1) no hay nada ejecutable») ya es falsa: la demo grabada funciona (#2) |
| Señala dónde decide el docente | ✅ | 5 momentos listados |
| Español claro; cabe en 3 min | ✅ | 336 palabras leídas (comando del writer), unos 2:15 a 150 palabras por minuto |
| Se apoya en el brief cuando exista | ⚠️ | Correcto en su momento: faf450a es anterior a bc934e6. Ahora el dato del problema («pierden buena parte de su efecto al crecer») ya está verificado en el brief §4 (Kraft, tabla 6) y debe citarse de ahí, no de «Brown/Annenberg vía informe» |

**Conflicto de requisitos (decide el coordinator):** la persona §2 dice «El nivel… **no se le presenta al docente como una nota**. Si pregunta, se le dice», y la «Mala 1» llama jerga a «A1». En cambio, #6 exige «Resultado: **nivel** y explicación breve… el docente puede **corregir** el nivel», y `criterios.md` P2 pide el nombre oficial. Con las dos cosas a la vez, el builder no puede cumplir ambas. Propuesta: mostrar el nivel por su nombre en llano («Explorador»), con el código entre paréntesis opcional, más «punto de partida orientativo, no una nota» y un control para cambiarlo. Necesita `DECISIÓN:`.

**Riesgos para el pitch (preguntas del jurado que hoy no tienen respuesta en el texto):**
- «Una red como ProFuturo podría instalarlo en los equipos que ya tiene» [SIN VALIDAR]: el modelo más pequeño que se prueba pesa 3,4–4,6 GB y la máquina del equipo, con 7 GB de RAM, va justa. ¿Qué equipos tiene ProFuturo en el aula? Si son tablets, la frase cae. **Coste por docente** y **quién lo mantiene**: ausentes.
- La demo del pitch (4.º, 45 min, pizarra y móvil) no coincide con la ruta E4 (3.º, 50 min). Hay que alinearlas en `guion-demo.md`, que manda sobre E4.
- Persona, Buena 1: «¿qué fracción de la clase lleva gafas?» señala un rasgo físico de alumnos concretos. Mejor algo neutro (mochilas, lápices).
