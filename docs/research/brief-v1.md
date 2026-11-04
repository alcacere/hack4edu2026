# Brief v1 — Base pedagógica y ética del mentor (reto 12)

Issue #3 · researcher · 2026-11-04 · Fuentes consultadas el 2026-11-04. Revisión 2 tras el RECHAZADO del reviewer (`docs/review/resultados-b1.md` §#3).

**Leyenda.** **[D] Demostrado**: lo dice una fuente primaria que he abierto, con datos o diseño causal. **[R] Recomendado**: lo propone un marco, un informe o los autores, o es un indicio sin prueba causal. **[H] Hipótesis nuestra**: decisión de diseño del equipo, aún sin validar. **[sin verificar]**: no pude abrir la fuente original, o solo leí el resumen o el registro bibliográfico.

## Resumen (10 líneas)

1. El coaching docente funciona: 0,49 DE en práctica y 0,18 DE en aprendizaje, según 60 estudios causales [D]. Se diluye al escalar: en programas grandes el efecto baja a 0,34 y 0,10 DE [D].
2. El coaching virtual no rinde peor que el presencial de forma significativa, aunque el margen de error es grande [D]. En Sudáfrica una coach virtual hizo el trabajo de tres [D].
3. No he encontrado ningún ensayo de un *mentor LLM para docentes* con resultados medidos en el aula [sin verificar: búsqueda no exhaustiva]. Lo más cercano es Tutor CoPilot (+4 pp de dominio, con tutores) [D].
4. DigCompEdu: 22 competencias, 6 áreas y 6 niveles (A1–C2). El propio marco dice que **no** es un instrumento de evaluación [D].
5. Hay un autotest validado de 22 ítems (α = 0,934, n = 335) [D]. Nuestras 5 preguntas son una **orientación**, no una medida [H].
6. TPACK: la tecnología se elige partiendo del contenido y la pedagogía, en contexto [R]. SAMR sirve como vocabulario, no como escalera [R].
7. Ciclo propuesto: planificar → actuar → reflexionar → micro-acción, individual, frecuente y centrado en una sola habilidad [R+H].
8. Con Tutor CoPilot los tutores hicieron más preguntas de sondeo y menos elogio genérico, y el dominio subió; que la pregunta abierta cause la mejora no está probado [R].
9. Límites: no evaluar alumnos ni al docente para su empleador, porque en la UE sería IA de alto riesgo [D: texto legal; H: nuestra lectura]. Además: sin datos de alumnos, avisos de sesgo y el docente decide.
10. La autodeclaración puede inflar el cambio. En ProFuturo, el 87 % de los docentes dice haber cambiado su práctica y el 72 % de los coaches ve cambio «bastante» o «mucho»: indicio [R], porque las preguntas son distintas. El mentor debe preguntar por hechos concretos y no pedir autovaloraciones.

## 1. DigCompEdu: qué es y cómo situar a un docente

