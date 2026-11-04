#!/usr/bin/env bash
# Retomar el proyecto en un ordenador nuevo sin perder contexto.
# Requisitos: openclaw, gh, git y ollama instalados.
# Uso:  REPO=alcacere/hack4edu2026 ./new-machine.sh
set -euo pipefail

REPO="${REPO:-alcacere/hack4edu2026}"
OPENCLAW_HOME="${OPENCLAW_HOME:-$HOME/goinfre/openclaw/home}"

gh auth status >/dev/null 2>&1 || gh auth login

# 1. Repo de trabajo temporal para leer la config
TMP="$(mktemp -d)"
gh repo clone "$REPO" "$TMP/repo" -- --quiet

# 2. Config de OpenClaw a partir de la plantilla (sin secretos)
mkdir -p "$OPENCLAW_HOME"
if [ ! -f "$OPENCLAW_HOME/openclaw.json" ]; then
  TOKEN="$(openssl rand -hex 24)"
  sed -e "s#__OPENCLAW_HOME__#$OPENCLAW_HOME#g" -e "s#__GATEWAY_TOKEN__#$TOKEN#g" \
    "$TMP/repo/openclaw/openclaw.example.json" > "$OPENCLAW_HOME/openclaw.json"
  chmod 600 "$OPENCLAW_HOME/openclaw.json"
  echo "✓ openclaw.json creado (token nuevo, solo en este equipo)"
else
  echo "• openclaw.json ya existe, no lo toco"
fi

# 3. Clones por agente + AGENTS.md enlazados
REPO="$REPO" OPENCLAW_HOME="$OPENCLAW_HOME" bash "$TMP/repo/scripts/setup-openclaw.sh"
rm -rf "$TMP"

# 4. Modelo local (ajusta el tag si cambia)
grep -E '^LLM_MODELS=' "$OPENCLAW_HOME/workspace/builder/repo/.env.example" || true
echo
echo "Siguiente:"
echo "  ollama pull <tag de gemma 4>   # ollama search gemma4"
echo "  openclaw doctor --fix"
echo "  openclaw gateway               # en una terminal aparte"
echo "  → en el chat del coordinator: 'Retoma desde docs/STATE.md y los issues abiertos'"
