# 01. Análisis de competencia (3 de noviembre de 2026)

## Conclusión

Casi todo el mercado intenta **medir mejor al alumno** con una pantalla por estudiante, conexión y una puntuación final. Nadie de los que hemos revisado resuelve a la vez estas cuatro condiciones:

1. Funcionar en un aula con **un solo móvil**.
2. Trabajar **sin conexión durante la clase**.
3. Dar al docente **evidencia trazable, sin puntuación ni etiqueta**.
4. Dirigir la atención del docente hacia el alumnado **que no está viendo**.

Ese es nuestro hueco.

**Alcance de esta revisión:** es rápida y se basa en fuentes públicas de hoy, no en un estudio exhaustivo. Marcamos con «?» lo que no pudimos verificar. No debemos decir «nadie lo hace» ante el jurado, sino «no lo hemos encontrado en lo que hemos revisado».

## Qué premia este hackathon

### Rúbrica oficial

| Criterio | Innovadora | Senior |
|---|---:|---:|
| Creatividad e innovación | **40 %** | 20 % |
| Acabado y calidad final | 20 % | 30 % |
| Transferibilidad al mercado | 20 % | 30 % |
| Educación digital con IA en países desfavorecidos | 20 % | 20 % |

Premio transversal «Reto ProFuturo», con cuatro criterios al 25 %: impacto social, enfoque inclusivo, sostenibilidad y escalabilidad, y uso ético y responsable de la IA.

