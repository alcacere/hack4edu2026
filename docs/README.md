# Destello: documentación del proyecto (Hack4Edu 2026)

> **Destello** es la herramienta que ayuda al docente a ver lo que la nota no ve.
> La IA no puntúa al alumno. Mide qué parte de la clase está viendo el docente.

Decisiones cerradas el 3 de noviembre de 2026. Si algo cambia, se actualiza aquí primero.

## Qué leer

| # | Documento | Para qué sirve | Responsable |
|---|---|---|---|
| 01 | [Análisis de competencia](01-analisis-competencia.md) | Mercado actual, ganadores anteriores y hueco que ocupamos | Producto |
| 02 | [Idea y producto](02-idea-y-producto.md) | Concepto, flujo, retos y alcance del MVP | Producto |
| 03 | [Arquitectura y stack](03-arquitectura-y-stack.md) | Tecnología, salvaguardas y evaluación | IA/Backend |
| 04 | [Equipo y plan](04-equipo-y-plan.md) | Tres roles, calendario y plan B | Todos |
| 05 | [Pitch de 5 minutos](05-pitch-5-minutos.md) | Guion cronometrado y entregables | Producto |
| 06 | [Defensa ante el jurado](06-defensa-jurado.md) | Objeciones, marco legal y límites reales | Todos |

## Decisiones

| Tema | Decisión |
|---|---|
| Producto | PWA para el móvil del docente. Captura sin conexión, análisis asíncrono y confirmación humana obligatoria |
| Innovación central | No hay puntuación en el modelo de datos. La única métrica es la cobertura de observación del docente |
| Usuarios | Docentes de alumnado de 10 a 14 años en centros con pocos recursos |
| Dispositivos en el aula | Un móvil: el del docente. El alumnado trabaja con papel |
| Modalidad | **Innovadora**: empezamos de cero y la creatividad pesa un 40 % |
| Stack | React + Vite (PWA), FastAPI sin base de datos, Claude y Whisper autoalojado |
| Licencia | Código Apache-2.0. Documentación CC BY-NC-SA 3.0, la recomendada por las bases |

## Calendario real

Las bases publicadas dan **menos margen que los 4 días que estábamos contando**:

| Fecha | Hito |
|---|---|
| Mar 3 nov | Inicio a las 9:00, networking e inauguración. Cerramos idea y stack |
| Mié 4 nov | Construcción |
| **Jue 5 nov, 23:59** | **Fin del desarrollo y de la entrega: presentación o vídeo y repositorio** |
| Vie 6 nov | Revisión de entregables y recepción de finalistas |
| Sáb 7 nov | Final internacional: 5 minutos por proyecto y fallo del jurado |

Cada sede clasifica **como máximo 2 equipos, uno por modalidad**. Para pasar hay que quedar primeros de la modalidad Innovadora en el campus.

## Por confirmar hoy con la sede

Estos datos no se han podido verificar. Las bases se consultaron en la [web de la sede de Arequipa](https://hack4eduarequipa.com/bases/), que puede diferir de la versión de nuestra sede.

1. Si las bases y el calendario son los mismos en nuestro campus, y en qué zona horaria cuenta el cierre de las 23:59.
2. Si este reto está marcado como **«Reto ProFuturo»** en [hack4edu.org](https://hack4edu.org). Si lo está, optamos también al premio transversal de 1.000 €, con su propia rúbrica.
3. Si el entregable es presentación **o** vídeo, porque las bases se contradicen. Prepararemos ambos.
4. Si la inscripción del grupo (coordinador, reto y modalidad) sigue abierta: el plazo publicado terminó el 30 de octubre.
5. Si «Destello» está libre como marca. Una búsqueda rápida no encontró ningún producto educativo con ese nombre, pero no es una comprobación legal.
