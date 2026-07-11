/**
 * Descubre automáticamente las fotos de cada experiencia.
 *
 * Basta con dejar las imágenes en src/assets/photos/<slug>/ :
 *   - "portrait.jpg" (o "cover.jpg") → portada de la tarjeta
 *   - el resto → álbum, ordenado por nombre de archivo
 *   - <slug>/thumbs/ → miniaturas generadas por `npm run photos`
 *     (mismo nombre de archivo; se usan en tarjetas y grid del álbum)
 */
const fullModules = import.meta.glob('../assets/photos/*/*.{jpg,jpeg,png,webp,gif,JPG,JPEG,PNG,WEBP,GIF}', {
  eager: true,
  query: '?url',
  import: 'default',
})
const thumbModules = import.meta.glob('../assets/photos/*/thumbs/*.{jpg,jpeg,png,webp,gif,JPG,JPEG,PNG,WEBP,GIF}', {
  eager: true,
  query: '?url',
  import: 'default',
})

// slug -> nombre de archivo -> url de la miniatura
const thumbsBySlug = {}
for (const [path, url] of Object.entries(thumbModules)) {
  const parts = path.split('/')
  const slug = parts[parts.length - 3]
  const file = parts[parts.length - 1]
  ;(thumbsBySlug[slug] ??= {})[file] = url
}

const bySlug = {}
for (const [path, url] of Object.entries(fullModules)) {
  const parts = path.split('/')
  const slug = parts[parts.length - 2]
  const file = parts[parts.length - 1]
  const thumb = thumbsBySlug[slug]?.[file] ?? url
  const entry = (bySlug[slug] ??= { cover: null, coverThumb: null, items: [] })
  if (/^(portrait|cover)\./i.test(file)) {
    entry.cover = url
    entry.coverThumb = thumb
  } else {
    entry.items.push({ file, url, thumb })
  }
}

for (const entry of Object.values(bySlug)) {
  entry.items.sort((a, b) => a.file.localeCompare(b.file, undefined, { numeric: true }))
  entry.album = entry.items.map((item) => item.url)
  entry.albumThumbs = entry.items.map((item) => item.thumb)
  delete entry.items
  if (!entry.cover && entry.album.length > 0) {
    entry.cover = entry.album[0]
    entry.coverThumb = entry.albumThumbs[0]
  }
}

export function getPhotos(slug) {
  return bySlug[slug]
}
