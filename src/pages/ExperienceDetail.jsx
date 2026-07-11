import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getExperience } from '../data/experiences.js'
import Rating from '../components/Rating.jsx'
import Lightbox from '../components/Lightbox.jsx'
import { launchConfetti } from '../confetti.js'

export default function ExperienceDetail() {
  const { slug } = useParams()
  const experience = getExperience(slug)
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const [revealed, setRevealed] = useState(false)

  if (!experience) {
    return (
      <main className="detail">
        <p>Esta experiencia no existe... todavía.</p>
        <Link to="/" className="back-link">← Volver a las experiencias</Link>
      </main>
    )
  }

  const {
    title,
    location,
    paragraphs,
    price,
    duration,
    rating,
    reviews,
    cover,
    album,
    albumThumbs,
    isReveal,
    revealMessage,
    externalUrl,
  } = experience

  function handleReserve() {
    setRevealed(true)
    launchConfetti()
  }

  return (
    <main className="detail">
      <Link to="/" className="back-link">← Volver a las experiencias</Link>

      <div className="detail-header">
        <p className="card-location">{location}</p>
        <h1>{title}</h1>
        <div className="detail-meta">
          <Rating rating={rating} reviews={reviews} />
          <span className="card-duration">🕐 {duration}</span>
        </div>
      </div>

      <div className="detail-cover">
        <img src={cover} alt={title} />
      </div>

      <div className="detail-layout">
        <div className="detail-content">
          <h2>Sobre esta experiencia</h2>
          {paragraphs.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}

          {isReveal && (
            <div className={`reveal-box ${revealed ? 'revealed' : ''}`}>
              {!revealed ? (
                <>
                  <h3>Hay algo más esperándote aquí abajo 👀</h3>
                  <button className="btn-reserve" onClick={handleReserve}>
                    Reservar próxima aventura
                  </button>
                </>
              ) : (
                <>
                  <h3>🤿 ¡Sorpresa!</h3>
                  <p className="reveal-message">{revealMessage}</p>
                  {externalUrl && (
                    <a className="btn-reserve btn-external" href={externalUrl} target="_blank" rel="noreferrer">
                      Ver la experiencia real →
                    </a>
                  )}
                </>
              )}
            </div>
          )}

          <h2>Álbum de recuerdos</h2>
          <div className="album-grid">
            {album.map((photo, i) => (
              <button key={photo} className="album-item" onClick={() => setLightboxIndex(i)}>
                <img src={albumThumbs[i] ?? photo} alt={`${title} — foto ${i + 1}`} loading="lazy" decoding="async" />
              </button>
            ))}
          </div>
        </div>

        <aside className="detail-sidebar">
          <div className="price-box">
            <p className="price-label">desde</p>
            <p className="price-value">{price}</p>
            <p className="price-per">por persona</p>
            <ul className="price-perks">
              <li>✓ Cancelación imposible</li>
              <li>✓ Recuerdos incluidos</li>
              <li>✓ Compañía inmejorable garantizada</li>
            </ul>
            {isReveal && externalUrl ? (
              <a className="btn-reserve btn-external" href={externalUrl} target="_blank" rel="noreferrer">
                Reservar
              </a>
            ) : (
              <button className="btn-reserve btn-disabled" disabled>
                Agotado (ya lo vivimos)
              </button>
            )}
          </div>
        </aside>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          photos={album}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </main>
  )
}