Fuente: [bases 2026, sede de Arequipa](https://hack4eduarequipa.com/bases/).

### ¿Gana siempre la idea más fantasiosa?

Los datos no lo confirman del todo. Algunos premiados han sido llamativos, pero la mayoría de los que hemos encontrado son aplicaciones concretas:

| Edición | Proyecto | Qué hace | Lectura |
|---|---|---|---|
| 2020 | Move4Learn | Gamificación con actividad física | Concreto |
| 2021 | Words4All, Hear4All | Alfabetización por voz; traducción a lengua de signos | Concreto, con demo vistosa |
| 2022 | SmartChain | Incentivos con blockchain | Tecnología de moda |
| 2024 | PixelMAI, Hack4Minecraft | Actividades educativas sobre Minecraft con IA | Concreto y muy visual |
| 2025 | MyLEA | Plataforma de estudio para alumnado a distancia | Muy concreto |
| 2025 | Milo | Asistente para alumnado con TEA | Concreto, con usuario claro |
| 2025 | App de lengua de signos | Comunicación bidireccional | Concreto, con demo clara |
| 2025 | Plataforma para Perú | Currículo nacional, español, quechua y aimara | Muy aplicable |

Fuentes: [Emprendedores](https://emprendedores.es/ayudas/convocatorias/vuelve-hack4edu-en-busca-de-soluciones-educativas-con-ia-para-los-mas-vulnerables/), [Servimedia](https://www.servimedia.es/noticias/ultima-edicion-hack4edu-bate-record-participacion-casi-700-hackers-75-proyectos/1411043376), [ProFuturo](https://profuturo.education/noticias/conoce-a-los-ganadores-de-hack4edu-el-hackathon-con-proposito-social-dedicado-a-la-educacion-digital/).

**Lo que sacamos de aquí:** la muestra es parcial y no conocemos las deliberaciones del jurado, pero el patrón apunta a **un usuario claro y una demo que se entiende al momento**. Destello no necesita ser fantasioso, sino sorprendente y verificable.

### Qué es probable que presenten otros equipos

Es una previsión nuestra, no un dato:

- Un chatbot o avatar que conversa con el alumno y genera un perfil.
- Una app con minijuegos y un **gráfico de radar de habilidades**.
- Un panel docente con alertas o predicción de riesgo.
- Detección de emociones o de atención con cámara.

La mayoría chocará con la frase del reto: «evitando etiquetas o decisiones automatizadas». Un radar por alumno *es* una etiqueta con mejor diseño. Esa es nuestra diferencia frente a ellos.

## Mapa del mercado

### 1. Conversación simulada con IA: Google Vantage

Es el competidor técnico más serio.

- **Qué hace:** conversaciones con varios avatares de IA guiados por una rúbrica. Al final genera un mapa de habilidades.
- **Evidencia:** estudio con NYU de 188 participantes de 18 a 25 años en EE. UU., con acuerdo entre IA y expertos similar al de dos expertos entre sí. Otro estudio con 180 estudiantes obtuvo una correlación de 0,88 en creatividad.
- **Límites que reconoce Google:** es un experimento en inglés, no se ha demostrado la transferencia a interacciones humanas reales y las habilidades pueden depender del contexto cultural.
- **Frente a nosotros:** exige una pantalla por alumno y comprensión de lectura. El artículo no describe ningún panel docente. **Ellos puntúan; nosotros documentamos.**

Fuentes: [Google Research](https://research.google/blog/towards-developing-future-ready-skills-with-generative-ai/), [arXiv](https://arxiv.org/pdf/2609.15864).

### 2. Evaluación mediante juegos

| Actor | Situación | Límite para este reto |
|---|---|---|
| Physics Playground (Shute, FSU) | Investigación de referencia en *stealth assessment*: creatividad, persistencia y física | Requiere construir y validar un juego. El grupo reconoce que pasar de registros a inferencias válidas es difícil |
| Roblox (activos de Imbellus) | Comprados en 2020; hoy se usan como filtro de contratación | Se ha alejado del ámbito escolar |
| ATC21S | Evaluaciones colaborativas tipo juego | Reportó dificultades logísticas y pedagógicas |
| CREA | Suite abierta de evaluación de creatividad mediante juegos | No hemos verificado su despliegue actual |

**Patrón:** cada juego exige un dispositivo por alumno y una validación costosa. Nosotros aprovechamos el rigor de su método, el *evidence-centered design*, sin copiar su formato.

Fuentes: [Shute y Rahimi](https://myweb.fsu.edu/vshute/pdf/saecdpreprint.pdf), [Shute y Moore](https://myweb.fsu.edu/vshute/pdf/ShuteMoore.pdf), [EDM 2015](https://www.educationaldatamining.org/EDM2015/proceedings/short428-431.pdf), [Roblox](https://about.roblox.com/newsroom/2025/07/fair-play-robloxs-game-based-talent-assessment), [ACER](https://people.acer.org/en/publications/implementation-issues-with-games-based-assessment/).

### 3. Cuestionarios y escalas de fortalezas

- **Ejemplos:** DESSA-Mini, SEARS y SSIS SELb, los mejor valorados en una revisión de 20 escalas.
- **Límites:** la misma revisión avisa de que muchas herramientas «basadas en fortalezas» se centran en realidad en los déficits. Al depender de valoraciones, además, heredan las expectativas previas de quien responde.
- **No verificados hoy:** VIA Youth, Panorama, YouScience y Xello. No los citéis sin comprobarlos.

Fuente: [revisión de alcance](https://www.ebsco.com/articles/education/bf6064ce-271c-5709-a937-6cff67c5f7c0/strengths-based-screeners-for-k-8-students-a-scoping-review), [Wisconsin DPI](https://dpi.wi.gov/sspw/mental-health/social-emotional-learning/assessment/evidence-based).

### 4. Observación y portfolio: el sustituto más cercano

Es el flujo de trabajo más parecido al nuestro y la comparación que probablemente hará un jurado experto.

| Producto | Qué hace | Diferencia con Destello |
|---|---|---|
| TeachScribe | Observaciones por voz, educación infantil | Documenta lo que el docente ya vio. No dirige su atención hacia quien pasa desapercibido |
| Storypark | Documentación de aprendizaje con IA, traducción | Orientado a infantil y a la comunicación con familias |
| Seesaw | Portfolio K-5 con actividades y evaluación por IA | Según su propio material, orientado a generar y evaluar actividades |
| Additio | Gestión académica y evaluación formativa (España) | Es un cuaderno de notas: su unidad es la calificación |

No hemos verificado sus capacidades sin conexión.

Fuentes: [TeachScribe](https://edtechimpact.com/products/teachscribe/), [Storypark](https://thesector.com.au/2025/02/25/storyparks-new-ai-tools-underpinned-by-responsible-commitments-and-pedagogical-expertise), [Seesaw](https://seesaw.com/?p=20444), [Additio](https://elreferente.es/startup/additio-app).

### 5. Vídeo y cámaras en el aula

ClassMind y otros sistemas analizan grabaciones de clase. Algunos llegan a seguir actividad, interacciones y participación. Generan datos muy ricos, pero también el mayor problema de privacidad infantil, y necesitan más infraestructura.

**Decisión:** nada de vídeo ni de cámaras apuntando al alumnado.

Fuentes: [ClassMind](https://arxiv.org/abs/2509.18020v1), [Education Next](https://www.educationnext.org/next-gen-classroom-observations-powered-by-ai/).

### 6. Detección de emociones: un camino cerrado

Ediciones anteriores de Hack4Edu incluyeron proyectos de este tipo, como un [robot que detecta emociones en alumnado con TDA](https://www.servimedia.es/noticias/ultima-edicion-hack4edu-bate-record-participacion-casi-700-hackers-75-proyectos/1411043376).

En la UE, inferir emociones mediante datos biométricos en centros educativos está **prohibido**, salvo por motivos médicos o de seguridad ([FPF](https://fpf.org/blog/red-lines-under-eu-ai-act-unpacking-the-prohibition-of-emotion-recognition-in-the-workplace-and-education-institutions/), [Maldita](https://maldita.es/malditatecnologia/20250911/aplicar-ley-ia-centros-educativos/)).

### 7. IA para contextos sin conexión

| Actor | Enfoque | Situación |
|---|---|---|
| Kolibri + coach por WhatsApp (Offline Squared) | Contenidos sin conexión y coaching docente | [Propuesta en MIT Solve](https://solve.mit.edu/solutions/113251), sin resultados de despliegue encontrados |
| Intel + WWT | Portátiles con tutor LLM local en Guatemala | [Donación puntual](https://www.intel.com/content/www/us/en/newsroom/news/artificial-intelligence/intel-brings-offline-ai-opportunity-to-students-in-guatemala.html) que requiere hardware |
| Gnome (Raspberry Pi) | Asistente docente local | [Prototipo](https://lablab.ai/u/@dhruv_saini335) |
| ProFuturo | Plataforma y app con modo sin conexión | [262.000 docentes y 941.785 niños y niñas en 30 países en 2024](https://www.elindependiente.com/economia/empresas/2025/07/17/profuturo-nueve-anos-mayor-proyecto-educativo-espanol-africa-latinoamerica/) según datos de la propia fundación |

Estos proyectos llevan **contenido y tutoría** al entorno sin conexión. No hemos encontrado ninguno centrado en **descubrir fortalezas**.

**ProFuturo organiza el hackathon y ya opera sin conexión**, así que es el primer socio natural de despliegue. Es una hipótesis comercial: no existe ningún acuerdo y no podemos insinuarlo.

## Comparativa

✓ sí · ✗ no · ~ parcial · ? no verificado

| Criterio | Google Vantage | Juegos | Cuestionarios | Portfolio con IA | Vídeo con IA | **Destello** (objetivo de diseño) |
|---|:--:|:--:|:--:|:--:|:--:|:--:|
| Un solo móvil en el aula | ✗ | ✗ | ~ | ~ | ✗ | **✓** |
| El alumnado no necesita leer ni pantalla | ✗ | ~ | ✗ | ✓ | ✓ | **✓** |
| Captura sin conexión | ? | ? | ? | ? | ? | **✓** |
| Sin puntuación por alumno | ✗ | ✗ | ✗ | ~ | ? | **✓** |
| Confirmación docente obligatoria | ? | ✗ | n/a | ~ | ? | **✓** |
| Cada evidencia cita su fuente | ~ | ~ | ✗ | ~ | ? | **✓** |
| Dirige la atención hacia quien no se ve | ✗ | ✗ | ✗ | ? | ? | **✓** |
| Validación psicométrica | **✓** | **✓** | **✓** | ✗ | ~ | **✗** |

La última fila es real y **debemos asumirla sin rodeos**: Destello no es un test y no afirma medir. Está en el [documento 06](06-defensa-jurado.md).

## Tres datos para el relato

1. **La nota no ve la creatividad.** En PISA 2022, solo el **15 %** del alumnado español con alto rendimiento en pensamiento creativo lo tenía también en matemáticas, y el **14 %** en lectura ([La Moncloa](https://www.lamoncloa.gob.es/lang/en/gobierno/news/Paginas/2024/20240618-pisa2022-report.aspx)).
   *Precaución:* se refiere a estudiantes de 15 años en España. La brecha socioeconómica también existe en creatividad (7,9 puntos sobre 60). **No digáis que el alumnado vulnerable es igual de creativo según PISA.**
2. **Existe demanda regulatoria de evaluación competencial.** El perfil de salida de la LOMLOE se organiza por competencias clave ([Educación 3.0](https://www.educaciontrespuntocero.com/noticias/perfil-de-salida-lomloe/)). El docente tiene que recoger esa evidencia.
3. **La regulación favorece nuestro diseño.** La IA que evalúa resultados de aprendizaje es de alto riesgo en la UE, con obligaciones aplazadas a diciembre de 2027 ([Cooley](https://cdp.cooley.com/digital-ai-omnibus-delays-key-deadlines-introduces-new-rules/)). Quien hoy construye sobre una puntuación automática tendrá que rehacer mucho.

## Riesgos de esta competencia

- **Portfolio con IA:** puede añadir detección de fortalezas si el mercado lo pide. Nuestra defensa es el foco en contextos con pocos recursos y el código abierto.
- **Grandes tecnológicas:** Google tiene mejor modelo y más evidencia. Nuestra defensa no es la IA, sino el flujo en papel, un solo móvil y la decisión de no puntuar.
- **Validez:** la objeción más fuerte es «¿cómo sabéis que funciona?». Se responde con la evaluación descrita en el [documento 03](03-arquitectura-y-stack.md) y con franqueza.
