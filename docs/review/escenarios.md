# Escenarios de prueba — Reto 12 ★ «El entrenador invisible del docente»

> Autor: reviewer · refs #5 · **Versión 4 (2026-11-05): plan de estudio con biblioteca**. Cambios en `criterios.md` §11.
> Criterios que se comprueban: `docs/review/criterios.md` (IDs A*, P*, C*, R*, G*, F*).
> Datos **100 % sintéticos**. Docentes = «Docente A/B/C». Alumnado = nombres ficticios evidentes. Nada de esto describe a personas reales.
> Cada escenario se ejecuta **2 veces con `gemma4:e2b`** (modo REAL: Ollama en el contenedor Docker `ollama`, modelo precalentado) y **1 vez en `DEMO_MODE=1`** cuando aplique. No hay pasada por modelo: hay un solo modelo.

## Mapa de cobertura
| Escenario | Flujo | Tipo | Criterios principales |
|---|---|---|---|
| L1 | Plan | **Ruta de demo** | C1–C7, B1, B5, F3, A3, A4 |
| L2 | Plan | Mismo tema, grados distintos | B2 |
| L3 | Plan | Sin material y otro grado | B3, B4 |
| L4 | Plan | Entradas raras y sin grado | C1, F2, F4 |
| L5 | Plan | Fidelidad a las fichas (lectura humana) | B6, G5 |
| L6 | Plan | Temas descargados y «Otra versión» | B7, B8 |
| E1, E2 | Perfil (opcional) | Nivel bajo y alto | P1–P7, F2 |
| E7 | Plan | **Guardarraíl**: datos de alumnos | G1, G2, G2b |
| E9 | Plan | **Modelo caído** | F1 |
| E10 | Plan | **Demo sin red** | A2, A4, A11, A12 |

---

## L1 — Ruta de demo
Pedido: «Plan de estudio para 5.º de primaria sobre el ciclo del agua, 2 sesiones de 45 minutos». Repetir con «please generate a study plan for 5 grade students about the water cycle, 2 sessions».
- **Esperado:** campos rellenos; ficha `cyt-5-ciclo-agua` a la vista antes del plan; 2 sesiones de ≤ 45 min; cada paso con su cita, que se abre; aviso de borrador; marca de ficha sin revisar; micro-acción; editar, imprimir y copiar funcionan; métricas reales.

## L2 — Mismo tema en 3.º y 5.º
Pedir el ciclo del agua para 3.º y para 5.º, con 1 sesión cada uno.
- **Esperado:** fichas distintas. El plan de 5.º trata condensación o precipitación con esos nombres; el de 3.º usa un lenguaje más sencillo. **Falla si** los dos planes son prácticamente iguales.

## L3 — Sin material y otro grado
1. «Plan para 5.º sobre las criptomonedas»: dice que no tiene material, 0 peticiones a `/llm`, ofrece temas de 5.º.
2. «Plan para 5.º sobre el ciclo de las rocas»: igual; no vale devolver el ciclo del agua.
3. «Plan para 1.º sobre el ciclo del agua»: ofrece otros grados sin usarlos. Al elegir uno, queda indicado junto a la ficha.

## L4 — Entradas raras
1. Pedido vacío: botón deshabilitado.
2. «🙂🙂🙂📚📚» con un grado: sin material, sin romperse.
3. «Plan sobre el ciclo del agua» sin grado: lo pide, 0 peticiones; al elegirlo, sigue.
4. Texto de 2.000 caracteres: la interfaz no se rompe.
5. Salida inválida (`npm run mock-llm`): exactamente 2 peticiones y error amable.

## L6 — Temas descargados y variedad
«Plan para 5.º sobre la fotosíntesis», y después «Otra versión».
- **Esperado:** plan basado en el artículo, con su fuente y licencia a la vista; actividades propias marcadas como «Idea de Ceiba, sin fuente»; la segunda versión tiene otro enfoque y otros pasos.

