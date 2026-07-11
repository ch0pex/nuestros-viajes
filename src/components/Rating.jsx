export default function Rating({ rating, reviews }) {
  return (
    <div className="rating">
      <span className="rating-stars" aria-label={`${rating} de 5 estrellas`}>
        {'★★★★★'.slice(0, Math.round(rating))}
      </span>
      <span className="rating-value">{rating.toFixed(1)}</span>
      <span className="rating-reviews">· {reviews}</span>
    </div>
  )
}
