# 02. Idea y producto

## En una frase

**Destello convierte retos de papel y notas de voz del docente en evidencias concretas de lo que cada alumno hizo, y avisa al docente de a quién no está viendo.**

## El giro

Las herramientas actuales preguntan: *¿cómo de bueno es este alumno?*

Destello pregunta: *¿a quién de esta clase no estamos viendo todavía?*

Esto cambia el diseño entero:

| Lo habitual | Destello |
|---|---|
| Se evalúa al alumno | Se apoya la mirada del docente |
| «Es creativo» | «Propuso usar la sombra para medir la altura» |
| Puntuación, nivel, radar | Momentos concretos con su fuente |
| Una pantalla por alumno | Un móvil, papel y lápiz |
| La IA concluye | La IA propone y el docente decide |
| El perfil se acumula para siempre | Los momentos caducan y el alumno cambia |

Un **destello** es la unidad del producto: *un momento observable, con fecha y fuente, que describe lo que alguien hizo y nunca lo que alguien es.*

## Los cuatro mecanismos diferenciales

### 1. Sin puntuación por arquitectura

No es una opción que se pueda activar. **El modelo de datos no contiene notas, niveles ni porcentajes por alumno.** La interfaz no ordena ni compara alumnos, y no exporta al cuaderno de notas.

### 2. Gramática antietiqueta

Un validador de código, no solo una instrucción a la IA, rechaza las salidas que describan rasgos, niveles, emociones o diagnósticos. También exige que cada cita exista literalmente en la nota del docente. Sin fuente no hay destello.

### 3. La IA también cuestiona al docente

Si el docente dicta *«Juan es un vago, pero hoy ha ayudado»*, Destello no guarda «vago». Responde:

> «Esto parece una valoración. ¿Qué viste hacer a Juan?»

Es **el momento más potente de la demo**: la IA no refuerza la etiqueta, la devuelve.

### 4. Radar de invisibles

La única métrica del producto es la **cobertura de observación**: *«En tres semanas no has registrado nada de 4 alumnos»*. Antes de cada sesión, Destello sugiere el grupo que conviene observar. Este dato es privado del docente: no llega a la dirección y no sirve para evaluarle.

## Flujo de uso

1. **Preparar (2 min, sin conexión).** El docente elige un reto. Destello propone el grupo foco, priorizando a quien tiene menos observaciones.
2. **En clase (15 min, sin conexión).** Los grupos resuelven el reto con papel. El docente toca un alumno y dicta una nota de unos 20 segundos sobre lo que ve.
3. **Cerrar (2 min, sin conexión).** Fotografía los artefactos. No se fotografía a personas. Todo queda en cola en el móvil.
4. **Analizar (cuando haya conexión).** La cola se envía sola al abrir la app. La IA propone destellos.
5. **Confirmar (5 min).** Cada propuesta muestra su fuente. El docente acepta, edita o descarta. **Nada se guarda sin este paso.**
6. **Devolver.** El docente recibe sugerencias, como roles o actividades para probar, y puede imprimir una **tarjeta de destellos** para el alumno, quien puede añadir su versión.

**Objetivo:** menos de 10 minutos de trabajo docente fuera de la actividad. Es una hipótesis que hay que comprobar con docentes.

## Retos de papel

Son actividades de 15 minutos, en grupos de 3 o 4, que no requieren apenas lectura. Se definen en YAML, de modo que cualquier centro puede añadir o adaptar retos sin tocar el código.

| Reto | Actividad | Capacidad | Evidencia observable | Competencia LOMLOE* |
|---|---|---|---|---|
| **Usos imposibles** | Dibujar todos los usos posibles de una botella | Creatividad | Variedad de categorías, ideas poco habituales | CE3, CCEC3 |
| **Regla secreta** | Descubrir una regla oculta probando secuencias de tarjetas | Pensamiento lógico | Prueba hipótesis, descarta, formula la regla | STEM1 |
| **Dibujo a ciegas** | Uno describe una figura y otro la dibuja sin verla | Comunicación | Reformula, comprueba, adapta el lenguaje | CCL1 |
| **Torre muda** | Construir en grupo una torre de papel sin hablar | Colaboración | Coordina con gestos, cede, reparte tareas | CPSAA3 |
| **Puente de un folio** | Sostener una moneda con un solo folio doblado | Resolución de problemas | Prueba, analiza el fallo, cambia de estrategia | STEM2, CE3 |

\*Correspondencia propuesta por el equipo. **Tiene que revisarla un docente.** Los marcos de otros países se añadirán como archivos de configuración.

Estos retos se inspiran en tareas conocidas, como la de usos alternativos de Guilford, pero **no son instrumentos validados**.

