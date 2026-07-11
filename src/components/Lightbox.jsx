import { useEffect, useCallback } from 'react'

export default function Lightbox({ photos, index, onClose, onNavigate }) {
  const prev = useCallback(() => onNavigate((index - 1 + photos.length) % photos.length), [index, photos.length, onNavigate])
  const next = useCallback(() => onNavigate((index + 1) % photos.length), [index, photos.length, onNavigate])

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, prev, next])

  return (
    <div className="lightbox" onClick={onClose}>
      <button className="lightbox-close" aria-label="Cerrar" onClick={onClose}>
        ✕
      </button>
      <button
        className="lightbox-arrow lightbox-prev"
        aria-label="Anterior"
        onClick={(e) => {
          e.stopPropagation()
          prev()
        }}
      >
        ‹
      </button>
      <img src={photos[index]} alt={`Foto ${index + 1}`} onClick={(e) => e.stopPropagation()} />
      <button
        className="lightbox-arrow lightbox-next"
        aria-label="Siguiente"
        onClick={(e) => {
          e.stopPropagation()
          next()
        }}
      >
        ›
      </button>
      <span className="lightbox-counter">
        {index + 1} / {photos.length}
      </span>
    </div>
  )
}
