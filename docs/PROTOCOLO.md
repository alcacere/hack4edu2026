# Protocolo de trabajo de los agentes (fuente de verdad)

Este fichero lo leen TODOS los agentes al empezar cada sesión. Si algo de tu AGENTS.md contradice este protocolo, manda este protocolo.

## 0. Documentos de referencia
- **Bases oficiales:** `hack4edu_2026_Bases_de_participacion.md` (raíz del repo) — plazos, entregables, licencias y criterios de evaluación. Si algo choca con las bases, mandan las bases.
- **Estado del proyecto:** `docs/STATE.md`.
- **Investigación de los 29 retos:** `docs/research/informe-retos-hack4edu.md`.
- **Prompts de los agentes:** `openclaw/agents/<agente>/AGENTS.md`. **Montaje:** `docs/OPS.md`.

## 1. La memoria es GitHub, no tu cabeza
- **Fuente de verdad:** los Issues de este repo + `docs/STATE.md`.
- Tu carpeta `memory/` local es solo borrador. Lo que no está en un issue o en `STATE.md` **no existe**: otro ordenador u otra sesión no lo verá.
- Escribe siempre pensando que mañana te sustituye otra instancia sin contexto: frases completas, enlaces a commits y ficheros, nada de "lo de antes".

## 2. Al empezar CUALQUIER sesión (en este orden)
```bash
cd repo && git pull --rebase
cat docs/STATE.md
gh issue list --state open --label "agent:<tu-id>" --limit 50
gh issue list --state open --label "status:doing" --limit 50
```
Después lee los últimos comentarios de tus issues en `status:doing` (`gh issue view <n> --comments`). Retoma desde el último comentario `HANDOFF:` si existe.

## 3. Ciclo de vida de una tarea
| Paso | Quién | Qué hace en GitHub |
|---|---|---|
| Crear | coordinator (o cualquiera si detecta trabajo nuevo) | `gh issue create` con la plantilla, labels `status:todo`, `agent:<x>`, `block:Bn`, `prio:pN`, `type:<t>` |
| Empezar | el agente asignado | cambia a `status:doing` y comenta `EMPIEZO:` + plan de 3–6 pasos |
| Avanzar | el agente | comenta al menos en cada hito o cada hora: qué hizo, commit, qué sigue |
| Entregar | el agente | comenta `ENTREGA:` con el formato de abajo y cambia a `status:review` |
| Revisar | reviewer | `APROBADO:` → cierra el issue. `RECHAZADO:` → lista de fallos y vuelve a `status:doing` |
| Bloquear | cualquiera | label `status:blocked` (+ `needs-human` si decide un humano) y comentario `BLOQUEO:` con 2 alternativas |

Cambiar labels:
```bash
gh issue edit <n> --remove-label "status:todo" --add-label "status:doing"
```

### Formato de `ENTREGA:`
```
ENTREGA:
- Hecho: …
- Cómo verlo: comando / URL / fichero + pasos
- Commits: <hash corto> …
- Riesgos / pendientes: …
- Siguiente sugerido: …
```

## 4. Comunicación entre agentes
- **Todo mensaje entre agentes va en un comentario de issue**, nunca solo por chat o delegación. Si el coordinator te delega por `sessions_spawn`, el resultado igualmente se deja en el issue.
- Encabeza con `PARA: <agente>` cuando el comentario va dirigido a alguien.
- Decisiones: comentario que empiece por `DECISIÓN:` (qué, por qué, quién la tomó). El coordinator las copia a `STATE.md`.
- Pregunta para humanos: label `needs-human` + comentario `PREGUNTA HUMANO:` con opciones cerradas.

## 5. Antes de parar (o si te quedas sin contexto/tokens)
Comenta en cada issue que tengas en `status:doing`:
```
HANDOFF:
- Estado exacto: …
- Ficheros tocados: …
- Lo siguiente que haría: …
- Trampas / cosas raras: …
```
Haz commit y push de lo que tengas aunque esté a medias (en rama si rompe `main`).

## 6. Git
- Cada agente trabaja en su propio clon (`<workspace>/repo`). Siempre `git pull --rebase` antes de `git push`. **Nunca** `--force` en `main`.
- Zonas por agente para evitar conflictos:
  - builder → todo lo de la app (`app/`, `ai/`, `fixtures/`, `scripts/`, config)
  - researcher → `docs/research/`
  - writer → `docs/pitch/`, textos de interfaz en `app/src/copy/` (y `README.md` al final)
  - reviewer → `docs/review/` (escenarios y resultados). No toca código.
  - coordinator → `docs/STATE.md`, `docs/PROTOCOLO.md`, `openclaw/`
- Mensaje de commit: `[<agente>] descripción breve (refs #<n>)`. No uses `Closes #n`: cierra el reviewer.

## 7. Seguridad (el repo y sus issues YA SON PÚBLICOS)
- Nunca escribas en issues, commits o ficheros: tokens, claves, contraseñas, `openclaw.json` real, emails o datos personales de nadie, ni datos de docentes de las pruebas (usa "Docente A/B/C").
- Datos de demo: 100 % sintéticos.
- No instales dependencias ni skills que no hayas revisado.

## 8. Labels
- `status:todo` · `status:doing` · `status:review` · `status:blocked`
- `agent:coordinator` · `agent:builder` · `agent:researcher` · `agent:writer` · `agent:reviewer`
- `block:B1` … `block:B8`
- `type:feat` · `type:bug` · `type:research` · `type:doc` · `type:test`
- `prio:p0` (bloquea la demo) · `prio:p1` · `prio:p2`
- `needs-human`