**Atribución individual:** un artefacto de grupo solo genera evidencia *de grupo*. La evidencia individual tiene que venir de la nota del docente. La IA nunca adivina quién hizo qué a partir de una foto.

## Ejemplo de salida

**Entrada** (nota de voz, reto «Puente de un folio»):
> «A07 ha sido quien ha dicho que si doblaban el papel en acordeón aguantaría más, y cuando se ha caído ha propuesto hacer los pliegues más estrechos.»

**Propuesta de la IA:**
```json
{
  "alias": "A07",
  "accion_observable": "Propuso doblar en acordeón y, tras el fallo, estrechar los pliegues",
  "cita_literal": "cuando se ha caído ha propuesto hacer los pliegues más estrechos",
  "capacidad": "resolucion_de_problemas",
  "sugerencia_docente": "Prueba a pedirle que explique al grupo qué cambió entre el primer y el segundo intento"
}
```

No lleva puntuación porque el formato no tiene ningún campo donde ponerla.

## Protección de datos desde el diseño

| Decisión | Consecuencia |
|---|---|
| Nombres solo en el móvil del docente | El servidor y la IA reciben alias, como `A07` |
| Servidor sin base de datos | Procesa y olvida: no hay ningún almacén central de perfiles de menores |
| Voz del docente, no del alumnado | No se graban voces de menores |
| Fotos de artefactos, nunca de personas | Se eliminan los metadatos en el móvil. La IA rechaza imágenes con personas |
| Caducidad | Los destellos salen de la vista principal a los 60 días y se borran al acabar el curso, salvo los que el alumno conserve en su tarjeta |
| Propiedad | La tarjeta impresa se la lleva el alumno |

Los alias y las fotos siguen siendo **datos personales seudonimizados**. Esto reduce el riesgo, no elimina las obligaciones legales. Más detalle en el [documento 06](06-defensa-jurado.md).

## Alcance del MVP

### Imprescindible para el 5 de noviembre

- [ ] PWA instalable que funciona en modo avión.
- [ ] Clase con nombres locales y alias.
- [ ] Dos retos de punta a punta: **Puente de un folio** y **Usos imposibles**. Los otros tres, como contenido en YAML.
- [ ] Foto y nota de voz en cola, con envío automático al recuperar la conexión.
- [ ] Propuesta de destellos con cita, y confirmar, editar o descartar.
- [ ] Validador antietiqueta y repregunta al docente.
- [ ] Radar de invisibles y sugerencia de grupo foco.
- [ ] Tarjeta imprimible.
- [ ] Evaluación automática con resultados reales.

### Si sobra tiempo

- Los otros tres retos de punta a punta.
- Portugués e inglés en la interfaz.
- Copia de seguridad cifrada exportable.

### Fuera de alcance, y lo decimos claro

- Sincronización entre dispositivos.
- Paneles para dirección o administración. **No están pendientes: no se harán.**
- Integración con cuadernos de notas. **Tampoco se hará.**
- WhatsApp: resolvería la instalación, pero enviaría datos de menores por un tercero.
- Lenguas originarias como el quechua: requieren pruebas con hablantes antes de prometerlas.

## Modelo de negocio

El código abierto es obligatorio según las bases, así que el negocio no puede depender de cerrar el código.

| Cliente | Qué paga | Por qué |
|---|---|---|
| Docente individual | Nada | Es el canal de adopción |
| Fundaciones y ONG educativas | Despliegue, formación e informes de implantación | Ya trabajan en estos contextos y ya tienen capacidad de despliegue |
| Administraciones públicas | Alojamiento en su territorio, adaptación curricular y soporte | Necesitan soberanía de datos |
| Editoriales y entidades culturales | Paquetes de retos locales | Contenido adaptado a cada contexto |

**Coste variable estimado:** unos 0,35 $ por sesión y 7 $ por clase al año (20 sesiones). El cálculo está en el [documento 03](03-arquitectura-y-stack.md) y **hay que sustituirlo por datos medidos antes del pitch**. Los precios de venta son hipótesis sin validar: no los presentéis como datos de mercado.

## Métricas de éxito de un piloto

- **Principal:** porcentaje de alumnos con al menos un destello confirmado por trimestre. Si funciona, los «invisibles» bajan.
- **Calidad:** porcentaje de propuestas que el docente acepta sin cambios.
- **Coste docente:** minutos por sesión.
- **Efecto real:** número de cambios de actuación que el docente reporta, como ofrecer un rol nuevo a un alumno.

La pregunta de fondo, si esto mejora el aprendizaje, solo la puede responder un piloto de un curso con grupo de comparación. No se responde en un hackathon.