## L5 — Fidelidad a las fichas
Una persona lee 5 planes reales, 2 ejecuciones de cada uno, con la ficha al lado. Anota cada hecho que no esté en la ficha, cada cita que no respalde su paso y cada paso que no se pueda hacer en un aula sin dispositivos. Los fallos se publican en los resultados.

## E1 — Perfil de Docente A (nivel bajo) · ruta de demo
- **Flujo:** 1 Perfil rápido. **Modos:** DEMO (1 vez) y REAL con `gemma4:e2b` (2 veces).
- **Precondición:** app recién abierta, conversación vacía. En REAL: `docker exec ollama ollama list` muestra `gemma4:e2b` y el modelo está precalentado.
- **Contexto sintético:** Docente A, maestra de Primaria rural, 25 años de experiencia, usa el móvil para WhatsApp, nunca ha usado tecnología en clase, el aula tiene un proyector compartido que casi nunca funciona.
- **Pasos / entradas** (responder a las 5 preguntas con lo más cercano a):
  1. «Uso el móvil para mensajes y poco más.»
  2. «Nunca he usado nada digital en clase.»
  3. «No sé lo que es un entorno virtual de aprendizaje.»
  4. «Me da miedo que se rompa algo o hacer el ridículo delante de los niños.»
  5. «Me gustaría empezar, pero no sé por dónde.»
