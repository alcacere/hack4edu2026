# Kit de operaciones — agentes OpenClaw + GitHub como memoria

Kit en la raíz del repo `alcacere/hack4edu2026`. Bases oficiales: `hack4edu_2026_Bases_de_participacion.md`.

```
docs/PROTOCOLO.md            Reglas de comunicación por issues (todos los agentes lo leen)
docs/STATE.md                Resumen vivo del proyecto (lo mantiene el coordinator)
openclaw/agents/*/AGENTS.md  Prompt de cada agente, versionado en git
openclaw/openclaw.example.json  Config de OpenClaw sin secretos
.github/ISSUE_TEMPLATE/      Plantilla de tarea
scripts/setup-github.sh      Crea las labels
scripts/setup-openclaw.sh    Clona el repo en cada workspace y enlaza los AGENTS.md
scripts/new-machine.sh       Retomar en otro ordenador
```

## Primera vez (≈15 min)

1. **Repo:** ya existe y es público: `alcacere/hack4edu2026`. Cada humano que lance agentes necesita permiso de escritura (`gh api repos/alcacere/hack4edu2026 --jq .permissions.push` → `true`).
2. **Autenticación de gh.** Lo ideal es un token *fine-grained* limitado a este repo (Contents RW, Issues RW, Metadata R), pero GitHub solo deja crearlo al dueño (alcacere). Si es tu máquina y no eres alcacere: `gh auth login` normal, y recuerda que los agentes podrán tocar tus otros repos (los prompts lo prohíben).
   Con token: `gh auth login --with-token < token.txt && rm token.txt`
3. Clona el repo: `gh repo clone alcacere/hack4edu2026`.
4. Labels: `bash scripts/setup-github.sh`
5. Conectar agentes: `REPO=alcacere/hack4edu2026 bash scripts/setup-openclaw.sh`
6. Cambios en tu `openclaw.json` actual (o usa la plantilla):
   - `agents.defaults.memory.search.provider: "none"` (quita el aviso de OpenAI)
   - `coordinator.subagents.allowAgents` incluye `builder`
   - `reviewer.tools`: `allow: ["read","exec"]`, `deny: ["edit","apply_patch"]` (necesita `exec` para `gh`)
   - `builder`: sin `sandbox` (necesita las credenciales de `gh` y red)
7. `openclaw doctor --fix` y arranca `openclaw gateway`.
8. En el chat del **coordinator**: *"Lee docs/PROTOCOLO.md y docs/STATE.md, crea el backlog inicial en issues y lanza B1."*

## Retomar desde otro ordenador
```bash
REPO=alcacere/hack4edu2026 bash new-machine.sh
```
Después: `openclaw gateway` y al coordinator: *"Retoma desde docs/STATE.md y los issues abiertos."*
Las conversaciones antiguas no viajan; todo lo importante está en issues y STATE.md.

## El repo es público
Los issues, comentarios y commits son visibles para cualquiera desde ya. Revisa periódicamente con `gh issue list --state all` y `git log -p | grep -iE "token|key|password|@"` que no haya secretos ni datos personales.
