# 06. Defensa ante el jurado

## La realidad sobre «sin excusas»

Queremos que nadie pueda descartar la idea por un punto débil sin respuesta. Pero **no podemos prometer que nadie la descartará**, ni que vayamos a ganar: el jurado decide y no conocemos al resto de equipos.

Sí podemos conseguir que cada objeción tenga una respuesta honesta. Las debilidades reconocidas antes de que nos las señalen dan credibilidad. Las que el jurado descubre por su cuenta la destruyen.

**Tres frases que nunca debemos decir:**

- «Es 100 % fiable» o «100 % aplicable». Cualquier experto lo pondrá en duda.
- «Detectamos el talento». No medimos eso y el reto pide evitarlo.
- «No hay nadie haciendo esto». Solo podemos afirmar que no lo hemos encontrado.

## Objeciones y respuestas

### Validez

**«¿Cómo sabéis que funciona si no hay validación psicométrica?»**
> Porque no medimos un rasgo. Registramos hechos observados por un docente, con su fuente. Lo que sí hemos evaluado es que el sistema no invente citas ni introduzca etiquetas: [resultado real]. La pregunta de si mejora el aprendizaje exige un piloto de un curso con grupo de comparación, y es nuestro siguiente paso.

**«Entonces, ¿detecta creatividad o no?»**
> Detecta evidencias de conductas asociadas a la creatividad, y las pone delante de un docente para que decida. El reto pide información para orientar. No un veredicto.

**«¿Por qué confiar en unas actividades que os habéis inventado?»**
> Se inspiran en tareas conocidas, como la de usos alternativos, pero no las presentamos como instrumentos validados. Sirven para crear situaciones en las que observar. Y son archivos abiertos: un equipo docente puede sustituirlas.

### Sesgo

**«El docente ya tiene prejuicios. Vuestro sistema depende de sus notas.»**
> Sí, es nuestro principal límite y no lo eliminamos. Lo que hacemos es exigir hechos en lugar de valoraciones, repreguntar cuando aparece una etiqueta y hacer visible a quién no se está observando. Reduce el sesgo de atención, pero no el de interpretación.

**«Los modelos de IA discriminan a quien escribe distinto.»**
> Es un riesgo documentado, así que lo medimos: comparamos los resultados de una misma nota con y sin errores o giros dialectales. Resultado: [real]. Es una prueba pequeña con datos sintéticos, y habría que repetirla con cada variante lingüística antes de desplegar.

**«¿No es una forma de vigilar a los docentes?»**
> Es lo contrario. La cobertura solo se ve en el móvil del docente. No existe ningún panel de dirección, y el servidor no guarda nada.

### Etiquetas

**«Un destello "colaboración" también es una etiqueta.»**
> Es una etiqueta sobre un acto, no sobre una persona. La diferencia entre «colaboró al repartir los materiales» y «es colaborativo» es exactamente el cambio que buscamos. Además, caduca, y el alumno puede responder a ella.

**«¿No puede el docente sacar sus propias conclusiones y etiquetar igual?»**
> Sí. Ninguna herramienta puede impedir eso. Lo que evitamos es que la tecnología le dé autoridad a esa etiqueta y que esta persiga al alumno durante años.

**«¿Y si solo acumula destellos de unos cuantos alumnos?»**
> Precisamente para eso está el radar de invisibles, que dirige la siguiente observación.

### Viabilidad

**«Un docente sobrecargado no va a usar esto.»**
> Es la pregunta más importante, y la respuesta real se obtiene en un piloto. Hemos diseñado para menos de 10 minutos por sesión, sobre actividades que además son clase. [Frase real de docente, si existe.] Si los docentes nos dicen que es demasiado, se reduce la frecuencia: una sesión al mes también genera información.

**«¿Y una escuela sin ninguna conexión?»**
> La captura funciona sin conexión. El análisis necesita internet en algún momento, sea en casa, en otro centro o con datos móviles. **Una escuela donde el docente nunca tenga conexión no está cubierta hoy.** El siguiente paso sería un servidor local con un modelo abierto, y habría que comprobar su calidad.

**«¿Y si el docente no tiene móvil?»**
> Hoy no funciona sin un dispositivo por docente. Es un requisito mínimo, mucho menor que uno por alumno.

**«¿Por qué una clase pagaría esto si es de código abierto?»**
> El docente no paga. Pagan quienes despliegan a escala y necesitan alojamiento, formación, soporte y adaptación curricular. Es un modelo habitual en el código abierto.

**«¿Por qué no lo hará Google?»**
> Podrían. Pero su apuesta actual es la contraria: conversación por pantalla y puntuación. Y si un gran actor adopta la idea de no puntuar a los menores, para nosotros también es un avance. Nuestra ventaja es el foco en estos contextos, el código abierto y el alojamiento en cada territorio.

### Datos y legalidad

**«¿Qué pasa con la privacidad de los menores?»**
> No grabamos a menores ni los fotografiamos. Los nombres se quedan en el móvil. El servidor procesa y olvida. Aun así, siguen siendo datos personales: **antes de un piloto hacen falta una evaluación de impacto, la base legal con el centro y el acuerdo con los proveedores.** En el hackathon solo usamos datos sintéticos.