- **Esperado:** exactamente 5 preguntas (P1); nivel A1 o A2 con nombre oficial y explicación de ≤ 3 frases en lenguaje llano (P2); junto al nivel, aviso fijo de la interfaz con «orientativo» y «no es una nota» (o «no es una evaluación») (P4); tono no condescendiente; al menos una mención a colega/mentor humano (G6); ninguna petición de datos de alumnos (G1); sin selector de modelo y con `gemma4:e2b` (REAL) o «respuesta grabada» (DEMO) visible (A3, A4). Repetir en 375 px (A6) y solo con teclado (A7).
- **Variante corrección (P7, P6):** tras el resultado, usar el control para cambiar el nivel a **B2 Experto**, primero con ratón y luego con teclado. Esperado: cambia al instante, sin recargar ni repetir las preguntas, 0 peticiones a `/llm` en DevTools → Network, marcado como «corregido»; el nivel B2 se sigue viendo fuera de la tarjeta de resultado. En B2 se anota el `fichero:línea` del estado de sesión que da la ENTREGA de #6; desde B3, seguir con E4 y comprobar que el payload de `/llm` lleva B2.
- **Variante JSON inválido (F2, solo #6):** `npm run mock-llm` + `LLM_BASE_URL=http://localhost:11555/v1 npm run dev`, responder las 5 preguntas → exactamente 2 peticiones a `/llm` y error amable en español; las respuestas del docente siguen en pantalla.
- **Falla si:** más o menos de 5 preguntas, nivel ≥ B1, lenguaje técnico sin explicar («LMS», «EVA», «DigCompEdu» a secas), falta el aviso o depende del modelo, no hay control para corregir o corregir llama al modelo / borra respuestas, o en DEMO o REAL alguno de estos puntos no se cumple.

## E2 — Perfil de Docente B (nivel alto)
- **Flujo:** 1 Perfil rápido. **Modos:** REAL con `gemma4:e2b` (2 veces; se compara con E1 REAL). En DEMO solo se comprueba que no se rompe.
- **Contexto sintético:** Docente B, profesor de Tecnología de Secundaria, coordina TIC del centro, diseña actividades en las que el alumnado programa y comparte recursos con otros centros.
- **Entradas:**
  1. «Uso a diario varias herramientas y creo materiales propios.»
  2. «Mis alumnos hacen proyectos en los que programan y publican.»
  3. «Gestiono el aula virtual del centro y formo a compañeros.»
  4. «Evalúo con rúbricas digitales y analizo los resultados para ajustar.»
  5. «Quiero ideas para que el alumnado use IA de forma crítica.»
- **Esperado:** 5 preguntas (P1); nivel B2, C1 o C2 (P2); separación ≥ 2 escalones respecto a E1 en las 2 repeticiones (P3); mismo aviso «orientativo, no es una nota» y control de corrección que en E1 (P4, P7).
- **Falla si:** el nivel coincide o es contiguo al de E1.

## E7 — Guardarraíl: el docente introduce datos personales de alumnos
- **Flujo:** Plan.
- **Entrada (datos ficticios):** «Plan para 5.º sobre el ciclo del agua para Lucía Ficticia Pérez, tiene TDAH, y Marco Inventado Ruiz del centro de acogida.»
- **Esperado:** el plan se apoya solo en la ficha y no repite esos datos. El payload a `/llm` no contiene «Lucía», «Marco», «Pérez», «Ruiz», «TDAH» ni «acogida» (`SMOKE_PROHIBIDAS` en `smoke:plan`).
- **Falla si:** alguno de esos datos aparece en el plan o en el payload.

## E9 — Modelo caído
- **Flujo:** Plan (L1). **Modo:** REAL con `gemma4:e2b`.
- **Pasos:**
  1. Con la app abierta y `DEMO_MODE=0`, parar Ollama: `docker stop ollama` (nadie usa `ollama serve` nativo).
  2. Enviar el primer mensaje del escenario y cronometrar.
  3. Sin recargar: `docker start ollama` y reintentar desde la UI; o activar modo demo si la UI lo ofrece.
  4. Variante: con el contenedor arriba, arrancar con `LLM_MODEL=modelo-inexistente:latest npm run dev` y enviar.
- **Esperado:** en ≤ 30 s mensaje en español que explica qué pasó y qué hacer (sin traza ni JSON; en la variante, que el modelo no está descargado y el comando `docker exec ollama ollama pull gemma4:e2b`); la conversación previa sigue visible; se puede reintentar o pasar a demo sin recargar (F1).
- **Falla si:** spinner infinito > 30 s, pantalla en blanco, error en inglés o técnico, o hay que recargar.

## E10 — DEMO_MODE sin red (ruta de demo completa)
- **Flujo:** Plan (L1, L2, L3). **Modelo:** ninguno (fixtures).
- **Pasos:**
  1. Arrancar con `DEMO_MODE=1` siguiendo el README.
  2. Cortar la red (Wi-Fi off / cable fuera, o servidor y navegador dentro de `unshare -rn`) **y** parar Ollama.
  3. Recargar la app y recorrer L1, L2 y L3.
- **Esperado:** toda la ruta funciona sin errores ni peticiones fallidas visibles (A2); las respuestas vienen de `fixtures/`; la UI indica que está en modo demo sin hacer scroll (A11); métricas honestas: «respuesta grabada» y «Tokens/s: —», no números inventados (A4); fixtures sintéticos (A12); los avisos (borrador sin validar, orientativo) siguen presentes; DevTools → Network sin peticiones a dominios externos.
- **Falla si:** cualquier error, carga de fuentes/CDN externos que rompa la vista, o petición a internet.

---

## Plantilla de resultado (una por escenario × modo × repetición)
Copiar en `docs/review/resultados-<AAAA-MM-DD>.md`.

```markdown
### E<n> · <REAL gemma4:e2b | DEMO> · rep <1|2>
- Fecha/hora: <AAAA-MM-DD HH:MM> · Commit probado: <hash corto> · DEMO_MODE: <0|1>
- Máquina: <CPU/GPU/RAM resumido> · Ollama: contenedor `ollama`, versión <x> · modelo precalentado: <sí|no>
- Resultado global: PASA | FALLA | BLOQUEADO (motivo)
| Criterio | Resultado (✅/❌/—) | Evidencia (cita breve o captura en docs/review/capturas/) |
|---|---|---|
| <ID> | | |
- Latencia por turno (s): <t1, t2, …> · tokens/s medio: <x>
- Fallos (uno por línea → issue `type:bug`):
  1. Pasos: … · Esperado: … · Obtenido: … · Issue: #<n>
- Notas: …
```

## Tabla resumen por pasada
```markdown
| Escenario | `gemma4:e2b` r1 | r2 | DEMO_MODE |
|---|---|---|---|
| E1 | | | |
| … | | | |
| E10 | — | — | |
```
