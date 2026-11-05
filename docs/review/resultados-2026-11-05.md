# Resultados de la pasada del 2026-11-05

Máquina: portátil de 7,5 GB de RAM, 8 núcleos, sin GPU. Ollama 0.40.14 en Docker, `gemma4:e2b`, contexto de 4.096 tokens. Biblioteca: 8 fichas, ninguna revisada. Comprobado por el agente que construyó la app, **no por un revisor independiente**.

## Mediciones (modelo real)

| Qué | Resultado |
|---|---|
| Plan de 2 sesiones en la interfaz, modelo cargado | 32,3 s y 40,5 s |
| Plan de 1 sesión en la interfaz, modelo cargado | 18,0 s |
| Grabación por script, 16 planes de 1 o 2 sesiones | 19,2–34,0 s |
| Primer plan tras reiniciar el contenedor | 41,1 s. Es un mínimo: el sistema aún tenía el modelo en caché de disco; tras encender el equipo puede tardar más |
| Velocidad en la interfaz | 7,4–17,8 tok/s (medida de punta a punta, incluye la carga si la hay) |
| Salida válida | 21 de 21 planes a la primera, con `json_schema` (3 de la prueba inicial, 16 de la grabación, 2 de la pasada real) |
| Memoria del contenedor | Pico de 5,1 GB. El sistema usó además 1,5 GB de swap, con Chrome y Vite abiertos |

## Comprobaciones

| Escenario | Resultado | Evidencia |
|---|---|---|
| L1 en español e inglés | ✅ | Ficha correcta, sesiones pedidas, citas que se abren, aviso, métricas, 0 peticiones externas |
| L2, 3.º frente a 5.º | ✅ con reservas | Fichas distintas y planes distintos. Ver «Calidad» |
| L3 sin material, otro grado | ✅ | 0 peticiones a `/llm`; ofrece temas u otras fichas sin usarlas |
| L4 sin grado, emojis, salida inválida | ✅ | Pide el grado; 2 peticiones exactas y error amable con salida inválida |
| E1 perfil en demo, con corrección | ✅ | 5 preguntas, aviso, corrección sin llamar al modelo |
| E7 datos de alumnos | ✅ | Ninguno de los 6 términos en el payload |
| E9 modelo caído o etiqueta inexistente | ✅ | Error en español en menos de 1 s, sin bloquearse |
| E10 modo demo | ✅ parcial | Funciona con 0 peticiones externas, **con la red encendida** |
| Clon limpio, demo y build | ✅ | `npm ci`, plan en modo demo y `npm run build` |
| Móvil, 375 px | ✅ | Sin scroll horizontal |
| `typecheck`, `build`, `library:check` | ✅ | 17 casos de búsqueda |

## Sin comprobar

- **Modo avión real**, con el Wi-Fi apagado, ni con el modelo ni en demo. Hay que hacerlo antes de grabar.
- Pulsar «Volver a intentarlo» en la misma página tras recuperar el modelo: el botón está, pero la prueba recargó la página.
- Editar un texto, imprimir y copiar en el navegador.
- Texto de 2.000 caracteres (parte de L4).
- `npm run dev` con modelo real desde un clon limpio siguiendo el README.
- **L5, fidelidad a las fichas**: requiere la lectura de una persona. Esta lista es solo una primera lectura.
- Pruebas con docentes: no se han hecho.
- Contenido de las fichas contra el MINEDU: ninguna revisada; la `url` de varias apunta al repositorio general.

## Calidad: primera lectura de los 8 planes grabados

Son usables como borrador, pero el modelo tiene límites visibles:

- **Cobertura incompleta con una sola sesión.** Los planes de cadenas alimentarias y de estados de la materia se quedan en parte de la ficha: el primero solo trata los productores. Pedir más sesiones ayuda en el ciclo del agua, el único caso probado con 2.
- **Citas dudosas.** Algunas apuntan a una sección relacionada pero no exacta; por ejemplo, una pregunta de cierre citada a «Ideas clave».
- **Frases flojas** como «Observa el experimento…», sin decir quién hace qué.
- **La micro-acción no siempre sugiere comentarla con un colega.** La interfaz lo recuerda con un texto fijo.
- **Materiales:** tras ajustar el prompt, se limitan casi siempre a las fichas; «Mapa grande» y «Tapa fría» salen de ellas.

Para la demo conviene usar los planes del ciclo del agua, que son los más completos, sin presentarlos como representativos de todos.
