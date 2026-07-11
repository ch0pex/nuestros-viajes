#!/usr/bin/env bash
# Optimiza las fotos para la web. Ejecutar cada vez que añadas fotos nuevas:
#   npm run photos
#
# Qué hace con cada imagen de src/assets/photos/<viaje>/ :
#   - la rota según el EXIF y elimina metadatos (incluida la ubicación GPS)
#   - la reduce a máximo 1920px por el lado largo, calidad 80
#   - genera una miniatura de 640px en <viaje>/thumbs/ (para tarjetas y grid)
set -euo pipefail
cd "$(dirname "$0")/../src/assets/photos"

MAGICK=$(command -v magick || command -v convert)

shopt -s nullglob nocaseglob
for dir in */; do
  slug=${dir%/}
  mkdir -p "$slug/thumbs"
  for img in "$slug"/*.{jpg,jpeg,png,webp}; do
    name=$(basename "$img")
    "$MAGICK" "$img" -auto-orient -strip -resize '1920x1920>' -quality 80 "$img.tmp" && mv "$img.tmp" "$img"
    "$MAGICK" "$img" -resize '640x640>' -quality 75 "$slug/thumbs/$name.tmp" && mv "$slug/thumbs/$name.tmp" "$slug/thumbs/$name"
    echo "✓ $slug/$name"
  done
done

echo
du -sh . | awk '{print "Tamaño total tras optimizar: " $1}'
