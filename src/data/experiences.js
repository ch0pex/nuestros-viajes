/**
 * ✏️ EDITA SOLO experiences.json — es la "base de datos" de la página.
 *
 * FOTOS — no hace falta ponerlas en el JSON:
 *   Deja las imágenes en src/assets/photos/<slug>/ y la web las coge sola:
 *     - cover.jpg  → portada de la tarjeta
 *     - 01.jpg, 02.jpg, ...  → álbum, en orden alfabético/numérico
 *   (Si la carpeta está vacía, se usan los campos "cover" y "album" del JSON
 *    como respaldo — así funcionan los placeholders de picsum.)
 *
 * Campos de cada experiencia:
 *   slug              identificador único; debe coincidir con el nombre de su
 *                     carpeta de fotos en src/assets/photos/<slug>/
 *   title             título del viaje, ej. "Viaje a Roma"
 *   location          "Ciudad, País" (sale encima del título)
 *   shortDescription  una línea que aparece en la tarjeta
 *   paragraphs        array de párrafos con las anécdotas
 *   price             lo que sale como precio: "∞ €" viajes, "0 €" el buceo
 *   duration          ej. "3 días"
 *   rating            número, ej. 5.0
 *   reviews           texto de las reseñas, ej. "2 viajeros enamorados"
 *   cover / album     (opcional) URLs de respaldo si no hay fotos en la carpeta
 *   isReveal          true SOLO en la experiencia sorpresa (la última del array)
 *   revealMessage     (solo sorpresa) mensaje al pulsar "Reservar"
 *   externalUrl       (opcional, solo sorpresa) web real de la experiencia
 */
import experiencesData from './experiences.json'
import { getPhotos } from './photos.js'

export const experiences = experiencesData.map((exp) => {
  const photos = getPhotos(exp.slug)
  return {
    ...exp,
    cover: photos?.cover ?? exp.cover,
    album: photos?.album?.length ? photos.album : (exp.album ?? []),
  }
})

export function getExperience(slug) {
  return experiences.find((e) => e.slug === slug)
}
