# Biblioteca de Ceiba

Dos tipos de contenido, ambos locales: la app no consulta internet.

- **Temas descargados:** `temas.json` dice qué temas tocan en cada grado y `articulos.json` guarda el texto de artículos de Vikidia y Wikipedia, con su revisión y licencia. Se generan con `npm run library:build`, una sola vez; lo ya descargado no se vuelve a pedir. Créditos: `ATRIBUCIONES.md`.
- **Fichas curadas:** los ficheros de `fichas/`, escritos para enseñar, con actividades y errores frecuentes. Si hay una para el tema y el grado, se usa antes que el artículo.

## Añadir un tema descargado

Añade una entrada a `temas.json` (`area`, `tema`, `grados`, `articulo` y `alias`), ejecuta `npm run library:build` y comprueba con `npm run library:check`.

## Añadir una ficha curada

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

**Nada está revisado todavía.** El mapa de temas por grado y las fichas curadas son un borrador de demostración escrito durante el hackathon (noviembre de 2026), orientado al Currículo Nacional del Perú pero sin contrastar con el documento oficial del MINEDU. Vikidia y Wikipedia son obras abiertas que cualquiera puede editar y pueden contener errores. Nada de esto es material oficial.

## Licencia

Todo el contenido de esta carpeta se distribuye bajo [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/deed.es), salvo los artículos de Vikidia, que conservan [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/deed.es) como su original. Los artículos están recortados y troceados respecto al original.
