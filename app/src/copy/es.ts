/**
 * Textos de interfaz en español (issue #8). Zona del writer.
 *
 * - Tono: `app/src/copy/persona.md` (cercano, práctico, trata de tú, sin jerga).
 * - Modelo único (Gemma 4): no hay textos de selector de modelo.
 * - Los textos con datos variables son funciones pequeñas.
 * - Si el nombre del mentor cambia, se cambia solo en `mentorName`.
 * - Los errores tienen dos partes: `docente` (qué pasó y qué hacer, sin tecnicismos)
 *   y `tecnico` (para quien instala la app; se puede mostrar plegado).
 */

export const mentorName = 'Ceiba' // provisional hasta que lo confirme un humano (#4)

export type NivelCodigo = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'

export const es = {
  app: {
    titulo: `${mentorName} · planes de estudio sin internet`,
    lema: 'Planes de estudio para primaria, sin internet',
    conRed: 'Todo se queda en este ordenador',
    sinRed: 'Sin internet: funciona igual',
    modeloLocal: 'Modelo local',
    pie: 'Prototipo Hack4Edu 2026 · Reto 12 · Licencia MIT. Basado en el Currículo Nacional del Perú; no es un material oficial. Ceiba propone: decides tú.',
  },

  comun: {
    enviar: 'Enviar',
    siguiente: 'Siguiente',
    anterior: 'Anterior',
    saltar: 'Saltar esta pregunta',
    cancelar: 'Cancelar',
    reintentar: 'Volver a intentarlo',
    volverInicio: 'Volver al inicio',
    empezarDeNuevo: 'Empezar de nuevo',
    pensando: `${mentorName} está pensando…`,
    pensandoLento: 'Está tardando más de lo normal. Puedes esperar o cancelar.',
    aceptar: 'Aceptar',
    editar: 'Editar',
    descartar: 'Descartar',
    guardarCambios: 'Guardar cambios',
    deshacer: 'Deshacer',
    estado: {
      aceptada: 'Aceptada',
      editada: 'Editada por ti',
      descartada: 'Descartada',
      pendiente: 'Sin decidir',
    },
    campoObligatorio: 'Falta este dato.',
    copiar: 'Copiar',
    copiado: 'Copiado',
  },

  bienvenida: {
    titulo: `Hola, soy ${mentorName}`,
    texto:
      'Soy un compañero para preparar y pensar tus clases. Tú decides; yo propongo. ¿Por dónde empezamos?',
    opcionPerfil: 'Conocernos (5 preguntas)',
    opcionPerfilAyuda: 'Unos 2 minutos. Sirve para que mis ideas se ajusten a ti.',
    opcionPlan: 'Planificar una clase',
    opcionPlanAyuda: 'Me cuentas la clase y te propongo un borrador.',
    opcionReflexion: 'Pensar en una clase que ya di',
    opcionReflexionAyuda: 'Te hago unas preguntas y elegimos un paso para la semana.',
    sinPerfilAviso:
      'Puedes empezar sin hacer las 5 preguntas. Mis ideas serán más generales hasta que te conozca un poco.',
  },

  perfil: {
    titulo: 'Conocernos',
    intro:
      'Son 5 preguntas cortas sobre lo que hiciste el último mes. No es un examen: no hay respuestas buenas ni malas.',
    introSaltar: 'Si una pregunta no encaja con tu escuela, sáltala.',
    progreso: (n: number, total: number) => `Pregunta ${n} de ${total}`,
    // Preguntas y opciones: docs/research/brief-v1.md §1 (tabla de 5 preguntas). Opciones de 0 a 4 puntos.
    preguntas: [
      {
        id: 'contenidos',
        texto: 'El último mes, ¿qué hiciste con materiales digitales (un vídeo, una ficha, una app)?',
        opciones: [
          'No usé ninguno',
          'Usé uno tal cual',
          'Adapté uno a mi grupo',
          'Elegí entre varios con un criterio',
          'Creé uno y lo compartí con colegas',
        ],
      },
      {
        id: 'ensenanza',
        texto: 'El último mes, ¿para qué usaste la tecnología dentro de clase?',
        opciones: [
          'No la usé',
          'La usé yo para mostrar algo',
          'Mis alumnos la usaron en una actividad',
          'La elegí según el objetivo y la ajusté después',
          'Rediseñé una actividad que sin ella no era posible y miré el resultado',
        ],
      },
      {
        id: 'evaluacion',
        texto: 'El último mes, ¿cómo supiste qué habían aprendido tus alumnos?',
        opciones: [
          'Solo con examen en papel',
          'Probé un cuestionario digital',
          'Uso herramientas digitales con regularidad para comprobarlo',
          'Uso lo que veo en esas herramientas para dar indicaciones y adaptar la clase',
          'Reviso con espíritu crítico cómo evalúo con tecnología',
        ],
      },
      {
        id: 'alumnado',
        texto: 'El último mes, ¿qué hicieron tus alumnos con la tecnología?',
        opciones: [
          'Nada',
          'Consultaron algo que les indiqué',
          'Colaboraron o crearon algo sencillo',
          'Trabajaron a distinto ritmo, con apoyo para quien tiene menos acceso',
          'Les enseñé a contrastar fuentes o a usar la IA con criterio',
        ],
      },
      {
        id: 'compromiso',
        texto: 'El último mes, ¿aprendiste o compartiste algo sobre tecnología en educación?',
        opciones: [
          'No',
          'Busqué algo puntual',
          'Probé algo que vi en un curso o a un colega',
          'Pensé en lo que funcionó y lo cambié',
          'Formé o acompañé a otros colegas',
        ],
      },
    ],
    verResultado: 'Ver mi punto de partida',
    calculando: 'Preparando tu punto de partida…',

    // Resultado (DECISIÓN en #4 y #6): nombre en llano + código opcional + aviso + control para corregir.
    resultadoTitulo: 'Tu punto de partida',
    // Nombres: traducción oficial INTEF que usa el brief §1. Resumen: frase propia en llano basada en la tabla del brief.
    niveles: {
      A1: { nombre: 'Novel', resumen: 'Usas la tecnología sobre todo para preparar, organizarte y comunicarte, menos dentro del aula.' },
      A2: { nombre: 'Explorador', resumen: 'Ya has probado la tecnología en algunas cosas y estás viendo qué te sirve.' },
      B1: { nombre: 'Integrador', resumen: 'Usas la tecnología en muchas situaciones y ahora toca ver qué funciona mejor y cuándo.' },
      B2: { nombre: 'Experto', resumen: 'Eliges herramientas con criterio según lo que quieres conseguir y te atreves a probar.' },
      C1: { nombre: 'Líder', resumen: 'Tienes un enfoque completo, revisas tu práctica y ayudas a otros colegas.' },
      C2: { nombre: 'Pionero', resumen: 'Cuestionas lo de siempre y buscas formas nuevas de enseñar.' },
    } satisfies Record<NivelCodigo, { nombre: string; resumen: string }>,
    codigoOpcional: (codigo: NivelCodigo) => `${codigo} en el marco europeo DigCompEdu`,
    areaInicio: (area: string) => `Por dónde empezar: ${area}.`,
    areas: {
      contenidos: 'materiales digitales',
      ensenanza: 'la tecnología dentro de clase',
      evaluacion: 'saber qué han aprendido tus alumnos',
      alumnado: 'lo que hacen tus alumnos con la tecnología',
      compromiso: 'aprender y compartir con colegas',
    },
    avisoOrientativo: 'Es un punto de partida orientativo. No es una nota ni una evaluación.',
    avisoUso: 'Solo lo uso para elegir ideas que te sirvan. No sale de este navegador y se borra al cerrar la pestaña.',
    corregirBoton: 'No me reconozco: cambiar',
    corregirTitulo: 'Elige el punto de partida que mejor te describe',
    corregirAyuda: 'Tú te conoces mejor que cinco preguntas. Usaré el que elijas.',
    corregidoConfirmacion: (nombre: string) => `Hecho. Uso «${nombre}» a partir de ahora.`,
    corregidoEtiqueta: 'Corregido por ti',
    continuarPlan: 'Planificar una clase',
    continuarReflexion: 'Pensar en una clase que ya di',
  },

  plan: {
    pedidoEtiqueta: '¿Qué plan necesitas?',
    temasBiblioteca: 'O empieza por un tema de la biblioteca',
    duracion: (ses: number, min: number) => `${ses} ${ses === 1 ? 'sesión' : 'sesiones'} de ${min} min`,
    cambiarPedido: 'Cambiar',
    pasoEntendido: 'Pedido entendido',
    pasoFicha: (tema: string) => `Ficha encontrada: ${tema}`,
    basadoEn: 'Basado en',
    pedidoEjemplo: 'Ej.: plan de estudio para 5.º de primaria sobre el ciclo del agua, 2 sesiones de 45 minutos',
    gradoEtiqueta: 'Grado',
    gradoElegir: 'Elige…',
    gradoNombre: (g: number) => `${g}.º de primaria`,
    temaEtiqueta: 'Tema',
    sesionesEtiqueta: 'Sesiones',
    minutosEtiqueta: 'Minutos por sesión',
    sinDispositivos: 'El alumnado no tiene dispositivos ni internet',
    faltaGrado: '¿Para qué grado es? Elígelo arriba y vuelve a pulsar «Preparar plan».',
    sinMaterial: (g: number) => `No tengo material sobre este tema para ${g}.º de primaria.`,
    sinMaterialAyuda: 'Prefiero decírtelo antes que inventarme un plan. No se ha generado nada.',
    otrosGrados: (g: number) => `Sí lo tengo en otro grado. Puedes usarlo como base para ${g}.º, sabiendo que no está pensado para ese grado:`,
    usarFichaDe: (g: number, tema: string) => `Usar la ficha de ${g}.º: ${tema}`,
    temasDisponibles: (g: number) => `Lo que tengo para ${g}.º de primaria:`,
    fuentesTitulo: 'Basado en estas fichas de la biblioteca',
    fichaDeOtroGrado: (fichaG: number, g: number) => `Ficha de ${fichaG}.º usada como base para ${g}.º, por elección tuya.`,
    sinRevisar: 'Pendiente de revisión docente',
    avisoBorrador: 'Borrador sin validar, generado por una IA a partir de la biblioteca. Revísalo antes de usarlo en clase.',
    editableAyuda: 'Puedes cambiar cualquier texto pulsando sobre él. Abre la etiqueta de un paso para ver en qué parte de la ficha se apoya.',
    objetivo: 'Objetivo',
    sesionNumero: (n: number) => `Sesión ${n}`,
    materiales: 'Materiales',
    comprobacion: 'Cómo comprobar lo aprendido',
    imprimir: 'Imprimir',
    titulo: 'Planificar una clase',
    intro: 'Cuéntame la clase. Con estos datos te propongo un borrador que puedes cambiar todo lo que quieras.',
    campos: {
      etapa: { etiqueta: 'Curso o etapa', ejemplo: 'Ej.: 3.º de primaria' },
      asignatura: { etiqueta: 'Asignatura', ejemplo: 'Ej.: Matemáticas' },
      objetivo: { etiqueta: '¿Qué quieres que aprendan?', ejemplo: 'Ej.: que entiendan las fracciones como partes de un todo' },
      tiempo: { etiqueta: '¿Cuánto tiempo tienes?', ejemplo: 'Ej.: 50 minutos' },
      recursos: {
        etiqueta: '¿Con qué cuentas en el aula? (opcional)',
        ejemplo: 'Ej.: pizarra y un móvil sin internet. Si no hay nada, también vale.',
      },
    },
    avisoDatosAlumnos: 'No hace falta escribir nombres ni datos de tus alumnos. Con «un alumno» o «parte del grupo» basta.',
    generar: 'Preparar plan',
    generando: 'Redactando el plan en este ordenador…',
    bloques: {
      plan: 'Plan de la clase',
      tecnologia: 'Idea con tecnología (opcional)',
      microaccion: 'Tu micro-acción para esta semana',
    },
    minutos: (n: number) => `${n} min`,
    tecnologiaAyuda: 'Si no te convence, la clase funciona sin ella.',
    sinTecnologia: 'Esta vez no propongo tecnología: no veo que aporte en esta clase.',
    microaccionPregunta: '¿Te parece realista o la hacemos más pequeña?',
    microaccionMasPequena: 'Hazla más pequeña',
    otraIdea: 'Otra idea con tecnología',
    nivelUsado: (nombre: string) => `Ajustado a tu punto de partida: ${nombre}.`,
    sinNivel: 'Ideas generales: aún no has respondido las 5 preguntas.',
    consultarColega: 'Una idea: enséñale este plan a un colega antes de usarlo. Dos miradas ven más que una.',
  },

  reflexion: {
    titulo: 'Pensar en una clase que ya di',
    intro: 'No vengo a juzgar la clase. Te haré unas preguntas y al final elegimos un paso para la semana.',
    preguntas: [
      '¿Qué pasó en la clase que te gustaría repetir?',
      '¿Hubo un momento en que algo no salió como esperabas? ¿Qué crees que lo provocó?',
      'Si pudieras cambiar una sola cosa, ¿cuál sería?',
    ],
    respuestaEjemplo: 'Escribe con tus palabras. No hace falta que sea largo.',
    avisoDatosAlumnos: 'No escribas nombres ni datos de tus alumnos. Con «un alumno» o «parte del grupo» basta.',
    cerrar: 'Elegir mi paso para la semana',
    microaccionTitulo: 'Tu micro-acción para esta semana',
    microaccionPregunta: 'Si no encaja, buscamos otra.',
    otraMicroaccion: 'Proponme otra',
  },

  avisos: {
    borrador: 'Esto es un borrador generado por una IA. Revísalo antes de usarlo en clase.',
    decides: 'Yo propongo. Decides tú.',
    privacidad:
      'Todo se queda en este ordenador: funciona sin internet y no guarda nada al cerrar la página.',
    privacidadDemo: 'Modo demo: las respuestas están grabadas de antemano. No se usa el modelo ni internet.',
    limites:
      'Soy una IA: puedo equivocarme y no conozco tu escuela ni a tus alumnos. No doy consejo legal, médico ni psicológico. Para temas delicados, habla con un colega, la dirección o tu mentor.',
    derivar: 'Esto merece hablarlo con alguien que conozca tu escuela. ¿Tienes un colega o un mentor con quien comentarlo?',
    incertidumbre: 'No estoy seguro. Compruébalo con tu experiencia o con un colega.',
    datosAlumnosDetectados: 'He visto lo que parece un nombre o un dato de un alumno. No lo necesito: puedes quitarlo y seguimos.',
  },

  demo: {
    insignia: 'Modo demo: respuestas grabadas, sin modelo ni red',
    explicacion: 'Estás viendo una demostración con respuestas preparadas. Para usar el mentor de verdad, abre la app sin «?demo=1».',
    sinRespuestaGrabada: 'En el modo demo aún no hay una respuesta preparada para esto. Prueba otro paso de la demo.',
    origen: 'Respuesta grabada',
  },

  metricas: {
    modelo: 'Modelo',
    latencia: 'Tiempo de respuesta',
    tokensPorSegundo: 'Velocidad (tokens/s)',
    sinDato: '—',
    ayuda: 'Datos técnicos para quien instala la app. Puedes ignorarlos.',
  },

  // Claves alineadas con AIErrorCode de ai/types.ts, más `invalida` (salida no válida tras el reintento).
  errores: {
    titulo: 'No he podido responder',
    unreachable: {
      docente: 'No consigo ponerme en marcha en este ordenador. No es culpa tuya. Vuelve a intentarlo en un momento; si sigue igual, avisa a quien instaló la app o abre la demo grabada.',
      tecnico: 'El modelo local no responde. Comprueba que el contenedor de Ollama está en marcha y que el modelo Gemma 4 está descargado.',
    },
    timeout: {
      docente: 'Estoy tardando demasiado y he parado. La primera respuesta del día puede ser lenta. Vuelve a intentarlo; la siguiente suele ir más rápida.',
      tecnico: (segundos: number) => `Se superó el tiempo máximo de espera (${segundos} s). Puede ser la carga en frío del modelo.`,
    },
    http: {
      docente: 'Algo ha fallado al preparar la respuesta. No es culpa tuya. Vuelve a intentarlo.',
      tecnico: (estado: number) => `El servidor del modelo devolvió un error (${estado}).`,
    },
    empty: {
      docente: 'Me he quedado sin respuesta esta vez. Vuelve a intentarlo, o cuéntamelo con otras palabras.',
      tecnico: 'El modelo devolvió una respuesta vacía.',
    },
    invalida: {
      docente: 'Mi respuesta ha salido desordenada y no te la quiero enseñar así. Vuelve a intentarlo.',
      tecnico: 'La salida no cumplía el formato esperado, ni siquiera tras un reintento.',
    },
    fixture: {
      docente: 'En el modo demo aún no hay una respuesta preparada para esto. Prueba otro paso de la demo.',
      tecnico: 'No existe fixture para este flujo en fixtures/.',
    },
    desconocido: {
      docente: 'Ha pasado algo inesperado. No es culpa tuya. Vuelve a intentarlo.',
      tecnico: 'Error no clasificado.',
    },
    abrirDemo: 'Abrir la demo grabada',
    verDetalle: 'Detalle técnico',
  },

  vacio: {
    sinConversacion: 'Aún no hemos empezado. Elige una opción arriba.',
    sinPlan: 'Cuando rellenes los datos de la clase, el borrador aparecerá aquí.',
  },
} as const

export type Copy = typeof es
