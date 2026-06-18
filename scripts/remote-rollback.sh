#!/usr/bin/env bash
#
# Rollback al build inmediatamente anterior. Ejecutar EN el servidor:
#   ssh ... 'bash -s' < scripts/remote-rollback.sh
set -euo pipefail

APP="$HOME/domains/rehabilitacionoral.cl/nodejs"
cd "$APP"

[ -d .next.prev ] || { echo "ERROR: no hay .next.prev para revertir"; exit 1; }

echo "[rollback] Restaurando build anterior…"
rm -rf .next.bad node_modules.bad
mv .next .next.bad
mv node_modules node_modules.bad
mv .next.prev .next
mv node_modules.prev node_modules

mkdir -p tmp
touch tmp/restart.txt
echo "[rollback] OK — revertido y reiniciado. El build fallido quedó en .next.bad."