**Estructura [D].** 22 competencias en 6 áreas: 1 Compromiso profesional · 2 Contenidos digitales · 3 Enseñanza y aprendizaje · 4 Evaluación y retroalimentación · 5 Empoderamiento de los estudiantes · 6 Desarrollo de la competencia digital de los estudiantes ([JRC](https://joint-research-centre.ec.europa.eu/scientific-activities/key-competences-lifelong-learning/digcompedu_en); [Redecker 2017, trad. INTEF/Universia 2020](https://www.metared.org/content/dam/metared/pdf/marco_europeo_para_la_competencia_digital_de_los_educadores.pdf), doi:10.2760/159770).

**Niveles [D]** (Redecker, trad. 2020, pp. 28–30), inspirados en Bloom y con las etiquetas del MCER:

| Nivel | Rol | Rasgo clave (resumen propio) | Qué necesita |
|---|---|---|---|
| A1 | Novel | Usa la tecnología para preparar y comunicarse, no en el aula | Orientación y ánimo |
| A2 | Explorador | Ha empezado en algunas áreas, sin enfoque coherente | Ejemplos de colegas |
| B1 | Integrador | Usa la tecnología en muchos contextos; aún no sabe bien qué funciona | Tiempo para experimentar y reflexionar |
| B2 | Experto | Elige herramientas con criterio y experimenta | Ampliar y estructurar su repertorio |
| C1 | Líder | Enfoque integral y reflexión continua; inspira a otros | Compartir y renovar |
| C2 | Pionero | Cuestiona las prácticas actuales e innova | Espacio para innovar |

La progresión es acumulativa y el nivel puede **variar mucho de un área a otra** [D]. El marco "no pretende ser un marco normativo ni un instrumento de evaluación del desempeño"; su fin es el desarrollo profesional [D] (p. 28).

**Actualización en curso [D].** La **Comisión Europea** lanzó la actualización en mayo de 2026; la versión final está prevista para la primavera de 2027 y mantiene las 6 áreas. Según la página del JRC, el borrador da "stronger prominence to educators' professional agency and judgement", y "AI literacy is integrated throughout" el marco. El único eje que la página llama transversal es "well-being and sustainability" ([JRC](https://joint-research-centre.ec.europa.eu/scientific-activities/key-competences-lifelong-learning/digcompedu_en)).

**Autotest validado [D].** Ghomi y Redecker (2019): 22 ítems, uno por competencia, de 0 a 4 puntos; la suma (0–88) da un nivel. α total 0,934, aunque las áreas 2 y 4 no llegan a 0,7; n = 335 docentes alemanes ([CSEDU 2019, doi:10.5220/0007679005410548](https://scitepress.org/PublishedPapers/2019/76790/76790.pdf)). La herramienta oficial es SELFIEforTEACHERS, en las 24 lenguas de la UE ([JRC](https://joint-research-centre.ec.europa.eu/scientific-activities/key-competences-lifelong-learning/digcompedu_en)).

**Riesgo de autodeclaración [R: indicio].** En las encuestas de ProFuturo de 2022, el 87,20 % de los docentes dice haber modificado sus actividades con tecnología (sí/no). Entre los coaches, el 71,54 % ve cambios "bastante" o "mucho" (17,23 % "mucho") ([ProFuturo, encuestas 2022, tablas 13 y 15](https://profuturo.education/wp-content/uploads/2024/07/ProFuturo_encuestas_2022_ES.pdf)). Las preguntas no son idénticas: es un indicio, no una medida. *Corrección al informe de retos:* comparar 87,2 % con 17,2 % mezcla "sí/no" con "mucho".

### Tabla: 5 preguntas candidatas → nivel DigCompEdu [H]

Diseño [H]: se pregunta por **lo que hizo el docente el último mes**, no por cómo se valora; las opciones (0–4) siguen los términos clave por nivel (Redecker, trad. 2020, tabla 8).

| # | Área | Pregunta (el último mes…) | 0 → A1 | 1 → A2 | 2 → B1 | 3 → B2 | 4 → C1/C2 |
|---|---|---|---|---|---|---|---|
| 1 | 2 Contenidos | ¿Qué hiciste con materiales digitales (vídeo, ficha, app)? | Ninguno | Usé uno tal cual | Lo adapté a mi grupo | Elegí entre varios con un criterio | Creé uno y lo compartí con colegas |
| 2 | 3 Enseñanza | ¿Para qué usaste la tecnología *dentro* de clase? | No la usé | La usé yo para mostrar algo | Los alumnos la usaron en una actividad | La elegí según el objetivo y la ajusté después | Rediseñé una actividad que sin ella no era posible y analicé el resultado |
| 3 | 4 Evaluación | ¿Cómo supiste qué habían aprendido? | Solo examen en papel | Probé un cuestionario digital | Uso herramientas digitales con regularidad para comprobar | Uso los datos para dar retroalimentación y adaptar | Reviso con espíritu crítico cómo evalúo con tecnología |
| 4 | 5+6 Alumnado | ¿Qué hicieron tus alumnos con la tecnología? | Nada | Consultaron algo que les indiqué | Colaboraron o crearon algo sencillo | Trabajaron a distinto ritmo, con apoyo para quien tiene menos acceso | Enseñé a contrastar fuentes o a usar la IA con criterio de forma sistemática |
| 5 | 1 Compromiso | ¿Aprendiste o compartiste algo sobre tecnología educativa? | No | Busqué algo puntual | Probé algo que vi en un curso o a un colega | Reflexioné sobre lo que funcionó y lo cambié | Formé o acompañé a otros colegas |

**Asignación [H].** Suma de 0 a 20: **A1 0–3 · A2 4–7 · B1 8–11 · B2 12–14 · C1 15–17 · C2 18–20**. Cortes propios, no validados. El mentor muestra el nivel global y **el área más baja**, por donde conviene empezar [D, Redecker: el nivel varía por área]. Se presenta como "punto de partida orientativo, no una nota".

## 2. TPACK y SAMR

**TPACK [R].** Mishra y Koehler (2006, *TCR* 108(6), doi:10.1111/j.1467-9620.2006.00684.x) amplían el PCK de Shulman con el conocimiento tecnológico: siete tipos de conocimiento que dependen del **contexto**, sin "una única solución tecnológica" válida para todos. Leído en Koehler, Mishra y Cain ([2013, trad. 2015](https://www.punyamishra.com/wp-content/uploads/2016/08/11552-30402-1-SM.pdf)) [sin verificar el texto de 2006].
→ **Regla [H]:** primero contenido y objetivo, luego cómo lo enseñaría sin tecnología, y solo después tecnología, según dispositivos, conectividad y tamaño del grupo.

**SAMR [R].** Puentedura: Sustitución y Aumento (*mejora*), Modificación y Redefinición (*transformación*) ([Puentedura, 2014](https://hippasus.com/rrpweblog/archives/2014/06/29/LearningTechnologySAMRModel.pdf)). No tiene revisión por pares. Hamilton, Rosenberg y Akcaoglu (2016, *TechTrends* 60:433–441, doi:10.1007/s11528-016-0091-y) le critican que ignora el contexto, que es rígidamente jerárquico y que mira el producto y no el proceso [sin verificar: solo el resumen].
→ **Regla [H]:** usar SAMR para *describir* una propuesta, nunca para decir "sube de nivel". Sugerencia por nivel: A1–A2, una herramienta conocida para una sola tarea; B1–B2, modificar una actividad y comprobar si mejoró el objetivo; C1–C2, rediseñar, documentar y compartir con colegas.

## 3. Ciclo de coaching y preguntas

**Coaching eficaz [D: definición operativa].** Kraft, Blazar y Hogan (2018): **individual**, **intensivo** (contacto al menos cada dos o tres semanas), **sostenido**, **en el contexto** del aula y **centrado** en la práctica de habilidades concretas ([texto completo](https://education.umd.edu/sites/default/files/uploads/inline-files/Kraft%20Blazar%20Hogan_2018_The%20Effect%20of%20Teacher%20Coaching_Review%20of%20Educational%20Research.pdf), p. 7).

**Referencias [R].** *Impact Cycle* de Knight: Identificar → Aprender → Mejorar ([Instructional Coaching Group](https://www.instructionalcoaching.com/events/the-impact-cycle/)) [sin verificar: no leí el libro]. Popova et al. asocian la formación eficaz a practicar la lección, centrarse en una asignatura y hacer seguimiento en el aula ([WP 8572](https://ideas.repec.org/p/wbk/wbrwps/8572.html)) [sin verificar: solo el resumen].

**Nuestro ciclo [H]:**

1. **Planificar.** ¿Qué quieres que aprendan? ¿Cómo sabrás que lo han conseguido? ¿Qué parte te preocupa?
2. **Actuar.** El docente da la clase; el mentor no observa.
3. **Reflexionar.** ¿Qué pasó, en concreto? ¿Qué hicieron los alumnos? ¿Qué te sorprendió? ¿Qué cambiarías?
4. **Micro-acción.** Un solo cambio para esta semana, de menos de 15 minutos, y con qué señal sabrás si funcionó.

**Preguntas [R].** En el ensayo de Tutor CoPilot la herramienta aumentó las *preguntas de sondeo*, redujo el *elogio genérico* y el dominio subió ([Wang et al. 2025, NSSA](https://nssa.stanford.edu/studies/tutor-copilot-human-ai-approach-scaling-real-time-expertise)); no aísla que las preguntas causen la mejora. Regla [H]: preguntas abiertas y concretas, como máximo un elogio específico y nunca un plan completo sin preguntar antes.

**Límite del canal virtual [D].** En Sudáfrica la coach virtual daba sobre todo **ánimo**, porque no podía observar ([Banco Mundial](https://blogs.worldbank.org/en/impactevaluations/can-technology-enable-effective-teacher-coaching-scale)). El nuestro tampoco: debe pedir hechos concretos [H].

## 4. Evidencia: qué sabemos y con qué fuerza

| Afirmación | Fuerza | Fuente |
|---|---|---|
| Coaching: +0,49 DE en práctica y +0,18 DE en aprendizaje; 60 estudios causales, sobre todo lectoescritura en infantil y primaria en EE. UU. | **D** (meta-análisis) | [Kraft et al. 2018, RER 88(4), doi:10.3102/0034654318759268](https://annenberg.brown.edu/publications/effect-teacher-coaching-instruction-and-achievement-meta-analysis-causal-evidence) |
| A escala baja: práctica 0,63 → 0,34 DE y aprendizaje 0,28 → 0,10 DE (menos frente a más de 100 docentes) | **D** | Kraft et al. 2018, p. 26 |
| Virtual frente a presencial: sin diferencia significativa, con errores estándar grandes | **D** (con cautela) | Kraft et al. 2018, p. 18 |
| Sudáfrica: 180 escuelas asignadas al azar (50 presencial, 50 virtual, 80 control). Ambos coachings mejoraron la comprensión oral en inglés sin diferencia clara; una coach virtual hizo lo de tres. Coste anual por alumno "within US$5" entre los dos modelos: el ahorro en salarios se fue en tablets y datos | **D** | [Banco Mundial](https://blogs.worldbank.org/en/impactevaluations/can-technology-enable-effective-teacher-coaching-scale) → [Kotze, Fleisch y Taylor](https://www.sciencedirect.com/science/article/pii/S0738059318304073). *Corrección al informe:* esos 5 USD son la diferencia entre modelos, no el coste |
| Sierra Leona: 529 docentes, 40.350 consultas por WhatsApp en 17 meses; más uso que la búsqueda web; un 98 % más barato que cargar una web; docentes evaluadores, a ciegas, prefirieron sus respuestas | **D** de uso y calidad percibida, **no** de aprendizaje | [Björkegren et al., arXiv 2502.12397v3](https://arxiv.org/abs/2502.12397v3) |
| Tutor CoPilot: más de 700 tutores y 1.000 alumnos; +4 pp de dominio (+9 pp con los tutores peor valorados); unos 20 USD por tutor y año | **D** (tutores, EE. UU.) | [NSSA/Stanford](https://nssa.stanford.edu/studies/tutor-copilot-human-ai-approach-scaling-real-time-expertise) |
| TALIS 2024: el 41 % de los docentes usa IA; el 66 % cree que hace recomendaciones inapropiadas o incorrectas | **D** (encuesta), fuente secundaria | [EI sobre TALIS 2024](https://www.ei-ie.org/en/item/31815:using-artificial-intelligence-takeaways-from-talis-2024) [sin verificar en el informe de la OCDE] |

**Conclusión para el pitch [R].** La evidencia respalda el *formato* (coaching individual y frecuente, también a distancia) y que una IA **ayude a un humano**; **no** que un mentor IA mejore por sí solo el aprendizaje. Mensaje: "multiplicar al coach humano, no sustituirlo" ([WDR 2018, vía Banco Mundial](https://blogs.worldbank.org/en/impactevaluations/can-technology-enable-effective-teacher-coaching-scale)).

## 5. Límites éticos (guardarraíles)

- **No evaluar alumnos [D + H].** El AI Act considera de alto riesgo la IA que *evalúa resultados de aprendizaje* o *decide el nivel educativo* (anexo III, 3.b y 3.c) ([texto](https://artificialintelligenceact.eu/annex/3/)). El mentor no pide datos de alumnos [H].
- **No evaluar al docente para terceros [D + H].** También lo es la que *evalúa el rendimiento* de trabajadores (anexo III, 4.b). El nivel DigCompEdu es solo para el docente: no se guarda ni se comparte [H; no es asesoría jurídica].
- **Privacidad [H].** Sin cuentas ni memoria; modelo local; datos de demo sintéticos.
- **Sesgos y "pensamiento externalizado" [D: evaluación de Common Sense].** Los asistentes de IA para docentes mostraron sesgo en planes de conducta y PTI según los "perceived student backgrounds", y facilitan llevar material al aula sin revisarlo ([Common Sense Media, ago 2025](https://about.commonsensemedia.org/press-room/press-releases/ai-teacher-assistants-need-better-safety-measures-common-sense-media-report-finds)). → El mentor no redacta planes de conducta ni PTI, adapta lo que el docente ya tiene y cierra con "revísalo tú" [H].
- **Sobreconfianza [R].** El 66 % desconfía ya de las recomendaciones de la IA (TALIS), y la actualización de DigCompEdu refuerza el juicio profesional del docente (§1). → El mentor declara su incertidumbre, no inventa datos ni normativa y deriva al mentor humano en temas sensibles [H].
- **El docente decide [R].** El marco de la UNESCO incluye la *mentalidad centrada en el ser humano* y la *ética de la IA* ([UNESCO](https://www.unesco.org/en/articles/ai-competency-framework-teachers)).

## 6. Incertidumbres y pendientes

- Los cortes de las 5 preguntas no están validados; probarlos en B6 frente a SELFIEforTEACHERS.
- Solo resumen o registro de: Mishra y Koehler 2006, Hamilton et al. 2016, Popova et al. y Knight. TALIS 2024, vía EI. DigCompEdu 2017, vía la traducción oficial INTEF/Universia (JRC107466).
- La evidencia de coaching es sobre todo de EE. UU. y primaria; transferirla es una inferencia.
- Las fechas de aplicación del AI Act no las he verificado.
