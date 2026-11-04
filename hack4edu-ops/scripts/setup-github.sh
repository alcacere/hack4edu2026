#!/usr/bin/env bash
# Crea las labels del protocolo en el repo. Ejecútalo UNA vez, desde la raíz del repo,
# con gh ya autenticado (gh auth status).
set -euo pipefail

lab() { gh label create "$1" --color "$2" --description "${3:-}" --force >/dev/null && echo "  ✓ $1"; }

echo "Labels de estado"
lab "status:todo"    "ededed" "Pendiente"
lab "status:doing"   "fbca04" "En curso"
lab "status:review"  "0e8a16" "Esperando al reviewer"
lab "status:blocked" "b60205" "Bloqueado"

echo "Labels de agente"
lab "agent:coordinator" "5319e7"
lab "agent:builder"     "1d76db"
lab "agent:researcher"  "0052cc"
lab "agent:writer"      "c5def5"
lab "agent:reviewer"    "d93f0b"

echo "Labels de bloque"
for i in 1 2 3 4 5 6 7 8; do lab "block:B$i" "bfdadc"; done

echo "Labels de tipo y prioridad"
lab "type:feat"     "a2eeef"
lab "type:bug"      "d73a4a"
lab "type:research" "7057ff"
lab "type:doc"      "0075ca"
lab "type:test"     "e4e669"
lab "prio:p0" "b60205" "Bloquea la demo"
lab "prio:p1" "fbca04"
lab "prio:p2" "c2e0c6"
lab "needs-human" "ff7619" "Decide un humano"

echo "Listo."
