# Biblioteca de Ceiba

Cada fichero de `fichas/` es una **ficha**: un resumen listo para preparar clase sobre un tema y un grado, no un libro ni un PDF. Ceiba busca en estas fichas y redacta el plan solo con su contenido.

## Añadir una ficha

1. Copia una ficha parecida en `fichas/<área>/<grado>-<tema>.md`.
2. Rellena la cabecera:
   - `id`: único.
   - `grado`: de 1 a 6. La búsqueda filtra por este número de forma estricta.
   - `area`, `tema`.
   - `alias`: otras formas de pedirlo, también en otros idiomas (`water cycle`).
   - `competencia`, `fuente` (documento y página) y `url`.
   - `revisado`: `true` solo si una persona la ha contrastado con la fuente.
3. Escribe las 5 secciones, con tus palabras y sin copiar texto de la fuente: `Qué debe lograr`, `Ideas clave`, `Errores frecuentes`, `Actividades sin tecnología`, `Cómo comprobar lo aprendido`.
4. Comprueba y añade casos a `scripts/check-library.ts`: `npm run library:check`.
5. Si quieres que funcione en el modo demo: `npm run record:plan`.

Cada ficha debe ocupar unos 1.500–2.000 caracteres: el modelo la recibe entera y la máquina es modesta.

## Estado del contenido

Las fichas son un **borrador de demostración**, escrito durante el hackathon (noviembre de 2026) y basado en el Currículo Nacional de la Educación Básica del Perú. **Ninguna está revisada todavía**: las competencias, los documentos y las páginas citados deben contrastarse con las publicaciones oficiales del MINEDU. No son material oficial del MINEDU.

Licencia del contenido de esta carpeta: [CC BY-NC-SA 3.0](https://creativecommons.org/licenses/by-nc-sa/3.0/deed.es_ES).
