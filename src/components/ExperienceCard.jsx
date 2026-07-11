import { Link } from 'react-router-dom'
import Rating from './Rating.jsx'

export default function ExperienceCard({ experience }) {
  const { slug, title, location, shortDescription, paragraphs, price, duration, rating, reviews, coverThumb, isReveal } =
    experience

  return (
    <Link to={`/experiencia/${slug}`} className={`card ${isReveal ? 'card-reveal' : ''}`}>
      <div className="card-body">
        {isReveal && <span className="badge-new">¡NUEVA EXPERIENCIA!</span>}
        <p className="card-location">{location}</p>
        <h2 className="card-title">{title}</h2>
        <p className="card-short">{shortDescription}</p>
        <p className="card-excerpt">{paragraphs[0]}</p>
        <div className="card-meta">
          <span className="card-duration">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="9" />
              <polyline points="12 7 12 12 15.5 14" />
            </svg>
            {duration}
          </span>
          <Rating rating={rating} reviews={reviews} />
        </div>
        <div className="card-price">
          <span className="price-label">desde</span>
          <span className="price-value">{price}</span>
          <span className="price-per">por persona</span>
        </div>
      </div>
      <div className="card-photo">
        <img src={coverThumb} alt={title} loading="lazy" decoding="async" />
      </div>
    </Link>
  )
}
