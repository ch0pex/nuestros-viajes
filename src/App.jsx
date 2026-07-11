import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header.jsx'
import Home from './pages/Home.jsx'
import ExperienceDetail from './pages/ExperienceDetail.jsx'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/experiencia/:slug" element={<ExperienceDetail />} />
      </Routes>
      <footer className="footer">
        <p>GetYourMemories © {new Date().getFullYear()} — Experiencias que no se pueden reembolsar</p>
      </footer>
    </>
  )
}
