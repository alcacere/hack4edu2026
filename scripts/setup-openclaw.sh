#!/usr/bin/env bash
# Conecta los 5 agentes de OpenClaw al repo compartido.
# - Clona el repo dentro del workspace de cada agente (<workspace>/repo)
# - Enlaza el AGENTS.md de cada agente al del repo (prompts versionados en git)
# Sirve tanto para la primera vez como para retomar en otro ordenador.
#
# Uso:  REPO=alcacere/hack4edu2026 ./scripts/setup-openclaw.sh
set -euo pipefail

REPO="${REPO:-alcacere/hack4edu2026}"
OPENCLAW_HOME="${OPENCLAW_HOME:-$HOME/goinfre/openclaw/home}"
WS="$OPENCLAW_HOME/workspace"
AGENTS=(coordinator builder researcher writer reviewer)

gh auth status >/dev/null || { echo "Primero: gh auth login"; exit 1; }

for a in "${AGENTS[@]}"; do
  d="$WS/$a"
  mkdir -p "$d"
  if [ -d "$d/repo/.git" ]; then
    git -C "$d/repo" pull --rebase --quiet
  else
    gh repo clone "$REPO" "$d/repo" -- --quiet
  fi
  git -C "$d/repo" config user.name  "$a (hack4edu)"
  git -C "$d/repo" config user.email "$a@agents.invalid"

  # Copia de seguridad del AGENTS.md que hubiera y enlace al del repo
  if [ -f "$d/AGENTS.md" ] && [ ! -L "$d/AGENTS.md" ]; then
    mv "$d/AGENTS.md" "$d/AGENTS.md.bak.$(date +%s)"
  fi
  ln -sfn "repo/openclaw/agents/$a/AGENTS.md" "$d/AGENTS.md"
  echo "✓ $a → $d/repo"
done

echo
echo "Hecho. Si OpenClaw no sigue el enlace simbólico, sustitúyelo por una copia:"
echo "  cp $WS/<agente>/repo/openclaw/agents/<agente>/AGENTS.md $WS/<agente>/AGENTS.md"
