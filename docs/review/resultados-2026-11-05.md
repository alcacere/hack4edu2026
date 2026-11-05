# Resultados de la pasada del 2026-11-05

Máquina: portátil de 7,5 GB de RAM, 8 núcleos, sin GPU. Ollama 0.40.14 en Docker, `gemma4:e2b`, contexto de 4.096 tokens. Biblioteca: 8 fichas curadas y 170 temas con artículos de Vikidia y Wikipedia, nada revisado. Comprobado por el agente que construyó la app, **no por un revisor independiente**.

## Mediciones (modelo real)

| Qué | Resultado |
|---|---|
| Plan de 2 sesiones en la interfaz, modelo cargado | 23,4–42,0 s |
| Plan de 1 sesión en la interfaz, modelo cargado | 18,0–31,4 s |
| Grabación por script, 44 planes de 1 o 2 sesiones | 19,1–46,7 s |
| Primer plan tras reiniciar el contenedor | 41,1 s. Es un mínimo: el sistema aún tenía el modelo en caché de disco; tras encender el equipo puede tardar más |
| Velocidad en la interfaz | 7,4–17,8 tok/s (medida de punta a punta, incluye la carga si la hay) |
| Salida válida | 47 de 47 planes por script a la primera, con `json_schema`. En la interfaz, ningún fallo y ningún reintento en las métricas leídas |
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
| Móvil, 375 px | ✅ | Sin scroll horizontal, con ancho real emulado |
| Editar y copiar | ✅ | El texto editado aparece en lo copiado, sin los controles |
| Imprimir | ✅ | Una sola página en PDF para el plan de 2 sesiones del ciclo del agua; incluye el aviso y la fuente. Otros planes más largos podrían ocupar más |
| Indicador de conexión | ✅ | Cambia al cortar la red del navegador (emulado) |
| `typecheck`, `build`, `library:check` | ✅ | 17 casos de búsqueda |

| Temas descargados | ✅ | Fotosíntesis, volcanes (pedido en inglés), incas y multiplicación con el modelo real; las actividades propias salen marcadas |
| «Otra versión» | ✅ | Otro enfoque y otros pasos, probado en fotosíntesis y ciclo del agua |
| Prioridad de lo curado | ✅ | El ciclo del agua de 5.º usa la ficha curada, no el artículo |

## Sin comprobar

- **Modo avión real**, con el Wi-Fi apagado, ni con el modelo ni en demo. Hay que hacerlo antes de grabar.
- Pulsar «Volver a intentarlo» en la misma página tras recuperar el modelo: el botón está, pero la prueba recargó la página.
- Texto de 2.000 caracteres (parte de L4).
- `npm run dev` con modelo real desde un clon limpio siguiendo el README.
- **L5, fidelidad a las fichas**: requiere la lectura de una persona. Esta lista es solo una primera lectura.
- Pruebas con docentes: no se han hecho.
- Contenido de las fichas contra el MINEDU: ninguna revisada; la `url` de varias apunta al repositorio general.

## Calidad de los planes con artículos

Por decisión del equipo, en esta fase importa la cantidad y la variedad, y la calidad se revisa después. Lo que ya se ve en la primera lectura:

- **Contenido sin revisar.** Los artículos pueden tener errores. El de Vikidia sobre cadenas alimentarias dice que las plantas están «al final de la cadena», lo que parece invertido.
- **A veces demasiado difícil para el grado.** Un plan de fotosíntesis para 5.º pedía diferenciar reacciones «biofísicas y bioquímicas».
- **El enfoque se nota poco** en algunos planes: uno con enfoque «jugar» propuso sobre todo una clasificación.
- **Cobertura parcial:** suele quedarse en parte del tema.
- **El mapa de temas por grado** es propio y no se ha contrastado con el currículo oficial.

## Calidad: primera lectura de los 8 planes con fichas curadas

Son usables como borrador, pero el modelo tiene límites visibles:

- **Cobertura incompleta con una sola sesión.** Los planes de cadenas alimentarias y de estados de la materia se quedan en parte de la ficha: el primero solo trata los productores. Pedir más sesiones ayuda en el ciclo del agua, el único caso probado con 2.
- **Citas dudosas.** Algunas apuntan a una sección relacionada pero no exacta; por ejemplo, una pregunta de cierre citada a «Ideas clave».
- **Frases flojas** como «Observa el experimento…», sin decir quién hace qué.
- **La micro-acción no siempre sugiere comentarla con un colega.** La interfaz lo recuerda con un texto fijo.
- **Materiales:** tras ajustar el prompt, se limitan casi siempre a las fichas; «Mapa grande» y «Tapa fría» salen de ellas.

Para la demo conviene usar los planes del ciclo del agua, que son los más completos, sin presentarlos como representativos de todos.
