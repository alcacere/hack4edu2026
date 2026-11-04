# Pitch v0 — guion de 3 minutos

> Estado: **borrador v0.1** del writer (issue #4), corregido tras el RECHAZADO del reviewer (`docs/review/resultados-b1.md` §#4) y la DECISIÓN del coordinator en #4. No es la versión final del vídeo (eso es `docs/pitch/guion-video.md`, #20).
> Persona y tono: `app/src/copy/persona.md`. Textos de interfaz: `app/src/copy/es.ts` (#8).

## Cómo leer este guion

- Solo se lee en voz alta el texto normal. Lo que va entre corchetes son marcas para el equipo y **no se lee**.
- Marcas:
  - **[REAL]** — existe hoy y se puede ver funcionando.
  - **[POR CONFIRMAR: #n]** — aún no existe o no está verificado. Pasa a [REAL] solo cuando el reviewer apruebe el issue indicado. Si no se aprueba antes de grabar, la frase se quita.
  - **[SIMULADO]** — se muestra con datos sintéticos, respuestas grabadas o un montaje.
  - **[SIN VALIDAR]** — idea o hipótesis nuestra; no hay pruebas que lo respalden todavía.
  - **[DECIDE EL DOCENTE]** — momento de la demo donde se ve que la última palabra es del docente.
- **Qué existe hoy (2026-11-04, inicio de B2):** la app abre en el navegador y, con `npm run demo`, muestra un saludo del mentor grabado, sin modelo y sin red (#2, aprobado). Ese saludo se generó con Gemma 4 (`gemma4:e2b`) en la máquina anterior del builder (#1, en revisión); en la máquina actual todavía no se ha repetido con el modelo real. Los tres flujos aún no existen.
- **Un solo modelo:** el producto usa únicamente Gemma 4 (DECISIÓN humana del 2026-11-04, ver `docs/STATE.md`). El pitch no promete cambiar de modelo.

## Guion (≈ 330 palabras leídas)

### 1. Problema (≈ 30 s)

Muchos docentes trabajan solos. En una escuela rural, nadie entra en su clase para darles ideas, ni les pregunta después cómo fue.

Acompañar a un docente funciona. Pero cuando estos programas crecen, pierden buena parte de su efecto: no hay mentores para todos.

[Fuente: `docs/research/brief-v1.md` §4 — Kraft et al. 2018, tabla 6: el efecto sobre la práctica baja de 0,63 a 0,34 DE en programas de más de 100 docentes; verificado por el reviewer en `docs/review/resultados-b1.md`. En voz alta no se dan cifras. **No usar** el «87 % frente a 17 %» de ProFuturo: es una comparación no válida (#3).]

### 2. Solución (≈ 25 s)

Os presentamos a Ceiba, un mentor que vive en el ordenador del docente. [Nombre provisional hasta que lo confirme un humano.]

Ceiba no evalúa ni sustituye a nadie. Ayuda a preparar una clase, a pensar después de darla y a elegir un paso pequeño para la semana.

### 3. Demo (≈ 75 s)

[POR CONFIRMAR: #6, #9, #12. Chat web en local. Datos de la demo 100 % sintéticos (Docente A). Ruta alineada con el escenario E4 de `docs/review/escenarios.md`.]

Primero, cinco preguntas cortas. No es un examen: sirven para que las ideas se ajusten a lo que esta docente ya sabe hacer. [POR CONFIRMAR: #6.]

Ceiba le propone un punto de partida y ella puede cambiarlo. [POR CONFIRMAR: #6.] [DECIDE EL DOCENTE.]

Ahora planifica una clase: tercero de primaria, fracciones, 50 minutos, una pizarra y un móvil sin internet. Ceiba propone un borrador con lo que hay en esa aula. [POR CONFIRMAR: #9.]

La docente cambia un paso y descarta la idea con el móvil. Ceiba lo acepta sin insistir. [POR CONFIRMAR: #9.] [DECIDE EL DOCENTE.]

Al final, una sola micro-acción para esta semana. Ella elige si la hace más pequeña. [POR CONFIRMAR: #9.] [DECIDE EL DOCENTE.]

Después de la clase, Ceiba no juzga: pregunta qué funcionó y qué cambiaría. [POR CONFIRMAR: #12.]

Cuando el tema es delicado, como un conflicto entre alumnos, Ceiba lo dice claro: «esto háblalo con un colega o con tu mentor». Y nunca pide nombres ni datos de alumnos. [POR CONFIRMAR: #12, guardarraíles.]

### 4. Por qué un modelo local (≈ 20 s)

Ceiba funciona con Gemma 4, un modelo abierto, en el propio ordenador. [POR CONFIRMAR: #1 en la máquina actual y #7 para licencia y requisitos.]

Desconectamos la red: sigue funcionando. Sin nube, sin coste por uso y sin que la conversación salga del equipo. [POR CONFIRMAR: #1 con modelo real sin red; hoy solo es REAL con la demo grabada (#2). Requisitos mínimos del equipo: #7.]

### 5. Impacto (≈ 20 s)

Nuestra idea es que Ceiba no sustituya al mentor humano, sino que llegue donde no llega. [SIN VALIDAR.]

Una red como ProFuturo podría instalarlo en los equipos que ya tiene en las escuelas. [SIN VALIDAR. Qué equipos lo soportan (RAM, disco), coste por docente y quién lo mantiene: POR CONFIRMAR con el researcher (#7) antes de la v1 (#20).]

### 6. Límites honestos (≈ 25 s)

Seamos claros con lo que no sabemos.

No hemos demostrado que Ceiba cambie la forma de enseñar ni que mejore el aprendizaje. Eso exige pruebas de meses. [SIN VALIDAR.]

Lo probamos con [POR CONFIRMAR: #17, número] docentes durante 15 minutos. [Si no hay pruebas en B6, se quita esta frase.]

No sabemos aún cómo responde en otras lenguas. [SIN VALIDAR.]

Por eso cada respuesta es un borrador. Ceiba propone. Decide el docente. [DECIDE EL DOCENTE.]

## Momentos donde se ve que decide el docente

1. El perfil se presenta como punto de partida orientativo, no como nota, y la docente puede cambiarlo (bloque 3).
2. La docente cambia el plan y descarta la idea con tecnología (bloque 3).
3. La docente ajusta la micro-acción (bloque 3).
4. Ceiba deriva a una persona en lugar de decidir (bloque 3).
5. Cierre: «Ceiba propone. Decide el docente.» (bloque 6).

## Qué no decimos (de la tabla «afirmaciones a evitar» del informe)

- «Ahorra horas al docente.»
- «Mejora el aprendizaje.» → «Así lo mediríamos…» (para B8).
- «Sustituye al mentor.»
- «Certificado» o «evaluación oficial» del nivel DigCompEdu: es un punto de partida orientativo.
- Mejoras de ProFuturo presentadas como causales, y el «87 % frente a 17 %».
- «Cambiamos de modelo en directo»: hay un único modelo, Gemma 4.

## Pendiente para la siguiente versión

- [x] Dato del problema verificado en `docs/research/brief-v1.md` §4.
- [ ] Nombre definitivo del mentor (humano).
- [ ] Licencia, tamaño y requisitos de Gemma 4 (#7).
- [ ] Coste por docente, equipos de ProFuturo que lo soportan y quién lo mantiene (researcher).
- [ ] Resultados reales de las pruebas con docentes (B6, #17).
- [ ] Pasar cada [POR CONFIRMAR: #n] a [REAL] o quitar la frase, según lo que apruebe el reviewer.
- [ ] Cronometrar en voz alta y ajustar a 3:00 (vídeo) y preparar la versión de 5 min de la presentación (#20, #25).
