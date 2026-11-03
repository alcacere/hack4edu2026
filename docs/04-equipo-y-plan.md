# 04. Equipo y plan

## Tres roles, tres responsables

Los roles se definen por responsabilidad y aún no están asignados a personas. Cada uno tiene la **última palabra** en su área para evitar debates que consuman tiempo.

### Producto y relato

**Decide:** qué entra en el producto, qué se dice en el pitch y qué se recorta.

- Hablar con 2 o 3 docentes y conseguir frases reales y críticas.
- Escribir los retos y su correspondencia curricular, y hacerla revisar.
- Crear los datos sintéticos de la evaluación, junto con IA/Backend.
- Crear presentación y vídeo. Dar el pitch.
- Mantener el modelo de negocio y la lista de objeciones.
- Comprobar los puntos pendientes con la sede.

**Perfil:** quien mejor comunica, aunque sea quien menos programa.

### Experiencia y PWA

**Decide:** todo lo que ve y toca el docente.

- App instalable que funciona en modo avión.
- Clase, nombres y alias en el móvil. Sustitución de nombres en el texto.
- Captura de foto y de voz, y cola de envío.
- Revisión de propuestas, radar de invisibles y tarjeta imprimible.
- Manejar el móvil durante la demo.

**Perfil:** quien tenga más experiencia en frontend.

### IA, backend y evidencia

**Decide:** arquitectura, despliegue y qué cifras se pueden afirmar.

- Servidor, Whisper, Claude y validador antietiqueta.
- Script de evaluación e informe.
- Despliegue con HTTPS y repositorio.
- Contestar las preguntas técnicas del jurado.
- **Tiene derecho de veto sobre cualquier cifra del pitch que no esté medida.**

**Perfil:** quien tenga más experiencia en backend o IA.

## Normas de trabajo

- **Evidencia de autoría:** la modalidad Innovadora exige desarrollar todo entre el 3 y el 5 de noviembre, y [falta de evidencias puede penalizar un 20 %](https://hack4eduarequipa.com/bases/). Hay que hacer commits pequeños y frecuentes desde hoy en un repositorio público, sin código previo.
- **Contrato primero:** fijar hoy el esquema de la API con datos simulados, para que nadie espere a nadie.
- **Sin datos reales de menores:** ni fotos, ni nombres, ni voces en todo el hackathon.
- **Regla de corte:** si algo no funciona tras 2 horas, se simplifica o se recorta.
- **Reuniones:** 10 minutos a las 9:00, 14:00 y 20:00. Qué hay hecho, qué bloquea, qué se recorta.

## Plan

### Martes 3: moldear

| Quién | Tarea | Listo cuando |
|---|---|---|
| Todos | Leer esta documentación, asignar roles, aprobar la idea | Sin objeciones abiertas |
| Producto | Resolver los puntos pendientes con la sede. Contactar con docentes | Dudas contestadas, 2 entrevistas agendadas |
| IA/Backend | Crear repositorio, licencia y API simulada desplegada | La URL pública responde con HTTPS |
| PWA | Esqueleto instalable que abre en modo avión | Funciona en un móvil real |

### Miércoles 4: construir la columna vertebral

| Quién | Tarea | Listo cuando |
|---|---|---|
| IA/Backend | Whisper, Claude y validador reales | Una nota real genera una propuesta válida |
| PWA | Foto, voz, cola, envío y revisión | Flujo completo en modo avión y al reconectar |
| Producto | Entrevistas, retos YAML, datos sintéticos, primer guion | 30 casos listos y frases de docentes |

**Punto de control a las 20:00:** la demo principal tiene que funcionar de principio a fin en un móvil real. Si no, se recorta todo lo no esencial.

### Jueves 5: pulir y entregar

| Hora | Tarea |
|---|---|
| Mañana | Radar de invisibles, repregunta, tarjeta imprimible, pulido |
| 12:00 | **Congelación de funciones.** Después solo se arreglan errores |
| 13:00 | Ejecutar la evaluación y pasar las cifras reales al pitch |
| 15:00 | Grabar el vídeo de 3 minutos y el de respaldo de la demo |
| 18:00 | Ensayos de pitch cronometrados, mínimo 3 |
| **20:00** | **Entrega interna completa** |
| 21:00 | Subir materiales y comprobar los enlaces desde otro dispositivo |
| 23:59 | Cierre oficial. No debemos llegar hasta aquí |

### Viernes 6 y sábado 7: final, si pasamos

- **Viernes:** arreglar errores que no alteren la versión entregada, ensayar con preguntas hostiles y comprobar el entorno de la final. Preguntar a la organización si los cambios posteriores a la entrega están permitidos antes de hacer ninguno.
- **Sábado:** prueba técnica una hora antes, móvil cargado y conexión de reserva.

## Plan B de la demo

| Nivel | Situación | Qué hacemos |
|---|---|---|
| A | Todo funciona | Demo en directo |
| B | Falla la red | Datos móviles del segundo teléfono |
| C | Falla la API | **Modo demo con respuesta guardada, y decirlo en voz alta** |
| D | Falla el móvil o la pantalla | Vídeo de respaldo, y decirlo en voz alta |

Las respuestas grabadas tienen que ser reales y estar identificadas como grabadas. Hacer pasar una demo grabada por directa nos expone a una descalificación moral aunque no sea técnica, y contradice todo lo que defendemos.

## Riesgos principales

| Riesgo | Probabilidad | Mitigación |
|---|---|---|
| Faltan 2 días y no 4 | Segura | Alcance recortado y congelación el jueves a las 12:00 |
| Whisper lento en CPU | Media | Modelo más pequeño o servidor mayor; probarlo hoy |
| Cámara y audio distintos entre móviles | Media | Probar hoy en un Android y un iPhone. Demo en el que mejor funcione |
| Sin acceso a docentes a tiempo | Media | Contactos personales desde hoy. Si no hay, se dice que está pendiente |
| Sin crédito de API | Baja | Comprobar la clave y el saldo hoy, con límite de gasto |
| Presentación desbordada | Media | Tres ensayos y recortar antes de superar 4:45 |
