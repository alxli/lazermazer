#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

PUBLIC_URL="${PUBLIC_URL:-https://lazermazer.alexli.ca}"

echo "Deploying LazerMazer from $(pwd)"
git pull --ff-only

if [ ! -f index.html ]; then
  echo "index.html is missing; deploy did not produce a static app." >&2
  exit 1
fi

if command -v curl >/dev/null 2>&1; then
  code="$(curl -sS -o /dev/null -w '%{http_code}' "$PUBLIC_URL/" || true)"
  if [ "$code" = "200" ]; then
    echo "ok   $PUBLIC_URL/ returned 200"
  else
    echo "warn $PUBLIC_URL/ returned $code"
    echo "The files were updated locally. Check DNS/Caddy if the public site is not right."
  fi
fi

echo "LazerMazer deploy complete."
