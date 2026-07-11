/**
 * Descubre automáticamente las fotos de cada experiencia.
 *
 * Basta con dejar las imágenes en src/assets/photos/<slug>/ :
 *   - "cover.jpg" (o .png/.webp...) → portada de la tarjeta
 *   - el resto → álbum, ordenado por nombre de archivo (01.jpg, 02.jpg, ...)
 */
const modules = import.meta.glob('../assets/photos/*/*.{jpg,jpeg,png,webp,gif,JPG,JPEG,PNG,WEBP,GIF}', {
  eager: true,
  query: '?url',
  import: 'default',
})

const bySlug = {}
for (const [path, url] of Object.entries(modules)) {
  const parts = path.split('/')
  const slug = parts[parts.length - 2]
  const file = parts[parts.length - 1]
  const entry = (bySlug[slug] ??= { cover: null, album: [] })
  if (/^cover\./i.test(file)) {
    entry.cover = url
  } else {
    entry.album.push({ file, url })
  }
}

for (const entry of Object.values(bySlug)) {
  entry.album.sort((a, b) => a.file.localeCompare(b.file, undefined, { numeric: true }))
  entry.album = entry.album.map((item) => item.url)
  if (!entry.cover && entry.album.length > 0) entry.cover = entry.album[0]
}

export function getPhotos(slug) {
  return bySlug[slug]
}
