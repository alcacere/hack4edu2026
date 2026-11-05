# Pitch v1: guion de 3 minutos

> Estado: **v1** (2026-11-05), según `docs/PLAN.md`. Solo se lee en voz alta el texto normal; lo que va entre corchetes son marcas para el equipo.
> Marcas: **[REAL]** se ve funcionando · **[SIN VALIDAR]** hipótesis nuestra · **[CONFIRMAR]** se quita si no se cumple antes de grabar · **[DECIDE EL DOCENTE]** momento de control humano.

## Guion (≈ 320 palabras)

### 1. Problema (≈ 30 s)

Muchos docentes trabajan solos. En una escuela rural, nadie les ayuda a preparar una clase y a menudo no hay conexión para buscar materiales.

Acompañar a un docente funciona, pero cuando estos programas crecen pierden buena parte de su efecto: no hay mentores para todos.

[Fuente: `docs/research/brief-v1.md` §4, Kraft et al. 2018. En voz alta no se dan cifras. **No usar** el «87 % frente a 17 %» de ProFuturo.]

### 2. Solución (≈ 20 s)

Esto es Ceiba. Vive en el ordenador del docente, con una biblioteca de temas de primaria y un modelo de IA abierto. No le da una lista de libros: le prepara un plan que puede usar y cambiar.

### 3. Demo (≈ 80 s)

[REAL. Wi-Fi apagado y a la vista. Grabar la ejecución real; recortar la espera y **rotular en pantalla** «espera recortada: N s», con el N medido.]

Apagamos el wifi. La docente escribe: «plan de estudio para quinto de primaria sobre el ciclo del agua, dos sesiones».

Ceiba entiende el grado, el tema y el tiempo, y ella puede corregirlos. Enseguida ve de qué ficha va a partir. [DECIDE EL DOCENTE.]

En menos de un minuto tiene el plan: objetivo, sesiones, pasos, materiales que hay en una escuela rural y cómo comprobar lo aprendido.

Cada paso dice en qué se apoya. Lo abrimos y aquí está el texto de la ficha.

Ella cambia un paso con un clic y lo imprime. Es un borrador: la última palabra es suya. [DECIDE EL DOCENTE.]

Ahora, el mismo tema para tercero. El plan cambia, porque cambia lo que ese grado debe lograr. Y si no le convence, pide otra versión con otro enfoque: jugar, contar una historia, debatir.

¿Y si pide algo que la biblioteca no tiene, como las criptomonedas? Ceiba lo dice y no se inventa nada. Le enseña lo que sí tiene.

Termina con un paso pequeño para su semana, porque el objetivo no es solo este plan, sino acompañar a quien enseña.

### 4. Cómo funciona (≈ 20 s)

Gemma 4, un modelo abierto, en un portátil de ocho gigas sin tarjeta gráfica. La biblioteca son ficheros: ciento setenta temas con artículos abiertos de Vikidia y Wikipedia, descargados una vez. Un ministerio o una ONG podría añadir los suyos sin servidores externos. Y lo que escribe la docente no llega ni al modelo, así que los nombres de sus alumnos no salen de ahí. [REAL. Son 7,5 GB medidos; decir «ocho» es redondear la capacidad del equipo.]

### 5. Impacto (≈ 15 s)

Una red como ProFuturo podría llevarlo a los equipos que ya están en las escuelas, y cada país aportaría su propia biblioteca. [SIN VALIDAR. Qué equipos lo soportan, coste y quién lo mantiene: no lo hemos comprobado.]

### 6. Límites honestos (≈ 15 s)

Seamos claros. El contenido aún no está revisado: viene de enciclopedias abiertas y de un mapa de temas que falta contrastar con el currículo oficial. Y no hemos medido su efecto en el aprendizaje. Lo probamos con [CONFIRMAR: número] docentes. [Si no hay pruebas, se quita la frase.]

Ceiba propone. Decide el docente.

## Preguntas del jurado: respuestas breves

- **¿Por qué no un RAG con vectores?** Con unos cientos de temas, el filtro por grado y la búsqueda por tema aciertan en las pruebas (`npm run library:check`), y un segundo modelo competiría por la poca RAM. Con muchos más se reabriría la decisión.
- **¿Es fiable el contenido?** Todavía no lo garantizamos. Es texto abierto, con su versión y su fuente guardadas, y la interfaz lo marca como sin revisar. El siguiente paso es revisarlo con docentes.
- **¿Cómo evitáis las invenciones?** El modelo solo recibe las fichas, cada paso debe citar una, y sin ficha no se genera nada. Citar no garantiza fidelidad: por eso el docente puede abrir la fuente y el plan es un borrador. Resultados de la lectura de planes reales: `docs/review/resultados-2026-11-05.md`.
- **¿Qué datos se guardan?** Ninguno en un servidor. El nivel del perfil se queda en la pestaña y se borra al cerrarla.
- **¿Quién mantiene la biblioteca?** [SIN VALIDAR] La idea es que lo haga la organización que despliega Ceiba; no lo hemos probado.

## Qué no decimos

- «Ahorra horas al docente», «mejora el aprendizaje», «sustituye al mentor».
- «Alineado con el currículo» o «certificado»: decimos «basado en».
- «Una IA sin errores». Tampoco cifras sin medir.
- El «87 % frente a 17 %» de ProFuturo.
