#!/usr/bin/env bash
# Génère les déclinaisons WebP d'un projet et affiche les lignes à coller dans src/data/projects/<slug>.js
# Usage : scripts/optimize-media.sh <dossier-photos-originales> <slug>
# Prérequis (macOS) : cwebp (brew install webp) et sips (fourni avec macOS).
# Même règle que src/lib/media.js : bord long limité à 1920 px, paliers 640 / 1280 / 1920.
set -euo pipefail
SRC="$1"; SLUG="$2"
OUT="$(dirname "$0")/../public/media/$SLUG"
mkdir -p "$OUT"
i=0
while IFS= read -r f; do
  lower=$(printf '%s' "$f" | tr '[:upper:]' '[:lower:]')
  case "$lower" in *.jpg|*.jpeg|*.png|*.webp|*.tif|*.tiff|*.heic) ;; *) continue ;; esac
  i=$((i + 1)); name=$(printf '%02d' "$i")
  w=$(sips -g pixelWidth "$SRC/$f" | awk '/pixelWidth/ {print $2}')
  h=$(sips -g pixelHeight "$SRC/$f" | awk '/pixelHeight/ {print $2}')
  long=$(( w > h ? w : h ))
  max=$(( (w * 1920 * 2 + long) / (2 * long) )); (( max > w )) && max=$w
  for s in 640 1280 1920; do
    (( s < max )) && cwebp -quiet -q 76 -m 6 -metadata none -resize "$s" 0 "$SRC/$f" -o "$OUT/$name-$s.webp"
  done
  cwebp -quiet -q 76 -m 6 -metadata none -resize "$max" 0 "$SRC/$f" -o "$OUT/$name-$max.webp"
  echo "    p('$name', $w, $h),   // $f"
done < <(ls "$SRC" | sort)
