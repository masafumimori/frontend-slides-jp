#!/usr/bin/env bash
# Reads a website in an isolated container: the site cannot see this machine's files (only
# the output folder is mounted) or reach this machine or its network (egress rules in
# site-reader/entrypoint.sh, plus extract-site.mjs's own address checks).
#   bash scripts/read-site.sh <url> [<url> …] --out <dir>
# Needs Docker. Builds the image frontend-slides-jp/site-reader on first use.
set -euo pipefail
here="$(cd "$(dirname "$0")" && pwd)"
image=frontend-slides-jp/site-reader:1.48.2
args=()
out=""
while [[ $# -gt 0 ]]; do
  case "$1" in
    --out) out="$2"; shift 2 ;;
    --allow-private)
      echo "read-site.sh: --allow-private is not available in the container; run extract-site.mjs directly for your own staging site" >&2
      exit 2 ;;
    *) args+=("$1"); shift ;;
  esac
done
[[ -n "$out" && ${#args[@]} -gt 0 ]] || { echo "usage: bash scripts/read-site.sh <url> [<url> …] --out <dir>" >&2; exit 2; }
docker info >/dev/null 2>&1 || { echo "read-site.sh: Docker is not running" >&2; exit 1; }
docker image inspect "$image" >/dev/null 2>&1 || docker build -q -t "$image" "$here/site-reader" >/dev/null
mkdir -p "$out"
out="$(cd "$out" && pwd)"
docker run --rm --init \
  --cap-drop ALL --cap-add NET_ADMIN --cap-add SETUID --cap-add SETGID --cap-add SETPCAP \
  --security-opt no-new-privileges \
  --read-only --tmpfs /tmp:size=512m --tmpfs /home/pwuser:size=512m,uid=1000,gid=1000 \
  --shm-size 1g --memory 2g --pids-limit 512 \
  -v "$here/extract-site.mjs:/app/extract-site.mjs:ro" \
  -v "$out:/out" \
  "$image" "${args[@]}" --out /out
