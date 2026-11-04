# Pitch v0 — guion de 3 minutos

> Estado: **borrador** del writer (issue #4). No es la versión final del vídeo (eso es `docs/pitch/guion-video.md`, bloque B8).
> Persona y tono: `app/src/copy/persona.md`.

## Cómo leer este guion

- Solo se lee en voz alta el texto normal. Lo que va entre corchetes son marcas para el equipo y **no se lee**.
- Marcas:
  - **[REAL]** — existe y se verá funcionando en la demo (a comprobar antes de grabar).
  - **[SIMULADO]** — se muestra con datos sintéticos, respuestas preparadas o un montaje.
  - **[SIN VALIDAR]** — idea o hipótesis nuestra; no hay pruebas que lo respalden todavía.
  - **[DECIDE EL DOCENTE]** — momento de la demo donde se ve que la última palabra es del docente.
  - **[POR CONFIRMAR]** — dato o nombre que aún no tenemos. No se dice hasta tenerlo.
- Hoy (B1) no hay nada ejecutable. Todo lo marcado [REAL] es **lo previsto**: el reviewer debe confirmarlo en B7 antes de grabar.

## Guion (≈ 450 palabras leídas)

### 1. Problema (≈ 30 s)

Muchos docentes trabajan solos. En una escuela rural, nadie entra en su clase para darles ideas, ni les pregunta después cómo fue.

Acompañar a un docente funciona. Pero cuando estos programas crecen, pierden buena parte de su efecto: no hay mentores para todos.

[Fuente provisional: `docs/research/informe-retos-hack4edu.md`, reto 12, metaanálisis Brown/Annenberg. POR CONFIRMAR con `docs/research/brief-v1.md` (#3). No dar cifras hasta que el researcher las verifique.]

### 2. Solución (≈ 25 s)

Os presentamos a Ceiba, un mentor que vive en el ordenador del docente. [Nombre POR CONFIRMAR.]

Ceiba no evalúa ni sustituye a nadie. Ayuda a preparar una clase, a pensar después de darla y a elegir un paso pequeño para la semana.

### 3. Demo (≈ 75 s)

[REAL previsto: chat web en local. Datos de la demo 100 % sintéticos.]

Primero, cinco preguntas cortas. No es un examen: sirven para que las ideas se ajusten a lo que esta docente ya sabe hacer. [REAL previsto, flujo 1.]

Ahora planifica una clase: cuarto de primaria, fracciones, 45 minutos, una pizarra y un móvil sin internet. Ceiba propone un borrador con lo que hay en esa aula. [REAL previsto, flujo 2.]

La docente cambia un paso y descarta la idea con el móvil. Ceiba lo acepta sin insistir. [DECIDE EL DOCENTE.]

Al final, una sola micro-acción para esta semana. Ella elige si la hace más pequeña. [DECIDE EL DOCENTE.]

Después de la clase, Ceiba no juzga: pregunta qué funcionó y qué cambiaría. [REAL previsto, flujo 3.]

Cuando el tema es delicado, como un conflicto entre alumnos, Ceiba lo dice claro: «esto háblalo con un colega o con tu mentor». Y nunca pide nombres ni datos de alumnos. [REAL previsto; guardarraíles en B4.]

### 4. Por qué modelos locales (≈ 25 s)

Ceiba funciona con modelos abiertos, en el propio ordenador. Ahora mismo usa Gemma 4. [REAL previsto.]

Cambiamos de modelo en directo y la conversación sigue. [REAL previsto. Segundo modelo POR CONFIRMAR con el builder.]

Desconectamos la red: sigue funcionando. Sin nube, sin coste por uso y sin que la conversación salga del equipo. [REAL previsto. Requisitos mínimos del equipo POR CONFIRMAR.]

### 5. Impacto (≈ 20 s)

Nuestra idea es que Ceiba no sustituya al mentor humano, sino que llegue donde no llega. [SIN VALIDAR.]

Una red como ProFuturo podría instalarlo en los equipos que ya tiene en las escuelas. [SIN VALIDAR. Coste de despliegue y número de docentes POR CONFIRMAR con el researcher.]

### 6. Límites honestos (≈ 25 s)

Seamos claros con lo que no sabemos.

No hemos demostrado que Ceiba cambie la forma de enseñar ni que mejore el aprendizaje. Eso exige pruebas de meses. [SIN VALIDAR.]

Lo probamos con [POR CONFIRMAR: número] docentes durante 15 minutos. [POR CONFIRMAR: resultados de B6. Si no hay pruebas, se quita esta frase.]

No sabemos aún cómo responde en otras lenguas. [SIN VALIDAR.]

Por eso cada respuesta es un borrador. Ceiba propone. Decide el docente. [DECIDE EL DOCENTE.]

## Momentos donde se ve que decide el docente

1. El perfil se explica como ayuda, no como nota (bloque 3).
2. La docente cambia el plan y descarta la idea con tecnología (bloque 3).
3. La docente ajusta la micro-acción (bloque 3).
4. Ceiba deriva a una persona en lugar de decidir (bloque 3).
5. Cierre: «Ceiba propone. Decide el docente.» (bloque 6).

## Qué no decimos (de la tabla «afirmaciones a evitar» del informe)

- «Ahorra horas al docente.»
- «Mejora el aprendizaje.» → «Así lo mediríamos…» (para B8).
- «Sustituye al mentor.»
- Mejoras de ProFuturo presentadas como causales.

## Pendiente para la siguiente versión

- [ ] Dato del problema verificado en `docs/research/brief-v1.md` (#3).
- [ ] Nombre definitivo del mentor.
- [ ] Segundo modelo open source y su licencia (builder).
- [ ] Coste y escala con ProFuturo (researcher).
- [ ] Resultados reales de las pruebas con docentes (B6, #17).
- [ ] Formato de entrega: vídeo, presentación o ambos (#25).
- [ ] Cronometrar en voz alta y ajustar a 3:00.
