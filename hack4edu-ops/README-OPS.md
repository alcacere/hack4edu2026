# Kit de operaciones — agentes OpenClaw + GitHub como memoria

Copia todo este contenido en la raíz del repo del proyecto y haz commit.

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

1. **Repo privado en GitHub** (lo creáis vosotros): `gh repo create <usuario>/hack4edu-mentor --private`
2. **Autenticación de gh** con un token *fine-grained* limitado a ESE repo (Contents RW, Issues RW, Metadata R). Así los agentes no pueden tocar el resto de tus repos.
   `gh auth login --with-token < token.txt && rm token.txt`
3. Copia este kit al repo, `git add -A && git commit -m "[humano] kit de operaciones" && git push`.
4. Labels: `bash scripts/setup-github.sh`
5. Conectar agentes: `REPO=<usuario>/hack4edu-mentor bash scripts/setup-openclaw.sh`
6. Cambios en tu `openclaw.json` actual (o usa la plantilla):
   - `agents.defaults.memory.search.provider: "none"` (quita el aviso de OpenAI)
   - `coordinator.subagents.allowAgents` incluye `builder`
   - `reviewer.tools`: `allow: ["read","exec"]`, `deny: ["edit","apply_patch"]` (necesita `exec` para `gh`)
   - `builder`: sin `sandbox` (necesita las credenciales de `gh` y red)
7. `openclaw doctor --fix` y arranca `openclaw gateway`.
8. En el chat del **coordinator**: *"Lee docs/PROTOCOLO.md y docs/STATE.md, crea el backlog inicial en issues y lanza B1."*

## Retomar desde otro ordenador
```bash
REPO=<usuario>/hack4edu-mentor bash new-machine.sh
```
Después: `openclaw gateway` y al coordinator: *"Retoma desde docs/STATE.md y los issues abiertos."*
Las conversaciones antiguas no viajan; todo lo importante está en issues y STATE.md.

## Antes de hacer público el repo (jueves)
Los issues y su historial también se hacen públicos. Revisa con `gh issue list --state all` y `git log -p | grep -iE "token|key|password|@"` que no haya secretos ni datos personales.