**«¿Cumple el Reglamento Europeo de IA?»** (ver abajo)
> No nos escudamos en excepciones. Consideramos prudente diseñar según las exigencias de alto riesgo y hacer una revisión legal antes de desplegar en la UE.

**«¿Qué pasa si se pierde el móvil?»**
> Hoy se pierden los datos locales, y sin cifrado local podría leerlos quien lo tenga. Es el precio de no tener base de datos central, y se resuelve con copia cifrada y cifrado local antes del piloto.

**«Dependéis de un proveedor de EE. UU.»**
> En esta versión, sí. La llamada a la IA está aislada para poder cambiar de proveedor, y cualquier cambio tiene que pasar antes la misma evaluación.

## Marco legal

**Esto no es asesoramiento jurídico.** Procede en gran parte de fuentes secundarias y necesita revisión profesional antes de un despliegue.

### Reglamento de IA de la UE

| Norma | Contenido | Situación de Destello |
|---|---|---|
| **Art. 5.1.f** | Prohíbe inferir emociones mediante biometría en centros educativos, salvo motivos médicos o de seguridad. Aplicable desde febrero de 2025 (fecha de fuentes secundarias; comprobar en el texto oficial) | **No lo hace**: sin biometría ni inferencia de emociones |
| **Anexo III, punto 3** | [Alto riesgo](https://artificialintelligenceact.eu/annex/3/): admisión, evaluación de resultados de aprendizaje, incluso para orientar el proceso, asignación de nivel y vigilancia en exámenes | **Zona gris**: puede entenderse como «evaluar resultados» para orientar el aprendizaje |
| **Art. 6.3** | [Excepción](https://artificialintelligenceact.eu/article/6/) para tareas preparatorias y otras limitadas, pero **todo sistema que elabore perfiles de personas es siempre de alto riesgo** | **No debemos confiar en ella**: registrar evidencias por alumno podría considerarse perfilado |
| **Omnibus digital** | [Aplaza las obligaciones del Anexo III al 2 de diciembre de 2027](https://www.mondaq.com/eu-digital-omnibus-on-ai-enters-into-force/1825722) | Hay margen, pero no exención |

**Nuestra posición:** tratamos a Destello **como si fuera de alto riesgo**. La supervisión humana, la trazabilidad y la documentación ya están en el diseño, pero no basta con esto: la conformidad completa exige gestión de riesgos, documentación técnica, evaluación de conformidad y seguimiento posterior a la comercialización. **No podemos decir que «cumplimos el Reglamento»; podemos decir que el diseño va en esa dirección.**

### Protección de datos

- Los alias y las fotos son datos **seudonimizados**, y por tanto siguen siendo personales.
- Datos de menores en un centro educativo: hacen falta una base jurídica, información a familias, encargo de tratamiento y, previsiblemente, una evaluación de impacto.
- Las decisiones las toma un humano y no hay ninguna decisión automatizada con efectos sobre el alumno, lo que encaja con el espíritu del art. 22 del RGPD.
- Fuera de la UE, el marco cambia según el país y hay que revisarlo.

### Durante el hackathon

Sin datos reales de menores. Si un docente prueba la herramienta, que lo haga con material inventado. Las bases exigen además que el contenido se libere con licencia libre y que las aportaciones sean originales: se deben revisar las licencias de las dependencias.

## Límites que asumimos

| Límite | Consecuencia |
|---|---|
| No está validado con alumnado real | La eficacia es una hipótesis hasta hacer un piloto |
| Depende de la calidad de observación del docente | Mejora la atención, pero no sustituye el criterio |
| Requiere móvil y conexión ocasional | No cubre los contextos más extremos |
| Evaluación pequeña y sintética | Detecta fallos evidentes; no demuestra equidad general |
| Inicialmente en español | Otros idiomas requieren pruebas específicas |
| Los retos no están validados | Se presentan como situaciones de observación |
| Los datos solo viven en un móvil | Riesgo de pérdida hasta añadir copia y cifrado |

## Fuentes legales

- [Anexo III](https://artificialintelligenceact.eu/annex/3/) y [artículo 6](https://artificialintelligenceact.eu/article/6/) (texto de referencia, no publicación oficial).
- [Análisis de FPF sobre la prohibición del reconocimiento de emociones](https://fpf.org/blog/red-lines-under-eu-ai-act-unpacking-the-prohibition-of-emotion-recognition-in-the-workplace-and-education-institutions/).
- [Maldita: aplicación en centros educativos](https://maldita.es/malditatecnologia/20250911/aplicar-ley-ia-centros-educativos/).
- [Mondaq](https://www.mondaq.com/eu-digital-omnibus-on-ai-enters-into-force/1825722), [Cooley](https://cdp.cooley.com/digital-ai-omnibus-delays-key-deadlines-introduces-new-rules/) y [National Law Review](https://natlawreview.com/article/eu-digital-omnibus-ai-enters-force) sobre el Omnibus digital.
