import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="logo">
          Get<span>Your</span>Memories
        </Link>
        <div className="searchbar" role="presentation">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.5" y2="16.5" />
          </svg>
          <input type="text" placeholder="Busca recuerdos inolvidables..." readOnly />
        </div>
        <nav className="header-nav">
          <span className="nav-item">ES / €∞</span>
        </nav>
      </div>
    </header>
  )
}
