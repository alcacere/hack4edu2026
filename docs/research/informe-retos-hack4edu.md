# Qué retos de Hack4Edu caben en 63 horas

Los retos con más opciones en Hack4Edu 2026 son los que convierten un fallo de implementación documentado en una función visible y que dejan a una persona (docente, coach o validador) tomando la decisión final. Encabezan la lista seis retos con distintivo ★, que optan además al Premio Retos ProFuturo de 1.000 €: **11 (segunda oportunidad / TaRL), 12 (mentor del docente), 03 (contenido accesible), 10 (mapa de brechas), 17 (laboratorio sin laboratorio) y 02 (offline-first, idealmente con la IA local del 29)**. El calendario manda: la ejecución va del **3 nov a las 9:00 al 5 nov a las 23:59 (unas 63 horas, es decir, unos 3 días y no 4)** y la final internacional es el 7 nov, con entrega de pitch de 5 min o vídeo de 3 min más repositorio con licencia libre ([ProFuturo Hack4Edu](https://profuturo.education/hack4edu)). En los 29 retos se repiten los mismos problemas de implementación: la tecnología se usa poco aunque haya cobertura, el impacto aparece solo cuando hay un humano en el circuito, los datos de menores están muy regulados, la calidad de la IA cae en lenguas con pocos recursos y en modelos pequeños, y lo caro de verdad son la gestión y el acompañamiento, no el software. Nada de esto se arregla en un hackathon. Por eso la estrategia ganadora es construir una rebanada estrecha, demostrable con datos sintéticos o contenido semilla, que muestre de forma explícita dónde entra el humano, qué datos no se recogen y qué queda sin validar. Lo que ningún equipo puede entregar en 63 horas es evidencia de aprendizaje, uso sostenido, validación con usuarios reales ni integración con sistemas ministeriales, y el pitch tiene que decirlo antes de que lo pregunte el jurado.

## Seis retos ★ ganan más puntos por hora invertida

Los criterios de la modalidad innovadora pesan **creatividad 40 %, acabado 20 %, transferibilidad a mercado 20 % y educación digital con IA en países desfavorecidos 20 %**. El Premio Retos ProFuturo, reservado a los retos ★ (02, 03, 06, 10, 11, 12, 13, 15, 17 y 20), reparte a partes iguales impacto social en contextos vulnerables, enfoque inclusivo, sostenibilidad/escalabilidad y uso ético de la IA ([ProFuturo Hack4Edu](https://profuturo.education/hack4edu)). Un reto ★ compite por dos premios con el mismo trabajo, y eso desempata a favor de los ★ cuando la viabilidad es parecida. Hoy es 3 nov, así que **la ventana de construcción ya está abierta**: conviene elegir reto en las primeras horas y dejar la tarde del 5 nov para grabar el vídeo y cerrar el repositorio.

| Puesto | Reto | ★ | Por qué es ganable en ~3 días | Riesgo principal |
|---|---|---|---|---|
| 1 | 11 Una segunda oportunidad para aprender | Sí | El problema está muy medido y el fallo a escala no es de software (asistencia, sesiones que no se celebran). Basta un móvil del docente offline | Que parezca "solo un formulario". La creatividad tiene que estar en el ciclo diagnóstico → grupo → sesión celebrada |
| 2 | 12 El entrenador invisible del docente | Sí | Hay un canal validado en bajos recursos (WhatsApp) y evidencia de que el coaching remoto funciona. Superficie técnica pequeña | Calidad en lenguas locales; percepción de vigilancia |
| 3 | 03 Un contenido, muchas formas de aprender | Sí | UNICEF ya demostró el flujo de borrador con IA y revisión humana. Hay argumento de mercado (EAA) | Texto alternativo en STEM; no poder afirmar que cumple la UNE |
| 4 | 10 Tecnología que encuentre a quien estamos dejando atrás | Sí | Muy demostrable con datos sintéticos. La privacidad (supresión de celdas pequeñas) se ve en pantalla | Que el jurado lo vea como "otro dashboard" |
| 5 | 17 Un laboratorio donde no hay laboratorio | Sí | Demo muy visual (sensores del móvil y simulación), sin hardware nuevo y offline | Competir con PhET si no se diferencia |
| 6 | 02 Aprender sin conexión (+ IA local del 29) | Sí (02) | Demo en modo avión muy impactante y privacidad sin nube | El riesgo técnico más alto de la lista; pide equipo de 3 o más |

**El reto 11 es la apuesta más segura.** La pobreza de aprendizaje alcanza a **~70 % de los niños de 10 años en países de ingreso bajo y medio** y se proyecta un 80 % en América Latina ([DevelopmentAid/UNICEF](https://www.developmentaid.org/news-stream/post/145509/learning-poverty-poverty-education)). Enseñar según el nivel es uno de los tres "Great Buys" del GEEAP ([Informe GEEAP 2023](https://resources.peopleinneed.net/documents/1290-geeap-report-smart-buys-2023-final_compressed--1-.pdf)). Los fallos a escala son concretos: TaRL en horario escolar sin tiempo protegido **no tuvo efecto** en India ([J-PAL Policy Insight](https://povertyactionlab.org/policy-insight/tailoring-instruction-students-learning-levels-increase-learning)) y en Zambia **solo un tercio de los alumnos asiste un día cualquiera** ([J-PAL TaRL/Catch Up](https://www.povertyactionlab.org/initiative-project/tarlcatch-improving-implementation-fidelity-scale)). Un producto que ataque eso (idea: diagnóstico oral tipo ASER de 5 minutos, grupos automáticos, plan de sesión sin pantalla y botón de "sesión celebrada") puntúa en los cuatro criterios ProFuturo, encaja con la plataforma offline y las Matemáticas que ProFuturo ya tiene ([Memoria ProFuturo 2024](https://profuturo.education/wp-content/uploads/2025/07/memoriadeactividad_2024.pdf)) y no depende de que un LLM acierte.

**El reto 12 apoya un formato barato en evidencia sólida.** El coaching docente rinde **0,49 DE en práctica y 0,18 DE en aprendizaje**, aunque se diluye al escalar ([Brown/Annenberg](https://annenberg.brown.edu/publications/effect-teacher-coaching-instruction-and-achievement-meta-analysis-causal-evidence)). En Sudáfrica una coach virtual hacía el trabajo de tres ([Banco Mundial](https://blogs.worldbank.org/impactevaluations/can-technology-enable-effective-teacher-coaching-scale)), y en Sierra Leona 529 docentes hicieron **40.350 consultas** a una IA por WhatsApp, un canal ~98 % más barato que la web ([arXiv 2502.12397](https://arxiv.org/abs/2502.12397v3)). El hueco que nadie ha cubierto, un mentor IA que multiplique al coach humano en lugar de sustituirlo, es justo lo que pide el reto. **El reto 03** tiene un precedente de UNICEF que pasó de "meses" a "días o semanas" con revisión humana ([UNICEF Innocenti](https://www.unicef.org/innocenti/can-ai-help-bridge-gap-inclusive-education)) y un mercado regulado: la European Accessibility Act cubre los e-books desde el 28 jun 2025 ([Reed Smith](https://www.reedsmith.com/our-insights/blogs/viewpoints/102kxnd/the-eu-accessibility-act-is-now-in-force/)). **El reto 10** convierte la restricción del enunciado ("sin identificar a estudiantes") en el núcleo técnico, con reglas de supresión reales como n<10 más supresión complementaria ([OSSE](https://osse.dc.gov/sites/default/files/dc/sites/osse/publication/attachments/OSSE%20Student%20Privacy%20and%20Data%20Suppression%20Policy%20%281%29.pdf)); además se puede fusionar con el 13 ★. **El reto 17** se apoya en que PhET ya funciona offline y phyphox ya lee los sensores del móvil ([PhET Yidan Report](https://phet.colorado.edu/files/Yidan.Annual.Report.Jan-Dec.2021.pdf); [arXiv 1804.06239](https://arxiv.org/pdf/1804.06239)), así que el aporte diferencial es el método científico guiado con IA acotada. **El reto 02 con IA local** da la demo más llamativa, pero hasta Kolibri tiene fallos de sincronización documentados tras semanas de uso en Raspberry Pi ([Foro Learning Equality](https://community.learningequality.org/t/problems-synchronizing/2791?page=2)).

Sin conocer el tamaño del equipo, la regla es esta. **En solitario o en pareja**, 11 o 12: un móvil o un bot, un panel y datos semilla. **Con 3–4 personas**, 03, 10+13 o 17. **Con 4 o más y alguien con experiencia en offline/PWA**, 02+29. Entre los retos sin ★, los más fuertes para la modalidad general son el **04** (tutor socrático con intento de jailbreak fallido en directo), el **27** (preguntas de defensa a partir del propio trabajo) y el **05** (alerta temprana con "receta" de acción).

## Los mismos siete problemas reaparecen en casi todos los retos

### Hay cobertura, pero no uso

**3.100 millones de personas (38 % de la población mundial) viven bajo cobertura móvil de banda ancha y no la usan.** En los países de ingreso bajo y medio el móvil supone el 84 % de las conexiones ([GSMA SOMIC 2025 vía Tech-ish](https://tech-ish.com/2025/09/12/the-digital-divides-new-frontline-3-1-billion-people-have-internet-access-they-cant-use)). Un terminal de entrada cuesta el **16 % del ingreso mensual medio y el 48 % para el quintil más pobre** ([ITWeb/GSMA](https://www.itweb.co.za/article/sub-saharan-africa-still-sees-lowest-mobile-internet-usage/lwrKx73Ybwrqmg1o)), y la escasez de DRAM hará caer un 19 % los envíos de smartphones en Oriente Medio y África en 2026 ([NewsGhana/Counterpoint](https://www.newsghana.com.gh/africa-smartphone-growth-faces-reversal-as-memory-shortage-bites/)). Solo el **40 % de las escuelas primarias tiene internet y una de cada cuatro no tiene electricidad** ([UNESCO GEM 2023](https://www.unesco.at/fileadmin/Redaktion/Bildung/2023GE-Report_TechEd_Summary.pdf)). Más del 40 % de los usuarios del Learning Passport en Nigeria y Zimbabue comparte dispositivo ([UNICEF LP 2024](https://www.unicef.org/learningpassport/media/1406/file/Learning%20Passport%202024%20Six%20Month%20Report.pdf.pdf)). El perfil de diseño realista es un Android de 2–4 GB, compartido, con 3G o sin red y carga eléctrica intermitente. Las licencias de software educativo sin usar rondan el 67 % en EE. UU. ([UNESCO GEM 2023](https://www.unesco.at/fileadmin/Redaktion/Bildung/2023GE-Report_TechEd_Summary.pdf)), lo que recuerda que desplegar no es lo mismo que usar.

### La tecnología sola rinde poco; con un humano rinde mucho más

Es el patrón más constante de toda la evidencia. En Pakistán, vídeos integrados en la clase del docente subieron **+0,3 DE**, mientras que el mismo contenido en tabletas que puenteaban al docente las bajó **−0,4 DE** ([Beg et al., AEJ: Policy 2022](https://ideas.repec.org/a/aea/aejpol/v14y2022i2p61-90.html)). Los SMS solos no movieron el aprendizaje en Botswana, y SMS más llamada de 15–20 min dio **0,33 DE de media en seis países por ~12 $ por alumno** ([J-PAL](https://www.povertyactionlab.org/node/8131252)). En Can't Wait to Learn (Chad), **el 65 % del coste por niño es gestión del programa**, el 20 % tabletas y el 7 % facilitadores ([GPE KIX](https://www.gpekix.org/sites/default/files/2025-09/Can%27t%20Wait%20to%20Learn%20Value%20for%20Money%20Chad%20brief.pdf)). El GEEAP califica de "Bad Buy" invertir solo en hardware y afirma que "los teléfonos móviles no funcionan por sí solos" ([Informe GEEAP 2023](https://resources.peopleinneed.net/documents/1290-geeap-report-smart-buys-2023-final_compressed--1-.pdf)). En la práctica, cada demo debería enseñar el panel, la cola o la alerta donde actúa la persona.

### El uso cae tras la novedad y la dosis efectiva casi nunca se alcanza

El RCT de Aila (Oak) midió **49 min/semana de ahorro**, pero la herramienta se usó solo en ~7 % de las clases y el uso cayó durante el ensayo ([EdTech Innovation Hub](https://www.edtechinnovationhub.com/news/oaks-aila-saves-primary-teachers-49-minutes-a-week-on-lesson-planning-eef-trial-finds)). En Khan Academy **solo ~9 % alcanzó la dosis de 30 min/semana** ([Khan Academy Blog](https://blog.khanacademy.org/?p=18194)). Cuando Khanmigo se negaba a dar la respuesta, la mayoría de los alumnos dejó de usarlo ([Chalkbeat](https://www.chalkbeat.org/2026/08/25/ai-tutoring-students-khanmigo-khan-academy-engagement-study/)). La actividad en sistemas gamificados sube al introducirlos y cae a las pocas semanas ([Tsay et al., Bedfordshire](https://researchportal.beds.ac.uk/en/publications/overcoming-the-novelty-effect-in-online-gamified-learning-systems-5/)). Un hackathon no puede demostrar uso sostenido. Lo que sí puede hacer es medir la dosis y avisar cuando cae.

### Los datos de menores fijan qué diseños son defendibles

En la UE, la IA que **evalúa resultados de aprendizaje, orienta el proceso de aprendizaje, decide el nivel educativo o vigila exámenes es de alto riesgo** (Anexo III, punto 3) ([artificialintelligenceact.eu](https://artificialintelligenceact.eu/annex/3/); [considerando 56](https://artificialintelligenceact.eu/recital/56/)). Inferir emociones a partir de datos biométricos en centros educativos está **prohibido desde el 2 feb 2025** (art. 5(1)(f)). El autoinforme textual no entra en esa prohibición, aunque hay zonas grises ([FPF](https://fpf.org/blog/red-lines-under-eu-ai-act-unpacking-the-prohibition-of-emotion-recognition-in-the-workplace-and-education-institutions/)). El Digital Omnibus aplaza las obligaciones del Anexo III al **2 dic 2027** ([Gibson Dunn](https://www.gibsondunn.com/eu-ai-act-omnibus-agreement-postponed-high-risk-deadlines-and-other-key-changes/)). En España el consentimiento digital propio empieza a los **14 años** (art. 7 LOPDGDD) ([EduVerse EdLaw](https://edlaw.eduverse.com/docs/jurisdiction/nat/es/lopdgdd)), y la AEPD multó con 200.000 € a una universidad por biometría en exámenes online con la EIPD hecha a destiempo ([Legiscope](https://www.legiscope.com/blog/aepd-sanciones-educacion.html)). Fuera de Europa el vacío es mayor: **solo el 16 % de los países garantiza por ley la privacidad de datos en educación**, y el 89 % de 163 productos recomendados en pandemia podía vigilar a los niños fuera del horario escolar ([UNESCO GEM 2023](https://www.unesco.at/fileadmin/Redaktion/Bildung/2023GE-Report_TechEd_Summary.pdf)). El diseño que puntúa en "uso ético" se repite en todos los retos: agregación por grupo, seudónimos, procesamiento local, nada de biometría, ninguna decisión automática sobre alumnos y un botón real para discrepar.

### La calidad de la IA cae en lenguas con pocos recursos y en modelos pequeños

**El 40 % de la población mundial no recibe educación en una lengua que entienda** ([UNESCO GEM vía DTNext](https://www.dtnext.in/news/national/40-global-population-doesnt-have-access-to-education-in-language-they-understand-unesco-824858)). Shiksha Copilot producía planes aptos en inglés en el 96 % de los bloques, pero en kannada los curadores tuvieron que corregir el **94,4 %** ([FingerLakes1/Cornell](https://www.fingerlakes1.com/2026/10/09/cornell-study-finds-ai-lesson-planner-saved-teachers-time-but-kannada-translations-needed-extensive-editing/)). En AmericasNLP 2024 el mejor chrF++ fue **38 para quechua y guaraní y 23 para náhuatl** ([ACL Anthology](https://aclanthology.org/2024.americasnlp-1.28.pdf)), y GPT-4o rinde 48,1 en lenguas africanas frente a 72,5 en inglés ([IrokoBench](https://arxiv.org/html/2406.03368v1)). En offline, Gemma 3 1B saca **36,4 en FACTS Grounding frente a 70,1 del modelo 4B** ([Gemma 3 Technical Report](https://arxiv.org/html/2503.19786)). Cualquier reto con lengua local o IA local tiene que mostrar un semáforo de confianza y una cola de revisión humana.

### La validación humana es el cuello de botella, no la generación

UNICEF genera con IA el primer borrador de libros accesibles, pero no la lengua de signos, y todo pasa por revisión humana ([UNICEF Innocenti](https://www.unicef.org/innocenti/can-ai-help-bridge-gap-inclusive-education)). El piloto de Aragón con Plena Inclusión concluye que "la tecnología puede generar borradores, pero la comprensibilidad solo se garantiza con validación humana" ([Gobierno de Aragón](https://www.aragon.es/w/inteligencia-artificial-y-lectura-f%C3%A1cil-un-piloto-hacia-una-informaci%C3%B3n-m%C3%A1s-clara-y-accesible-en-arag%C3%B3n)). Los tutores que funcionaron llevaban la **solución verificada dentro del prompt** ([Bastani et al.](https://nmdprojects.net/teaching_resources/bastani_generative_ai_can_harm_learning.pdf); [Kestin et al.](https://pmc.ncbi.nlm.nih.gov/articles/PMC12179260/)). Una función de producto que haga barata y trazable la validación vale más que una generación espectacular.

### El docente no adopta lo que no entiende ni confía

En TALIS 2024, el **66 % de los docentes cree que la IA hace recomendaciones inapropiadas o incorrectas** y el 75 % de quienes no la usan alega falta de conocimientos; solo el 12 % dice que su centro no lo permite ([EI/TALIS 2024](https://www.ei-ie.org/en/item/31815:using-artificial-intelligence-takeaways-from-talis-2024)). En Perú, un año después del lanzamiento de Alerta Escuela **solo el 7 % de las escuelas con alumnos en riesgo había entrado y el 2 % había descargado las guías**, porque los directores no entendían cómo se calculaba el riesgo ([Banco Mundial](https://blogs.worldbank.org/en/education/early-warning-systems-can-help-prevent-dropouts-administrators-need-consider-critical)). Con explicabilidad en una línea, edición y registro del motivo se responde a esa desconfianza. Las cajas negras no la resuelven.

## Bloque A — el docente en el centro (01, 12, 19, 26)

### 01 · El copiloto del docente — Viabilidad: Alta

**Problemas reales.** La carga administrativa es la primera fuente de estrés: 52 % en la OCDE y **64 % en la secundaria española** ([EI/TALIS 2024](https://www.ei-ie.org/en/item/31815:using-artificial-intelligence-takeaways-from-talis-2024); [Funcas](https://www.funcas.es/wp-content/uploads/2025/10/Informe-Talis-de-la-OCDE.-Encuesta-a-los-docentes-espanoles-de-la-UE-y-la-OCDE.pdf)). Las herramientas planifican "desde cero" cuando el docente prefiere adaptar lo que ya tiene, y el uso cae con el tiempo ([EdTech Innovation Hub](https://www.edtechinnovationhub.com/news/oaks-aila-saves-primary-teachers-49-minutes-a-week-on-lesson-planning-eef-trial-finds)). En kannada hubo que corregir el 94,4 % de los bloques ([FingerLakes1/Cornell](https://www.fingerlakes1.com/2026/10/09/cornell-study-finds-ai-lesson-planner-saved-teachers-time-but-kannada-translations-needed-extensive-editing/)). Gemini y MagicSchool dieron planes de conducta más favorables a alumnos blancos que a negros ([The 74](https://www.the74million.org/article/ai-teacher-assistants-are-useful-but-can-pose-risks-in-classroom-report-finds/)), y Common Sense describe estos asistentes como "invisible influencers" que facilitan llevar material al aula sin revisarlo ([Common Sense Media](https://www.commonsensemedia.org/press-releases/ai-teacher-assistants-need-better-safety-measures-common-sense-media-report-finds)).

**Qué existe y por qué falla.** Hay ahorro demostrado: −31 % de tiempo de planificación con ChatGPT y una guía ([EEF](https://educationendowmentfoundation.org.uk/news/teachers-using-chatgpt-alongside-a-guide-to-support-them-to-use-it-effectively-can-cut-lesson-planning-time-by-over-30-per-cent)) y −49 min/semana con Aila. Se estanca porque no encaja en el flujo real, no conoce el currículo local y revisar consume parte del ahorro. Además, Ofsted encontró que los centros miden el impacto con encuestas y no con resultados ([Ofsted](https://www.gov.uk/government/publications/ai-in-schools-and-further-education-findings-from-early-adopters/the-biggest-risk-is-doing-nothing-insights-from-early-adopters-of-artificial-intelligence-in-schools-and-further-education-colleges)).

**Rebanada de ~3 días (idea).** El docente sube una foto o PDF de su ficha o de la página del libro y obtiene tres niveles (apoyo, estándar, ampliación), un quiz de 5 preguntas con clave y una versión en lengua local. Todo es editable y lleva un aviso de "qué revisar" que marca cifras, afirmaciones factuales y términos que no coinciden con el glosario cargado. Las ediciones del docente se registran. La demo puede hacerse con cronómetro.

**Fuera de alcance.** Alineación con el currículo nacional completo, análisis de progreso con datos reales (se acerca al alto riesgo) e integración con plataformas de gestión del aula. No lleva ★.

### 12 ★ · El entrenador invisible del docente — Viabilidad: Alta

**Problemas reales.** El coaching funciona, pero los programas grandes logran "solo una fracción" del efecto de los pequeños ([Brown/Annenberg](https://annenberg.brown.edu/publications/effect-teacher-coaching-instruction-and-achievement-meta-analysis-causal-evidence)). El coaching remoto en Sudáfrica igualó al presencial, pero costó lo mismo (unos 5 USD por alumno) porque el ahorro en salarios se fue en tablets y datos, y la coach no podía observar las clases ([Banco Mundial](https://blogs.worldbank.org/impactevaluations/can-technology-enable-effective-teacher-coaching-scale)). En la América Latina rural el docente trabaja aislado y sin mentoría ([Brookings](https://www.brookings.edu/articles/how-ai-can-support-teachers-in-latin-america/)). Las tablets de control docente de Bridge provocaron críticas sindicales por quitar autonomía ([Devex](https://www.devex.com/news/can-tablets-really-improve-teaching-in-low-income-countries-94883)).

**Qué existe y por qué falla.** TheTeacher.AI (Sierra Leona) superó a la búsqueda web en uso, y una página web consume ~3.107 veces más datos que una respuesta de IA ([arXiv 2502.12397](https://arxiv.org/abs/2502.12397v3)). Tutor CoPilot, una IA que asiste al tutor humano, dio +4 pp de dominio (+9 pp con los peores tutores) a unos 20 USD por tutor y año ([Stanford NSSA](https://nssa.stanford.edu/studies/tutor-copilot-human-ai-approach-scaling-real-time-expertise)). **No hay ningún RCT de un mentor LLM con resultados medidos en el aula.** El marco UNESCO de competencias docentes en IA (5 dimensiones, 15 competencias, 3 niveles) sirve de columna vertebral ([Ludomag](https://ludomag.com/en/2024/12/04/unesco-releases-the-artificial-intelligence-competency-framework-for-teachers/)).

**Rebanada de ~3 días (idea).** Un bot de Telegram o WhatsApp que, tras un módulo de formación, hace un diagnóstico de 5 preguntas mapeado al marco UNESCO y propone cada semana un microreto ajustado al nivel del docente. Acepta notas de voz, responde con preguntas de reflexión y deriva al coach humano ante temas sensibles. El coach recibe un resumen semanal de quién se ha atascado, que es el argumento de "una coach hace el trabajo de tres". Se posiciona como confidencial y bajo control del docente. Encaja con ProFuturo, que declara 262.980 docentes formados (dato propio sin verificación independiente) ([El Independiente](https://www.elindependiente.com/economia/empresas/2025/07/17/profuturo-nueve-anos-mayor-proyecto-educativo-espanol-africa-latinoamerica/)).

**Fuera de alcance.** Demostrar un cambio de práctica o de aprendizaje, ajustar el modelo con datos reales de coaching y dar calidad en lenguas como wólof o lingala. Ojo con el coste: WhatsApp cobra los mensajes de servicio desde el 1 oct 2026, con 1.000 gratuitos al mes ([CM.com](https://www.cm.com/blog/whatsapp-business-platform-pricing/)). Telegram es más barato para la demo.

### 19 · De la formación docente al cambio real — Viabilidad: Alta

**Problemas reales.** En 139 programas a escala de 14 países hay menos práctica, menos incentivos y menos seguimiento que en los programas evaluados que funcionan ([Banco Mundial OKR](https://openknowledge.worldbank.org/entities/publication/cde278e7-3802-4556-bd25-714dd39ae5bd/full)). En la propia ProFuturo, **el 87,2 % de los docentes dice haber cambiado su práctica, pero solo el 17,2 % de los coaches ve "muchos" cambios** ([ProFuturo encuestas 2022](https://profuturo.education/wp-content/uploads/2024/07/ProFuturo_encuestas_2022_ES.pdf)). Menos de 1 de cada 5 usuarios de Aila cambió su forma de enseñar ([EdTech Innovation Hub](https://www.edtechinnovationhub.com/news/oaks-aila-saves-primary-teachers-49-minutes-a-week-on-lesson-planning-eef-trial-finds)).

**Qué existe y por qué falla.** La observación Stallings en Ceará subió un 10 % el tiempo de instrucción a 2,40 USD por alumno ([Banco Mundial SIEF](https://www.worldbank.org/en/programs/sief-trust-fund/brief/ceara-teacher-feedback-program)). Tusome usa Tangerine en tablets de coaches, pero sufrió con docentes que necesitaban formación solo para iniciar sesión y con equipos rotos ([Devex](https://www.devex.com/news/can-tablets-really-improve-teaching-in-low-income-countries-94883)). La medición sigue siendo autodeclarada.

**Rebanada de ~3 días (idea).** El módulo formativo se convierte en 3 actividades para la semana siguiente. El docente sube una evidencia (foto con caras difuminadas, trabajo de alumno anonimizado o nota de voz de 60 s), la IA la puntúa con una rúbrica visible de "sustitución" a "rediseño" y el coach la valida en un clic. Un embudo muestra el recorrido formados → retos → evidencias → validadas, junto a un "índice de brecha declarado/observado". **Encaja mejor como módulo dentro del 12 ★** que como entrega propia, porque el 19 no lleva ★.

**Fuera de alcance.** Validar la rúbrica como medida, hacer seguimiento durante meses e integrarse con los sistemas de formación de los ministerios.

### 26 · Cada uno con su ritmo — Viabilidad: Media

**Problemas reales.** Es el reto técnicamente más arriesgado del bloque. Whisper ajustado tiene un **WER del 54 % en habla de aula** ([IEEE ICASSP 2024](https://ieeexplore.ieee.org/abstract/document/10447428)). **114 sistemas educativos (~58 % de los países) prohíben los móviles** ([Business Today/PTI](https://www.businesstoday.in/world/story/not-just-distraction-114-countries-now-restrict-phones-in-schools-unesco-report-521749-2026-03-22)), y Madrid prohíbe los dispositivos individuales en infantil y primaria ([Maldita](https://maldita.es/investigaciones/20250922/prohibicion-moviles-aulas-debate/)). Los subtítulos redundantes pueden aumentar la carga cognitiva ([Learning and the Brain](https://www.learningandthebrain.com/blog/video-captions-benefit-everyone-an-investigation/)). Con un tutor GPT-4 en Turquía apareció el "crutch effect" al retirarlo ([Brookings](https://www.brookings.edu/articles/how-ai-can-support-teachers-in-latin-america/)).

**Qué existe y por qué falla.** Hay subtítulos en directo y modos a ritmo del alumno (Nearpod, Pear Deck), sin evaluación independiente ni evidencia de que un "acompañante en tiempo real" mejore el aprendizaje en primaria o secundaria.

**Rebanada de ~3 días (idea).** Usar las diapositivas o el guion preparados antes de clase en lugar de la voz en directo. Para cada diapositiva se genera una "explicación en capas" (idea clave, ejemplo, glosario, lectura fácil, traducción) que el docente revisa una vez. Los alumnos bajan de capa en un dispositivo compartido o en la pizarra, y un botón anónimo "me he perdido" alimenta un termómetro agregado para el docente.

**Fuera de alcance.** Transcripción fiable en un aula ruidosa, funcionar donde no hay dispositivos y demostrar mejora del aprendizaje. Leído al pie de la letra ("en tiempo real"), la viabilidad baja.

## Bloque B — conectividad baja y pocos recursos (02, 09, 15, 17, 24, 29)

### 02 ★ · Aprender sin conexión — Viabilidad: Media

**Problemas reales.** Los fallos de sincronización son reales: en Kolibri, la sincronización Pi→servidor dejó de funcionar tras semanas de uso ([Foro LE](https://community.learningequality.org/t/problems-synchronizing/2791?page=2)). Hay coste recurrente de datos incluso en despliegues "offline", como en Jordania ([Blog Learning Equality](https://blog.learningequality.org/observations-kolibri-fly-22c3be9464f4)). En Colombia, ProFuturo se encontró con descargas difíciles, falta de soporte técnico y financiación incierta para reparaciones ([ProFuturo](https://profuturo.education/en/?p=85535)). Los usuarios del Learning Passport piden comunicación bidireccional ([UNICEF LP 2024](https://www.unicef.org/learningpassport/media/1406/file/Learning%20Passport%202024%20Six%20Month%20Report.pdf.pdf)).

**Qué existe y por qué falla.** Kolibri llega a más de 10 millones de personas ([EdSurge](https://edsurge.com/news/2024-01-12-how-offline-first-edtech-addresses-education-disparities-worldwide)) y una Pi 4 aguanta unos 25 usuarios simultáneos, con el vídeo y la Wi-Fi como cuellos de botella ([Foro LE](https://community.learningequality.org/t/using-kolibri-rpi-4-across-multiple-classrooms/2455)). También existen el Learning Passport HUB y Ustad Mobile ([Ustad](https://www.ustadmobile.com)). La distribución de contenido está resuelta. Lo que falla es la sincronización de progreso, la comunicación con el docente y el mantenimiento. Construir "otro LMS offline" no aporta nada.

**Rebanada de ~3 días (idea).** Una PWA (Service Worker + IndexedDB) que funcione en modo avión, con eventos de solo-añadir (UUID + marca de tiempo) que se suben al reconectar, varios perfiles en un mismo dispositivo con PIN, un buzón del docente en cola y paquetes de contenido por USB (zip + manifiesto). Ideas añadidas: un indicador de "frescura de datos" por alumno, exportación compatible con Kolibri, sincronización "por mula" a través del móvil del docente e IA local del reto 29 en el portátil del docente.

**Fuera de alcance.** Robustez de la sincronización durante semanas, gestión de dispositivos (MDM), curación curricular, integración con el EMIS y formación de docentes.

### 09 · La escuela en el bolsillo — Viabilidad: Alta

**Problemas reales.** En Botswana el **SMS solo no tuvo efecto**; SMS más llamada sí ([J-PAL](https://www.povertyactionlab.org/print/pdf/node/1773390?lang=en)). La barrera principal es no tener acceso al teléfono ([Lancaster/M-Shule](https://eprints.lancs.ac.uk/209045/1/AERJ_author_accepted_manuscript.pdf)). En Eneza solo se completó el 35 % de las lecciones de matemáticas y la alianza con Orange avanzó despacio ([GSMA](https://www.gsma.com/mobilefordevelopment/wp-content/uploads/2021/02/GSMA_Eneza-Snapshot_4pg_FA_ACCESSIBLE.pdf)). La brecha de género en internet móvil es del 29 % en África subsahariana ([GSMA vía Tech-ish](https://tech-ish.com/2025/09/12/the-digital-divides-new-frontline-3-1-billion-people-have-internet-access-they-cant-use)). WhatsApp exige 13 años en la UE ([Gigazine](https://gigazine.net/gsc_news/en/20240415-whatsapp-eu-uk-minimum-age)) y cobra por mensaje.

**Qué existe y por qué falla.** Rori, el tutor por WhatsApp, logró d = 0,36, pero **con teléfono del programa y docentes presentes** ([arXiv 2402.09809](https://arxiv.org/pdf/2402.09809)). La versión que funciona incluye contacto humano: 0,33 DE en seis países ([J-PAL](https://www.povertyactionlab.org/node/8131252)).

**Rebanada de ~3 días (idea).** Un motor de diálogo propio con tres canales (Telegram, WhatsApp de prueba y un simulador de SMS/USSD), una pregunta de diagnóstico inicial, microlecciones de 3–5 mensajes, notas de voz Opus y un medidor de datos por sesión. Lo diferencial es una **cola para el tutor humano** con un guion de llamada de 15 min generado a partir de los errores del alumno. Se añaden un "modo cuidador" (el bot habla con la persona adulta dueña del teléfono) y un presupuesto de mensajes por alumno.

**Fuera de alcance.** Pasarelas reales con operadores, zero-rating, número verificado por Meta y red de tutores.

### 15 ★ · Educación sin fronteras en emergencias — Viabilidad: Media

**Problemas reales.** Solo el **39 % de los niños refugiados estaba matriculado en sistemas nacionales en 2025** (51 % en 2023), y UNHCR pudo gastar 141 M$ de un presupuesto de educación de 455 M$ ([UNHCR Global Report 2025](https://www.unhcr.org/sites/default/files/2026-06/global-report-2025-outcome-area-education_0.pdf)). Las Normas Mínimas INEE 2024 incorporan responsabilidad sobre los datos y vínculo con la protección infantil ([INEE](https://inee.org/sites/default/files/resources/INEE%20Minimum%20Standards%2C%202024%20Edition%20Q%26A%20ENG.pdf)). Los docentes no estaban preparados para alumnado afectado por la guerra (Polonia) ([UNICEF LP 2024](https://www.unicef.org/learningpassport/media/1406/file/Learning%20Passport%202024%20Six%20Month%20Report.pdf.pdf)).

**Qué existe y por qué falla.** Can't Wait to Learn logró **0,48 DE en Chad a 132 € por niño y año**, el 65 % en gestión ([GPE KIX](https://www.gpekix.org/sites/default/files/2025-09/Can%27t%20Wait%20to%20Learn%20Value%20for%20Money%20Chad%20brief.pdf)). La Digital School in the Box de UNICEF aspira a desplegarse en menos de 72 h ([UNICEF LP 2024](https://www.unicef.org/learningpassport/media/1406/file/Learning%20Passport%202024%20Six%20Month%20Report.pdf.pdf)). El modelo existe. Lo que falta es financiación, seguimiento de alumnos que se desplazan sin exponerlos y cumplimiento de protección.

**Rebanada de ~3 días (idea).** Una "escuela en una caja": un portátil o una Pi haciendo de hotspot con portal local. Se añade un "pasaporte de aprendizaje" en QR firmado que el alumno lleva consigo, sin base central (idea sin evidencia de campo), con seudónimos, cifrado local, exportación solo agregada y borrado rápido. Un medidor energético puede partir de los ~8 W de una Pi 5 ([Ganglani](https://www.kunalganglani.com/blog/gemma-3-raspberry-pi-5-benchmark.md)). Todos los principios de protección deben validarlos especialistas.

**Fuera de alcance.** Logística, hardware resistente, validación de protección infantil, mapeo entre los currículos de origen y de acogida y acuerdos con UNHCR o UNICEF.

### 17 ★ · Un laboratorio donde no hay laboratorio — Viabilidad: Alta

**Problemas reales.** En Ruanda, PhET dio d = 2,04, una cifra a tomar con cautela, pero **el docente tuvo que intervenir el 75 % del tiempo** y solo se eligieron escuelas que ya tenían aula de informática e internet ([Chem. Educ. Res. Pract. 2025](https://pubs.rsc.org/en/content/articlehtml/2025/rp/d4rp00105b)). PhET tiene que rediseñar analogías que no funcionan en otras culturas ([PhET Yidan Report](https://phet.colorado.edu/files/Yidan.Annual.Report.Jan-Dec.2021.pdf)). Los modelos multimodales en móvil tardan más de 60 s en dar el primer token ([MobileAIBench](https://arxiv.org/pdf/2406.10290)).

**Qué existe y por qué falla.** PhET funciona offline desde 2021, y phyphox usa los sensores del móvil y levanta un servidor web local sin coste añadido ([arXiv 1804.06239](https://arxiv.org/pdf/1804.06239)). Lo que falta es el andamiaje del método científico para un docente con poca formación digital.

**Rebanada de ~3 días (idea).** Una PWA offline con 2–3 simulaciones en Canvas (péndulo, caída libre), lectura de DeviceMotion o Web Audio (o importación de CSV de phyphox) y comparación entre la medida real y la simulada. Una guía recorre hipótesis → predicción → medición → conclusión. La IA está acotada: compara la hipótesis escrita con los datos, pregunta y detecta errores de unidades. Se añade un modo "un móvil por grupo".

**Fuera de alcance.** AR robusta en gama baja, kits de sensores, validación curricular y traducción de calidad.

### 24 · IA para los más pequeños — Viabilidad: Media

**Problemas reales.** La OMS recomienda **una hora o menos de pantalla sedentaria entre los 2 y los 4 años** ([EdWeek](https://www.edweek.org/teaching-learning/world-health-organization-recommends-no-more-than-one-hour-of-screen-time-for-most-children-under-5/2019/04)). El canal eficaz es el cuidador: SMS a padres con actividades para casa dieron +0,11–0,12 DE en Costa Rica ([J. Dev. Econ. 2024](https://ideas.repec.org/a/eee/deveco/v166y2024ics0304387823001578.html)). Los modelos pequeños alucinan (SimpleQA 2,2 en Gemma 3 1B) ([Gemma 3 TR](https://arxiv.org/html/2503.19786)), y una actividad para niños pequeños puede ser físicamente peligrosa.

**Qué existe y por qué falla.** No se encontraron apps evaluadas que conviertan tareas escolares en instrucciones visuales para niños de 3 a 7 años en hogares pobres.

**Rebanada de ~3 días (idea).** Foto o texto de la tarea → 3–5 pasos con pictogramas, audio por paso y actividad con objetos de casa. El modelo **solo selecciona y rellena plantillas de una biblioteca curada (~50)**, pasa por un filtro de materiales peligrosos y requiere revisión docente antes de enviarse al cuidador. Un "modo sin pantalla" reproduce el audio y bloquea el móvil. Ojo: ARASAAC es CC BY-NC-SA, lo que choca con la transferibilidad comercial.

**Fuera de alcance.** Validación pedagógica en primera infancia, TTS de calidad en lenguas locales y pruebas con familias.

### 29 · IA sin conexión — Viabilidad: Media

**Problemas reales.** En una Pi 5, un modelo de 1B genera unos 10 tokens/s y uno de 4B QAT unos 5; un resumen de 500 palabras tarda 90–120 s y hay throttling sin refrigeración ([Ganglani](https://www.kunalganglani.com/blog/gemma-3-raspberry-pi-5-benchmark.md)). Un móvil de 4 GB solo admite modelos de 0,5B–1B ([InsiderLLM](https://insiderllm.com/guides/run-llms-old-phones-mobile-inference/)). El modelo 1B se ancla mal al contexto (FACTS 36,4) ([Gemma 3 TR](https://arxiv.org/html/2503.19786)), y el mejor modelo abierto da un 63 % del rendimiento de GPT-4o en lenguas africanas ([Microsoft Research/IrokoBench](https://www.microsoft.com/en-us/research/publication/irokobench-a-new-benchmark-for-african-languages-in-the-age-of-large-language-models/?lang=ja)). En voz, whisper.cpp fue unas 50 veces más lento que sherpa-onnx en el mismo móvil ([VoicePing](https://voiceping-landingpage-prod.pages.dev/en/blog/research-offline-speech-transcription-benchmark/)).

**Qué existe y por qué falla.** Las herramientas (llama.cpp, Ollama) están maduras. No hay evaluación pedagógica de IA offline para pensamiento crítico.

**Rebanada de ~3 días (idea).** Ollama con un modelo de 4B QAT en el portátil o la Pi del docente y RAG sobre un libro o un extracto de Kiwix, mostrando siempre el fragmento citado. Modos socráticos ("¿qué evidencia falta?", "encuentra el error"), un semáforo de confianza ("no lo sé con las fuentes que tengo"), una cola de preguntas desde la red local y el modo avión visible con tokens/s en pantalla. **Se presenta mejor como motor dentro del 02 ★**, porque el 29 no lleva ★.

**Fuera de alcance.** Calidad pedagógica, ajuste fino a lenguas locales y rendimiento en móviles de 2 GB.

## Bloque C — inclusión, accesibilidad e idioma (03, 06, 10, 22, 25)

### 03 ★ · Un contenido, muchas formas de aprender — Viabilidad: Alta

**Problemas reales.** Producir un libro de texto digital accesible lleva meses, y hay unos 240 millones de niños con discapacidad. En su piloto, UNICEF vio resultados inconsistentes ante cambios mínimos del prompt, una IA que alteraba el flujo de la lección y resistencia de parte del profesorado ([UNICEF Innocenti](https://www.unicef.org/innocenti/can-ai-help-bridge-gap-inclusive-education)). **Ningún texto es Lectura Fácil sin validadores**: la guía de DINCAT recomienda 3–5, en sesiones de 2–3 h ([DINCAT](https://dincat.cat/wp-content/uploads/2023/03/Com-validar-un-text-adaptat-a-lectura-facil-_LF_definitiva-1.pdf)). Las métricas automáticas no reflejan la comprensión ([arXiv 2603.18879](https://arxiv.org/html/2603.18879v1)). Gemini falló con un diagrama de estados (2/5 y 1/5) y Seeing AI no identificó el contenido STEM ([WEBIST 2024](https://scitepress.org/publishedPapers/2024/129968/pdf/index.html)).

**Qué existe y por qué falla.** El pipeline de UNICEF con ANEP y Ceibal pasó de meses a días o semanas, con 4 rondas de revisión experta y un piloto en 30 escuelas ([UNICEF Innocenti](https://www.unicef.org/innocenti/can-ai-help-bridge-gap-inclusive-education)). El piloto de Aragón con GPT-4o no aporta cifras de ahorro ([Gobierno de Aragón](https://www.aragon.es/w/inteligencia-artificial-y-lectura-f%C3%A1cil-un-piloto-hacia-una-informaci%C3%B3n-m%C3%A1s-clara-y-accesible-en-arag%C3%B3n)). El cuello de botella es la validación.

**Rebanada de ~3 días (idea).** PDF o diapositivas → estructura → lectura fácil con checklist UNE (frases cortas, un término por concepto, glosario lateral), audio TTS, texto alternativo marcado "requiere revisión" con prioridad para diagramas y fórmulas, y exportación a HTML/EPUB accesible. Incluye una vista de revisión lado a lado y estados trazables (borrador IA → revisado por docente → validado por grupo). Como diferencial creativo, un "modo sesión de validación" que proyecta frase a frase y recoge votos de "no entiendo" de 3–5 validadores. El argumento de mercado es que la EAA cubre los e-books ([Reed Smith](https://www.reedsmith.com/our-insights/blogs/viewpoints/102kxnd/the-eu-accessibility-act-is-now-in-force/)).

**Fuera de alcance.** Afirmar el cumplimiento de la UNE 153101, texto alternativo STEM fiable y vídeo en lengua de signos (ni UNICEF lo genera con IA).

### 06 ★ · La escuela habla tu idioma — Viabilidad: Media

**Problemas reales.** Más de 250 millones de estudiantes no reciben educación en una lengua que entienden, por falta de materiales y de capacidad docente en lenguas maternas ([DTNext/UNESCO](https://www.dtnext.in/news/national/40-global-population-doesnt-have-access-to-education-in-language-they-understand-unesco-824858)). En AmericasNLP 2024, el náhuatl (22,87) y el aimara (30,97) quedaron por debajo del baseline, y en bribri ninguna salida obtuvo la nota máxima ([ACL Anthology](https://aclanthology.org/2024.americasnlp-1.28.pdf)). NLLB-200 es "primarily intended for research", no está pensado para producción y su licencia es **CC-BY-NC** ([Hugging Face](https://huggingface.co/facebook/nllb-200-distilled-600M/blob/main/README.md)). Google reconoce que muchas lenguas no tienen una variedad estándar ([Google Blog](https://blog.google/intl/en-in/google-translate-new-languages-2024/)).

**Qué existe y por qué falla.** Hay traducción automática para más de 110 lenguas nuevas, pero sin calidad de aula. AmericasNLP concluye que hacen falta más datos, no más modelo.

**Rebanada de ~3 días (idea).** Adaptación dentro de la misma lengua (vocabulario, complejidad, ejemplos culturales) en español o portugués, más un borrador de traducción con **semáforo de confianza por lengua** basado en benchmarks públicos. Un **glosario vivo comunitario** fija los términos curriculares y se inyecta como restricción, y una cola de revisión para hablantes convierte cada corrección en datos con licencia elegida por la comunidad.

**Fuera de alcance.** Traducción fiable a náhuatl o aimara, ajuste fino sin acuerdos de soberanía de datos, validación comunitaria y NLLB en un producto comercial.

### 10 ★ · Tecnología que encuentre a quien estamos dejando atrás — Viabilidad: Alta

**Problemas reales.** Una revisión de 20 planes sectoriales africanos encontró en todos "ineffective collection, presentation, analysis and use of data", con componentes EMIS de 1 a 7 M USD por proyecto ([GPE 2019](https://globalpartnership.org/blog/what-can-we-learn-emis-diagnostics)). **28 países siguen sin datos comparables de discapacidad**; el estándar es la pregunta funcional del Washington Group o el Child Functioning Module, no el diagnóstico ([GPE 2022](https://globalpartnership.org/blog/we-need-more-data-children-disabilities-ensure-no-one-left-behind)). Al desagregar por varias dimensiones salen celdas pequeñas que identifican a alumnos concretos ([OSSE](https://osse.dc.gov/sites/default/files/dc/sites/osse/publication/attachments/OSSE%20Student%20Privacy%20and%20Data%20Suppression%20Policy%20%281%29.pdf)). Para una mujer, un terminal cuesta el 24 % de su ingreso mensual, frente al 12 % para un hombre ([GSMA 2025](https://www.gsma.com/newsroom/press-release/progress-closing-the-mobile-internet-gender-gap-stalls-in-lmics-gsma-mobile-gender-gap-report-2025)).

**Qué existe y por qué falla.** Giga ha mapeado más de 2,2 millones de escuelas, con datos "incompletos o fragmentados"; en Colombia encontró 7.000 escuelas no registradas ([Giga 2025](https://giga.global/giga-2025-report-map/)). El fallo está en el uso del dato, no en su ausencia.

**Rebanada de ~3 días (idea).** Una encuesta mínima (WG/CFM, conectividad, dispositivo, lengua, género, ubicación), un generador sintético, agregación con n mínimo y supresión complementaria, y **un interruptor que muestre cómo se suprime una celda "niñas sordas hablantes de guaraní en la escuela X"**. Encima, un mapa coroplético, un índice interseccional y un explicador en lenguaje claro ("3 de cada 10 niñas no tienen dispositivo en casa"). Si es accesible, se añade la capa de Giga. Al no decidir sobre individuos queda fuera del Anexo III ([Mishcon de Reya](https://www.mishcon.com/eu-uk-ai-navigator/annex/no-3)). Puede fusionarse con el 13 ★.

**Fuera de alcance.** EMIS real, datos reales de discapacidad y validez estadística.

### 22 · El sonido no es una barrera — Viabilidad: Media

**Problemas reales.** El WER del 54 % en aula condena las intervenciones de los compañeros ([IEEE](https://ieeexplore.ieee.org/abstract/document/10447428)). La traducción de signos sigue en el laboratorio: BLEU de 22,01 sobre partes meteorológicos de TV ([arXiv 2510.19398](https://arxiv.org/pdf/2510.19398)). **WFD y WASLI rechazan los avatares como sustitutos** ([WFD](https://wfdeaf.org/?p=7496)), efsli pide interpretación humana garantizada en educación ([efsli](https://efsli.org/efslis-stance-on-ai-and-sign-language-interpreting-our-vision-for-the-future/)) y **Signapse prohíbe en sus términos el uso en vivo en escuelas** ([Jisc NCAI](https://nationalcentreforai.jiscinvolve.org/wp/2025/09/16/ai-sign-language-translation-ready-for-education/)). Al 91 % de los usuarios sordos encuestados les preocupa la privacidad ([ASSETS '23](https://microsoft.com/en-us/research/uploads/prod/2023/10/Automatic_Sign_Language_Translation_Perspectives.pdf)). En España había un intérprete educativo por cada 143 personas sordas (dato de 2019) ([SID-INICO/EFE](https://sid-inico.usal.es/noticias/es-muy-frustrante-para-los-ninos-sordos-ir-al-colegio-sin-un-interprete-se-sienten-como-un-mueble-no-se-enteran-de-nada/)).

**Rebanada de ~3 días (idea).** Subtítulos desde el micrófono del docente, con glosario de la unidad y palabras de baja confianza subrayadas. Un **canal de retorno del alumno** ("más despacio", "repite"), avisos visuales de eventos sonoros y un resumen con glosario para el intérprete. Si se incluye lengua de signos, solo con vídeos grabados por personas sordas.

**Fuera de alcance.** Traducción automática de signos en cualquier dirección, sustituir al intérprete y subtítulos fiables del habla infantil.

### 25 · Tecnología comprensible, ahora y siempre — Viabilidad: Media

**Problemas reales.** 2.200 millones de personas siguen offline, y el uso de internet es del 94 % en países de renta alta frente al 23 % en los de renta baja ([CSI Magazine/ITU](https://csimagazine.com/csi/itu-internet-report-2025.php)). Para las mujeres que conocen internet móvil, la alfabetización digital es la principal barrera ([GSMA 2025](https://www.gsma.com/newsroom/press-release/progress-closing-the-mobile-internet-gender-gap-stalls-in-lmics-gsma-mobile-gender-gap-report-2025)). En España, la mayor brecha es la de edad, de 58 puntos (dato de 2021) ([ESMARTCITY/ONTSI](https://www.esmartcity.es/2023/03/09/64-por-ciento-ciudadania-espanola-dispone-competencias-digitales-al-menos-basicas-diez-puntos-por-encima-media-europea)). La ficha de NLLB advierte de que una mejor traducción puede hacer más vulnerables a estafas a personas con poca alfabetización digital ([Hugging Face](https://huggingface.co/facebook/nllb-200-distilled-600M/blob/main/README.md)).

**Rebanada de ~3 días (idea).** Acotar a un grupo (mujeres rurales, mayores, familias migrantes) y a tareas reales: un **sandbox** guiado por voz para detectar SMS de estafa o pedir cita online, un "explica esta pantalla" a partir de una foto y un kit para el formador comunitario. Reutiliza el motor del 03.

**Fuera de alcance.** Medir mejoras de competencia y soporte de calidad en lenguas con pocos recursos. El enunciado es tan amplio que el jurado puede verlo difuso.

## Bloque D — tutoría, alfabetización en IA y evaluación (04, 07, 16, 23, 27)

Ninguno de estos cinco retos lleva ★. Compiten solo en la modalidad general.

### 04 · Un tutor que no te da la respuesta — Viabilidad: Alta

**Problemas reales.** Sin guardarraíles, GPT-4 empeoró el examen sin IA un **−17 %**. Además, GPT-4 acertó solo el **51 %** de 57 problemas, el 31 % de los primeros mensajes fue "¿cuál es la respuesta?" y los alumnos sobreestimaron lo aprendido ([Bastani et al.](https://nmdprojects.net/teaching_resources/bastani_generative_ai_can_harm_learning.pdf)). Con Khanmigo, la mayoría abandonó cuando el tutor se negaba a dar la respuesta ([KQED](https://www.kqed.org/mindshift/66662/students-didnt-get-answers-from-khanmigo-they-didnt-want-its-questions-either)). El Study mode de ChatGPT se puede desactivar dentro de la conversación y OpenAI admite comportamiento inconsistente ([OpenAI](https://openai.com/index/chatgpt-study-mode/)).

**Qué existe y por qué falla.** Harvard obtuvo 0,63 de efecto, pero con soluciones preescritas y meses de construcción ([Kestin et al.](https://pmc.ncbi.nlm.nih.gov/articles/PMC12179260/)). Nigeria logró 0,31 DE con apoyo docente ([WB WP 11125](https://econpapers.repec.org/RePEc:wbk:wbrwps:11125)). El problema de fondo es el engagement, no el modelo.

**Rebanada de ~3 días (idea).** Un banco de 5–10 ejercicios con solución y 3 errores típicos aportados por el docente, una escalera de pistas 0–3 y un verificador que bloquea la respuesta final. Para no perder al alumno, tras N intentos ofrece un ejemplo resuelto análogo. Se completa con un panel del docente con errores por concepto y **un intento de jailbreak fallido en directo** en los primeros 30 s del pitch. Una variante con menos riesgo con menores, al estilo Tutor CoPilot, es que la IA aconseje al tutor humano.

**Fuera de alcance.** Engagement sostenido, precisión fuera del banco y evidencia de aprendizaje. Si el tutor decide recorridos, se acerca al Anexo III.

### 07 · Una IA que también explique sus límites — Viabilidad: Alta

**Problemas reales.** Los marcos ya existen: UNESCO 2024 con 12 competencias ([GCED Clearinghouse](https://gcedclearinghouse.org/en/node/146445)) y el borrador OCDE/CE con 22 competencias, base de PISA 2029 ([babl.ai](https://babl.ai/oecd-and-european-commission-unveil-draft-ai-literacy-framework-for-schools/)). Lo que falta son actividades listas para usar. El 46 % de los adolescentes que usan IA en tareas lo hace sin permiso, y solo el 37 % de sus padres lo sabe ([Common Sense Media](https://about.commonsensemedia.org/press-room/press-releases/new-report-shows-students-are-embracing-artificial-intelligence-despite-lack-of-parent-awareness-and)). Los distritos de alta pobreza forman menos a sus docentes (39 % frente a 67 %) ([AI for Education](https://www.aiforeducation.io/blog/rand-research-reveals-growing-ai-training-gap)). No hay RCT de programas de alfabetización en IA para menores.

**Rebanada de ~3 días (idea).** 3–4 minijuegos con banco precocinado: caza la alucinación con errores sembrados, ver el sesgo, detector local de datos personales en el prompt y "¿real o sintético?" (Miller et al. encontraron que los peores detectores son los más seguros de sí mismos; [PsyPost](https://www.psypost.org/people-worse-at-detecting-ai-faces-are-more-confident-in-their-ability-to-spot-them-study-finds/)). Se añaden un termómetro de calibración de confianza y una guía docente de 45 min con competencias citadas por código. Con escenarios precocinados, el menor no chatea con un LLM abierto.

**Fuera de alcance.** Demostrar un efecto en la alfabetización.

### 16 · El detector de desinformación educativa — Viabilidad: Alta

**Problemas reales.** **No existen detectores fiables**: 14 herramientas resultaron "neither accurate nor reliable" ([Weber-Wulff et al.](https://arxiv.org/abs/2306.15666v2)). WhatsApp elimina el manifiesto C2PA al reenviar ([SoftwareSeni](https://www.softwareseni.com/how-c2pa-content-credentials-work-and-what-their-limits-are/)). Bad News produce sobre todo escepticismo indiscriminado (discriminación dz = 0,04) ([Seabrooke et al.](https://eprints.soton.ac.uk/510250/1/PBR_Manuscript_V5_-_accepted.pdf)), aunque un estudio de 2026, no evaluado, informa de lo contrario.

**Qué existe y por qué funciona a medias.** Con 6 lecciones de lectura lateral, los alumnos fueron el doble de propensos a detectar webs dudosas, pero se quedaron en el 50 % de los puntos ([Stanford GSE](https://ed.stanford.edu/news/it-doesn-t-take-long-learn-how-spot-misinformation-online-stanford-study-finds)). El prebunking en vídeo mejora un 5–10 % por menos de 4 peniques ([Social Science Space](https://www.socialsciencespace.com/2022/09/prebunking-on-youtube-in-the-fight-against-misinformation/)).

**Rebanada de ~3 días (idea).** Un "lector lateral guiado" sobre ~20 casos curados, **la mitad verdaderos**. El LLM propone búsquedas laterales y no emite veredicto. Se puntúa la discriminación, no las "falsas detectadas", y un módulo C2PA muestra la misma imagen antes y después de pasar por WhatsApp.

**Fuera de alcance.** Verificar en abierto cualquier contenido o dar un veredicto del tipo "FALSO 87 %".

### 23 · IA y aprendizaje entre pares — Viabilidad: Media

**Problemas reales.** En el estudio del MIT, los alumnos con IA escribían turnos de ~5 palabras frente a las ~27 de la IA, 9 de 12 reutilizaron su terminología y una alumna pidió "stop asking me questions". La IA dio "confianza sin curiosidad" ([Morris y Maes](https://arxiv.org/pdf/2601.11777)). El 47 % de las conversaciones académicas con Claude son "directas" ([Anthropic](https://www.anthropic.com/research/anthropic-education-report-how-university-students-use-claude)), y en trabajadores del conocimiento más confianza en la IA se asocia a menos pensamiento crítico (β = −0,69) ([Lee et al.](https://advait.org/files/lee_2025_ai_critical_thinking_survey.pdf)). No hay RCT de IA facilitadora en primaria o secundaria.

**Rebanada de ~3 días (idea).** Un chat de grupo donde la IA solo hace intervenciones de proceso (reformular, señalar contradicciones, repartir turnos), con regla dura de no aportar contenido verificada por un clasificador. Métricas de equilibrio de turnos y preguntas para el docente y un agente "compañero que se equivoca" al que el alumno corrige.

**Fuera de alcance.** Evidencia de efecto. El riesgo técnico es la sincronización en tiempo real entre varios usuarios, y la demo necesita 2–4 personas.

### 27 · ¿Quién aprendió: el estudiante o la IA? — Viabilidad: Alta

**Problemas reales.** Siete detectores dieron un **61,22 % de falsos positivos con ensayos de no nativos** ([Emergent Mind/arXiv 2304.02819](https://www.emergentmind.com/papers/2304.02819)). Vanderbilt, Northwestern y UT Austin desactivaron el detector de Turnitin ([Bloomberg vía Yahoo](https://ca.news.yahoo.com/universities-ditching-ai-detection-software-110514937.html)). Las vivas escalan mal y perjudican a alumnos con ansiedad, barreras lingüísticas o discapacidad ([Warwick](https://warwick.ac.uk/fac/cross_fac/academy/funding/2023-24-int-projects/ai-in-maths/project-outputs/recommendations/implementing-oral-exams)). Evaluar resultados o vigilar exámenes es alto riesgo ([considerando 56](https://artificialintelligenceact.eu/recital/56/)).

**Qué existe.** Un examen conversacional se aplicó a 58 alumnos en 2 días, sin resultados en el abstract ([arXiv 2601.10691](https://arxiv.org/abs/2601.10691)).

**Rebanada de ~3 días (idea).** El alumno sube un ensayo o código. El sistema extrae 3–5 afirmaciones clave y genera preguntas de defensa (explicar, transferir, detectar un error introducido). La respuesta puede ser en audio o texto, en la lengua preferida, y el docente recibe un informe con citas literales y **sin nota automática**. Se completa con un registro ligero del proceso y la renuncia explícita a los detectores.

**Fuera de alcance.** La validez y la ausencia de sesgo de las preguntas generadas por LLM no están estudiadas.

## Bloque E — datos educativos, alerta temprana y bienestar (05, 13, 18, 20)

### 05 · Detectar antes de que sea demasiado tarde — Viabilidad: Alta

**Problemas reales.** **Predecir no es el cuello de botella.** En Wisconsin, el efecto de ser marcado no se distingue de cero y las variables del entorno predicen casi igual que el modelo individual ([Perdomo et al.](https://arxiv.org/abs/2304.06205?context=cs)). El sistema usaba raza e ingresos y los alumnos vivían la etiqueta como estigma ([The Markup](https://themarkup.org/hello-world/2023/09/23/dropout-risk-system-under-scrutiny-after-the-markup-report)). En Perú, el 7 % de acceso y el 2 % de descargas de guías, y los SMS no aumentaron las acciones preventivas ([Banco Mundial](https://blogs.worldbank.org/en/education/early-warning-systems-can-help-prevent-dropouts-administrators-need-consider-critical)). En Mendoza, el 22,8 % del alumnado está en riesgo medio, más de lo que cualquier escuela puede atender ([La Nación](https://lanacion.com.ar/sociedad/con-inteligencia-artificial-registran-un-aumento-de-estudiantes-con-alto-riesgo-de-abandonar-el-nid17082024)). En Suecia, el sistema se vive como "datavigilancia" que añade carga ([journals.aau.dk](https://journals.aau.dk/index.php/nlc/article/view/8081)).

**Qué existe y por qué funciona cuando funciona.** En Guatemala, −1,3 pp de abandono a menos de 3 USD por alumno, pero el efecto venía de la **formación y la guía**, no de la lista. Solo ~2/3 de las escuelas recibió la lista y las multigrado no tuvieron efecto ([Banco Mundial](https://documents1.worldbank.org/curated/en/983591622568486300/pdf/Scalable-Early-Warning-Systems-for-School-Dropout-Prevention-Evidence-from-a-4-000-School-Randomized-Controlled-Trial.pdf)). Chicago OnTrack es un indicador simple, con formación para interpretarlo y equipos docentes por curso ([UChicago](https://toandthrough.uchicago.edu/sites/default/files/uploads/documents/To&Through%20Issue%20Brief%20-%20OnTrack.pdf)).

**Rebanada de ~3 días (idea).** Reglas explicables sobre datos sintéticos con perfiles plantados. Cada alerta llega como "tarjeta con receta": por qué salta, qué hacer, quién lo hace y un botón "visto / actuado / no procede (motivo)". Se limita el número de alertas por docente y semana, se añade una vista de equidad por grupo y una lista semanal exportable a papel o WhatsApp. La demo muestra un falso positivo descartado.

**Fuera de alcance.** Precisión validada e impacto. Aunque no decida, puede considerarse alto riesgo si orienta el aprendizaje.

### 13 ★ · La escuela que aprende de sus datos — Viabilidad: Alta

**Problemas reales.** **Perú tiene más de 130 sistemas informáticos** con baja interoperabilidad y dos o más cifras "oficiales". Los resultados rara vez vuelven a la escuela, y en Honduras y República Dominicana se registra en papel y se digita en cibercafés ([BID 2019](https://publications.iadb.org/publications/spanish/document/Del_papel_a_la_nube_Cómo_guiar_la_transformación_digital_de_los_Sistemas_de_Información_y_Gestión_Educativa_SIGED.pdf)). Los tableros fracasan por mala calidad de datos, poca interoperabilidad y desajuste con lo que necesita el usuario ([BID 2025](https://publications.iadb.org/en/empowering-schools-data-how-can-we-achieve-effective-use-educational-dashboards-teachers-and)).

**Rebanada de ~3 días (idea).** Importar un CSV o una hoja de cálculo con un esquema mínimo documentado. Antes de recomendar nada, un **detector de calidad de datos** avisa de casos como "faltan registros de 3 grupos; no fiable". Después, un "informe de claustro" de una página con 3 hallazgos en lenguaje llano, 1 pregunta para el equipo y 1 recomendación, con grupos de menos de 5 alumnos suprimidos. El cruce formación docente ↔ recursos ↔ resultados se presenta como correlación descriptiva, nunca como causa. Puede integrarse con el 10 ★ en un mismo producto, con dos vistas (centro y territorio).

**Fuera de alcance.** Integración con EMIS reales (SIAGIE, Séneca…) y conectores certificados.

### 18 · El aula que entiende cómo te sientes — Viabilidad: Media

**Problemas reales.** El campo está marcado por los fracasos de la vigilancia. En Vancouver se expusieron ~3.500 documentos sensibles y ~2.200 alumnos dispararon alertas. Hubo alumnos LGTBI+ sacados del armario, y no hay evidencia de que estas herramientas reduzcan el suicidio ([Hechinger/AP](https://hechingerreport.org/schools-are-surveilling-kids-to-prevent-gun-violence-or-suicide-the-lack-of-privacy-comes-at-a-cost/)). El 44 % de los docentes conoce casos de alumnos contactados por la policía a raíz del monitoreo ([The 74](https://www.the74million.org/article/survey-reveals-extent-that-cops-surveil-students-online-in-school-and-at-home/)). La inferencia biométrica de emociones está prohibida en la UE ([FPF](https://fpf.org/blog/red-lines-under-eu-ai-act-unpacking-the-prohibition-of-emotion-recognition-in-the-workplace-and-education-institutions/)). Lo más difícil es qué hacer cuando un check-in revela riesgo.

**Qué existe.** Los check-ins repetidos captan al 17 % del alumnado que cruza el umbral de bienestar bajo arriba y abajo y que una encuesta única clasificaría mal ([ECU](https://www.ecu.edu.au/newsroom/articles/research/ecu-research-finds-single-school-mental-health-checks-may-miss-students-in-need)). En España, la LOPIVI crea el Coordinador de Bienestar ([Ministerio](https://www.educacionfpydeportes.gob.es/dam/jcr:0cbfae41-1e4c-4df5-a77f-e40c8ec5f6ee/13-ficha-coordinacion-bienestar.pdf)).

**Rebanada de ~3 días (idea).** Solo autoinforme voluntario (emojis y texto opcional), una vista agregada para el docente y un botón separado "necesito hablar" que va al coordinador con acuse de recibo. Se añaden una vista "lo que ve tu profe", borrado por el alumno y un protocolo de escalado configurable. Sin cámara ni micrófono, y el LLM no puntúa emociones.

**Fuera de alcance.** Validación clínica y legal del protocolo. Las líneas de ayuda deben verificarse por país. Técnicamente es fácil, pero el riesgo ante el jurado es alto.

### 20 ★ · Que ningún talento pase desapercibido — Viabilidad: Media

**Problemas reales.** **La derivación por docentes y familias deja fuera a los alumnos pobres, de minorías y a las niñas.** El cribado universal aumentó un 174 % la identificación de alumnos con comedor subvencionado o que aprenden inglés, y el efecto desapareció al retirarlo ([Card y Giuliano, PNAS](https://pmc.ncbi.nlm.nih.gov/articles/PMC5137751)). La evaluación invisible de la creatividad tiene validez modesta (r ≈ 0,18–0,23) ([Shute et al.](https://myweb.fsu.edu/vshute/pdf/creativity_CHB.pdf)). Si la herramienta clasifica o asigna, entra en el Anexo III.

**Argumento a favor.** En PISA 2022, la creatividad correlaciona 0,66–0,67 con lectura y matemáticas, la brecha socioeconómica es de 9,5 puntos y las chicas superan a los chicos en todos los países ([OCDE vía copia en teachertoolkit](https://teachertoolkit.co.uk/wp-content/uploads/2024/09/b3a46696-en.pdf)).

**Rebanada de ~3 días (idea).** 3–4 retos abiertos de 10–15 min, iguales para todos. El resultado es una tarjeta de fortalezas con **evidencia observable**, sin puntuación ni etiqueta, que ve primero el alumno. La vista docente "lo que las notas no muestran" usa lenguaje de invitación. Para colaboración se usan autoexploración y coevaluación entre pares, y todo funciona offline.

**Fuera de alcance.** Validez psicométrica. El diseño de los retos consume mucho tiempo.

## Bloque F — personalización, recuperación y aprendizaje contextual (08, 11, 14, 21, 28)

### 08 · Aprender al ritmo de cada persona — Viabilidad: Media

**Problemas reales.** **Solo ~9 % alcanza la dosis efectiva** ([Khan Academy](https://blog.khanacademy.org/?p=18194)). En Rajastán, Mindspark mejoró en tests independientes, pero **no tuvo efecto en los exámenes de la propia escuela**, y el uso cayó al recortar el personal del laboratorio ([J-PAL](https://www.povertyactionlab.org/evaluation/scaling-personalized-adaptive-learning-pal-math-and-language-india)). El GEEAP lo califica de "prometedor pero con evidencia limitada", útil solo donde el hardware ya está ([GEEAP](https://resources.peopleinneed.net/documents/1290-geeap-report-smart-buys-2023-final_compressed--1-.pdf)), y la alineación curricular apenas está estudiada ([EdTech Hub](https://edtechhub.org/personalised-learning)).

**Qué existe.** Mindspark en Delhi dio +0,37 DE en matemáticas ([EconPapers](https://econpapers.repec.org/RePEc:aea:aecrev:v:109:y:2019:i:4:p:1426-60)) y onebillion en Malawi, sin electricidad, +0,54 DE en matemáticas ([Imagine Worldwide](https://www.imagineworldwide.org/wp-content/uploads/2-Year-Malawi-RCT-Formatted-Research-Brief_Updated_10_6_22.pdf)).

**Rebanada de ~3 días (idea).** Un modelo Elo o BKT sobre 15–30 habilidades de un dominio acotado. Cada recomendación lleva una explicación de una línea y tres opciones para el docente (aceptar, cambiar, sustituir), con el motivo registrado. Se añaden un semáforo de dosis y un "puente con el curso" que muestra qué habilidad básica desbloquea qué contenido del examen.

**Fuera de alcance.** Calibración de ítems y mejora del aprendizaje. "Orientar el proceso de aprendizaje" es alto riesgo en la UE.

### 11 ★ · Una segunda oportunidad para aprender — Viabilidad: Alta

**Problemas reales.** Incluso con la recuperación de ASER 2024, solo el 27,1 % de los alumnos de 3.º de la India rural lee un texto de 2.º ([Outlook India](https://www.outlookindia.com/national/aser-report-2024-rural-india-shows-recovery-from-post-pandemic-educational-losses)). TaRL sin tiempo dedicado no tuvo efecto, porque los docentes volvían al currículo del curso ([J-PAL Policy Insight](https://povertyactionlab.org/policy-insight/tailoring-instruction-students-learning-levels-increase-learning)). En Zambia asiste un tercio y hay escuelas que no celebran las sesiones ([J-PAL](https://www.povertyactionlab.org/initiative-project/tarlcatch-improving-implementation-fidelity-scale)). Un EGRA/EGMA autoadministrado en tableta (Tanzania) dio r = 0,73, "no lo bastante preciso para alumnos individuales", con pruebas de 69 y 59 min ([Imagine Worldwide 2025](https://www.imagineworldwide.org/wp-content/uploads/Tanzania_Kiswahili_SA-EGRMA_Final-Pilot-Report_2025.pdf)).

**Qué existe.** TaRL logra entre 0,07 y 0,70 DE en India ([J-PAL](https://povertyactionlab.org/policy-insight/tailoring-instruction-students-learning-levels-increase-learning)). ProFuturo ya tiene solución offline y Matemáticas, pero su memoria no menciona aprendizaje adaptativo ([Memoria 2024](https://profuturo.education/wp-content/uploads/2025/07/memoriadeactividad_2024.pdf)), así que hay un hueco donde encajar.

**Rebanada de ~3 días (idea).** Un diagnóstico oral tipo ASER de 5 min (letra/palabra/párrafo/historia; números/resta/división) que el docente aplica y registra offline en su móvil, con regla de parada. A partir de ahí, grupos por nivel automáticos y un plan de sesión de 30–45 min por grupo con materiales sin pantalla. Un botón de "sesión celebrada" con foto del registro alimenta un panel agregado para la ONG con el porcentaje de sesiones realizadas. Cada 3–4 semanas se reevalúa y se reagrupa, con sincronización diferida. El diagnóstico **sirve solo para agrupar**, lo que cumple la supervisión docente que pide el reto.

**Fuera de alcance.** Ítems validados en lenguas locales y mejora demostrada. Se puede enseñar cómo se mediría: pre/post con el mismo instrumento.

### 14 · Aprender jugando, progresar de verdad — Viabilidad: Media

**Problemas reales.** El efecto cognitivo de la gamificación es g = 0,49, pero **los efectos motivacionales y conductuales no se sostienen en los estudios de alto rigor** ([Sailer y Homner](https://link.springer.com/article/10.1007/s10648-019-09498-w)). La novedad decae en semanas. Prodigy recibió una queja ante la FTC por monetizar la recompensa ([EdWeek](https://www.edweek.org/technology/popular-interactive-math-game-prodigy-is-target-of-complaint-to-federal-trade-commission/2021/02)) y no describe ningún RCT ([Prodigy Research](https://prodigygame.com/research)).

**Qué existe.** Software de remediación basado en juego en India: +0,47 DE ([J-PAL](https://povertyactionlab.org/policy-insight/tailoring-instruction-students-learning-levels-increase-learning)).

**Rebanada de ~3 días (idea).** Un microjuego donde la mecánica es la propia operación que se aprende, con una escalera de dificultad. **Dos paneles separados, "participación" y "aprendizaje"**, este último con ítems de transferencia fuera del juego, y una alerta de "enganche sin progreso". Sin pagos ni rankings públicos.

**Fuera de alcance.** Retención y validez de la evaluación invisible. El arte y el diseño del juego pueden comerse las 63 h.

### 21 · Disminuir el retraso escolar — Viabilidad: Media

**Problemas reales.** En México, **27,77 M de personas tenían rezago en educación básica en 2022**, con una reducción de ~225.000 al año, lo que supone ~123 años al mismo ritmo (extrapolación periodística, no oficial) ([Excélsior](https://www.excelsior.com.mx/nacional/tomaria-123-anos-al-pais-abatir-el-rezago-educativo-ocho-entidades-entre-las-mas-afectadas)). La cifra de 50,5 M incluye la media superior y no es comparable ([UnoTV](https://www.unotv.com/nacional/en-mexico-hay-50-5-millones-de-personas-con-rezago-educativo-inea/)). En Campeche el responsable admite que "el avance es pequeño" ([Por Esto](https://www.poresto.com/campeche/2026/7/1/en-cinco-anos-solo-13-mil-personas-salieron-del-analfabetismo-en-todo-el-estado.html)). En América Latina el 34 % abandona por necesidad de trabajar ([Blog BID](https://blogs.iadb.org/educacion/es/educaciontecnicacovid19)). El rezago se mide por certificación, no por competencia.

**Rebanada de ~3 días (idea).** Un tablero territorial con datos públicos de INEA/INEGI por municipio y un ciclo trimestral meta → acción → indicador → revisión que haga visible la brecha entre certificación y competencia. Se completa con una ruta modular para el adulto que trabaja: microunidades de 10 min por audio o mensajería.

**Fuera de alcance.** Integración con la acreditación oficial e impacto en el rezago. "Estrategia global por región" es demasiado amplio para un pitch de 5 min, y la disponibilidad de los datos municipales no está verificada.

### 28 · El barrio también enseña — Viabilidad: Media

**Problemas reales.** El aprendizaje por proyectos funciona cuando está estructurado: +8 pp en RCT de EE. UU., con currículo y formación ([Universidad de Michigan](https://news.umich.edu/project-based-learning-yields-better-student-outcomes-in-studies-supported-by-famous-filmmakers-foundation); hay conflicto de interés con Edutopia, [Edutopia](https://www.edutopia.org/article/new-research-makes-powerful-case-pbl)). La visión por computador entrenada en laboratorio no generaliza a fotos de campo ([arXiv 2511.18989](https://arxiv.org/abs/2511.18989v1)). Hay unos 1,2 M de niños con imágenes convertidas en deepfakes sexuales en un año ([DevelopmentAid](https://www.developmentaid.org/news-stream/post/204257/unicef-warns-deepfake-abuse-harms-1-2-million-children)), y existen guías para fotografiar menores ([NSPCC](https://learning.nspcc.org.uk/safeguarding-child-protection/photographing-filming-children)).

**Rebanada de ~3 días (idea).** Foto u observación → reto estructurado (pregunta guía, hipótesis, medición casera, tareas por edad, rúbrica, vínculo curricular) que el docente aprueba. Caras difuminadas y EXIF/GPS eliminados antes de procesar, y un aviso explícito de que "la IA no puede afirmar que esta agua esté contaminada". Encaja con el método científico del 17 ★.

**Fuera de alcance.** Diagnóstico ambiental y evaluación del aprendizaje.

## Los 29 retos de un vistazo

| # | Reto | ★ | Viabilidad en ~3 días | Riesgo técnico principal | Encaje con criterios |
|---|---|---|---|---|---|
| 01 | Copiloto del docente | | Alta | Calidad en lengua local; revisión que se come el ahorro | Bueno en acabado y mercado; creatividad difícil (mercado saturado) |
| 02 | Aprender sin conexión | ★ | Media | Sincronización y conflictos; almacenamiento | Muy alto en países desfavorecidos y ProFuturo; con el 29, alta creatividad |
| 03 | Un contenido, muchas formas | ★ | Alta | Texto alternativo STEM; inconsistencia del prompt | Alto en inclusión, ética y mercado (EAA) |
| 04 | Tutor que no da la respuesta | | Alta | Fugas de la respuesta; abandono por frustración | Alta creatividad con demo de jailbreak; WhatsApp suma en países desfavorecidos |
| 05 | Detectar antes de que sea tarde | | Alta | Sesgo y falsos positivos (con datos sintéticos) | Bueno si la alerta trae acción; riesgo regulatorio |
| 06 | La escuela habla tu idioma | ★ | Media | Calidad de traducción en lenguas indígenas y africanas; licencias | Alto en inclusión; peligro de sobreprometer |
| 07 | IA que explica sus límites | | Alta | Bajo (banco precocinado) | Creatividad alta; impacto en países desfavorecidos moderado |
| 08 | Al ritmo de cada persona | | Media | Modelo de dominio y contenido semilla | Medio; competencia con plataformas existentes; alto riesgo UE |
| 09 | Escuela en el bolsillo | | Alta | Canales reales (operadores, Meta) | Muy alto en países desfavorecidos |
| 10 | Encontrar a quien dejamos atrás | ★ | Alta | Bajo; la credibilidad depende de los datos sintéticos | Alto en ética, inclusión y escalabilidad |
| 11 | Segunda oportunidad | ★ | Alta | Bajo; diseño de ítems y planes | Muy alto en los cuatro criterios ProFuturo |
| 12 | Entrenador invisible | ★ | Alta | Calidad en lenguas locales; coste de mensajería | Muy alto en impacto y escalabilidad |
| 13 | La escuela aprende de sus datos | ★ | Alta | Calidad de datos de entrada | Alto en escalabilidad; mejor fusionado con el 10 |
| 14 | Aprender jugando | | Media | Tiempo de diseño del juego | Creatividad alta; acabado difícil |
| 15 | Emergencias | ★ | Media | Hotspot y cifrado; protección sin validar | Alto en impacto; demasiados frentes |
| 16 | Detector de desinformación | | Alta | Curación de casos | Bueno si mide discriminación; no veredictos |
| 17 | Laboratorio sin laboratorio | ★ | Alta | Permisos de sensores en navegador; diferenciarse de PhET | Creatividad y acabado muy visibles |
| 18 | El aula que entiende cómo te sientes | | Media | Bajo técnico, alto ético y legal | Arriesgado ante el jurado |
| 19 | Formación → cambio real | | Alta | Rúbrica no validada | Mejor como módulo del 12 ★ |
| 20 | Ningún talento desapercibido | ★ | Media | Diseño de retos; validez modesta | Alto en inclusión; riesgo de "etiqueta" |
| 21 | Disminuir el retraso escolar | | Media | Datos municipales no verificados; alcance difuso | Medio |
| 22 | El sonido no es una barrera | | Media | WER en aula; signos inmaduros | Alto en inclusión si no promete traducción de signos |
| 23 | Aprendizaje entre pares | | Media | Chat en tiempo real con varios usuarios; clasificador | Creatividad alta; evidencia débil |
| 24 | IA para los más pequeños | | Media | Seguridad del contenido; TTS; licencias | Medio; canal del cuidador |
| 25 | Tecnología comprensible | | Media | Alcance demasiado amplio | Medio |
| 26 | Cada uno con su ritmo | | Media | ASR en aula; móviles prohibidos | Medio, solo si se reformula |
| 27 | ¿Quién aprendió? | | Alta | Validez de las preguntas generadas | Creatividad alta; ética fuerte si no pone nota |
| 28 | El barrio también enseña | | Media | Visión en fotos de campo; privacidad de imágenes | Medio; mejor junto al 17 ★ |
| 29 | IA sin conexión | | Media | Latencia y alucinación de modelos pequeños | Muy alto en países desfavorecidos; mejor como motor del 02 ★ |

## El jurado preguntará quién mantiene esto y dónde decide el humano

### Afirmaciones que conviene evitar

| Evitar | Decir en su lugar | Por qué |
|---|---|---|
| "Ahorra 6 horas a la semana al docente" | "Los RCT miden 25–50 min/semana; buscamos ese rango" | 5,9 h es autodeclarado ([Walton](https://nextgeninsights.waltonfamilyfoundation.org/resources/how-ai-gives-teachers-time-back/)) frente a −25 min ([EEF](https://educationendowmentfoundation.org.uk/news/teachers-using-chatgpt-alongside-a-guide-to-support-them-to-use-it-effectively-can-cut-lesson-planning-time-by-over-30-per-cent)) y −49 min (Aila) |
| "IA para cada alumno en su móvil de 2 GB" | "IA en el dispositivo del docente, con cola de preguntas" | Móviles de 4 GB = 0,5–1B ([InsiderLLM](https://insiderllm.com/guides/run-llms-old-phones-mobile-inference/)) |
| "Sincronización sin conflictos" | "Eventos de solo-añadir; robustez sin probar en campo" | Kolibri falla tras semanas ([Foro LE](https://community.learningequality.org/t/problems-synchronizing/2791?page=2)) |
| "Traduce al náhuatl/aimara listo para el aula" | "Borrador con semáforo y revisión de hablantes" | chrF++ por debajo del baseline ([AmericasNLP](https://aclanthology.org/2024.americasnlp-1.28.pdf)) |
| "Genera Lectura Fácil certificada" | "Borrador con checklist UNE pendiente de validadores" | La UNE exige validación ([Aragón](https://www.aragon.es/w/inteligencia-artificial-y-lectura-f%C3%A1cil-un-piloto-hacia-una-informaci%C3%B3n-m%C3%A1s-clara-y-accesible-en-arag%C3%B3n)) |
| "Avatar que traduce lengua de signos" | "Herramienta para el intérprete y canal de retorno" | WFD, efsli y los términos de Signapse ([Jisc](https://nationalcentreforai.jiscinvolve.org/wp/2025/09/16/ai-sign-language-translation-ready-for-education/)) |
| "Detecta si el texto lo escribió una IA" / "FALSO 87 %" | "Recoge evidencias; decide el docente" | 61 % de falsos positivos en no nativos ([arXiv 2304.02819](https://www.emergentmind.com/papers/2304.02819)) |
| "Detecta emociones / talento / riesgo" | "Muestra señales y evidencias para que una persona decida" | Art. 5(1)(f) y Anexo III ([FPF](https://fpf.org/blog/red-lines-under-eu-ai-act-unpacking-the-prohibition-of-emotion-recognition-in-the-workplace-and-education-institutions/); [Anexo III](https://artificialintelligenceact.eu/annex/3/)) |
| "Mejora el aprendizaje" | "Así lo mediríamos: pre/post, dosis, RCT por escuelas" | Todos los efectos citados tardan de 6 semanas a 2 años |
| Citar mejoras de ProFuturo como causales | "Datos del programa, sin diseño aleatorizado" | Comparaciones con escuelas similares ([Memoria 2024](https://profuturo.education/wp-content/uploads/2025/07/memoriadeactividad_2024.pdf)) |

### Por dónde va a presionar el jurado

La pregunta más probable es **quién mantiene el sistema y quién cura el contenido**, porque la gestión es el 65 % del coste en el caso mejor documentado ([GPE KIX](https://www.gpekix.org/sites/default/files/2025-09/Can%27t%20Wait%20to%20Learn%20Value%20for%20Money%20Chad%20brief.pdf)). Le seguirán dónde entra la persona (y si puede discrepar), qué datos de menores salen del dispositivo, cuánto cuesta por alumno y año a escala, si funciona sin red y en la lengua local, y qué pasa cuando decae la novedad. Conviene llevar en el repositorio una "ficha de impacto" ligera, tipo EIPD con ficha de modelo: datos usados y excluidos, quién ve qué y cómo se impugna una decisión. Es barata de hacer y apunta al 25 % de "uso ético". Hay también trampas de licencia que afectan a la transferibilidad: **NLLB es CC-BY-NC** ([Hugging Face](https://huggingface.co/facebook/nllb-200-distilled-600M/blob/main/README.md)) y **ARASAAC es CC BY-NC-SA**, ambas incompatibles con un uso comercial directo y con algunas licencias libres del repositorio. Y en la demo, depender del LLM en directo es un riesgo de latencia y error que se mitiga con respuestas cacheadas para el vídeo de 3 min.

### Huecos sin resolver

| Hueco | Por qué importa |
|---|---|
| Estado legal del Digital Omnibus: una fuente secundaria lo da como Reglamento (UE) 2026/1744 del 8 jul 2026 ([EduVerse](https://edlaw.eduverse.com/docs/jurisdiction/int/eu/ai-act/)); otras, como acuerdo de mayo 2026 pendiente de publicación ([Gibson Dunn](https://www.gibsondunn.com/eu-ai-act-omnibus-agreement-postponed-high-risk-deadlines-and-other-key-changes/)) | Comprobarlo en EUR-Lex antes de citar fechas en el pitch |
| Si el jurado acepta datos sintéticos y si se pueden combinar retos (p. ej., 02+29, 10+13, 12+19, 17+28) | Determina la estrategia de combinación con un reto ★ |
| Hardware real que ProFuturo entrega hoy en sus aulas (tabletas, servidor, maleta) y su sistema de acompañamiento tras la formación | Encaje y transferibilidad de 02, 11, 12 y 17 |
| Edad mínima de las API de LLM para productos dirigidos a menores (OpenAI, Anthropic) | Viabilidad legal de 04, 07, 23 y 27 con alumnos |
| Tarifas de WhatsApp y SMS por país y fuente oficial de Meta | Coste por alumno en 09 y 12 |
| Calidad de modelos pequeños y de ASR/TTS en español latinoamericano y lenguas indígenas | Promesas de 06, 22, 24 y 29 |
| Si existe API pública de Giga y bajo qué condiciones | Capa de datos reales del 10 |
| Estado en 2026 de la herramienta abierta de UNICEF/Uruguay para libros accesibles | Si existe, el 03 debe integrarse y no competir |
| Disponibilidad de datos municipales de INEA/INEGI | Viabilidad del 21 |
| Líneas de ayuda verificadas por país | Imprescindibles antes de enseñar el flujo del 18 |
| Discrepancias internas: Rori (una hora semanal frente a 2×30 min), Tutor CoPilot (700/1.000 frente a 900/1.800), Botswana (J-PAL frente a EdTech Hub), "15 % usa Khanmigo" sin verificar | Usar solo las cifras de la fuente primaria |

## Conclusión

La lectura útil de los 29 retos es que los organizadores piden lo mismo con distintos nombres: **tecnología que no puentee al docente, que no decida sobre menores y que funcione con poca red**. La evidencia de campo señala que el fallo casi nunca está en el algoritmo y casi siempre en la última milla: la sesión que no se celebra, la guía que nadie lee, la traducción que hay que reescribir o la alerta que nadie atiende. Un equipo de hackathon no puede arreglar esa última milla, pero sí construir el instrumento que la hace visible y gestionable. Ahí está la creatividad que puntúa el 40 %: un botón de "sesión celebrada", un semáforo de confianza por lengua, un "no procede" que corrige umbrales, un resumen para el coach humano.

La segunda implicación es táctica. Con ~63 horas y un reto ★, la ventaja está en **declarar los límites antes de que los señale el jurado** y en convertirlos en arquitectura: datos sintéticos explícitos, nada de biometría, agregación con supresión y un protocolo de evaluación propuesto en lugar de impacto prometido. Eso se traduce directamente en los criterios de uso ético, inclusión y sostenibilidad del premio ProFuturo. El reto 11 es la opción con menor riesgo y mayor encaje; el 12 la mejor si el equipo es pequeño; y 02+29 la más espectacular si hay manos para soportar su riesgo técnico.
