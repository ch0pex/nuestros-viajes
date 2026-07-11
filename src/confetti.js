// Confeti sin dependencias: crea piezas de papel que caen y se autodestruyen.
const COLORS = ['#ff5533', '#1a2b49', '#00c2cb', '#ffc94d', '#ff8fab', '#7bd389']

export function launchConfetti(count = 120) {
  const container = document.createElement('div')
  container.className = 'confetti-container'
  document.body.appendChild(container)

  for (let i = 0; i < count; i++) {
    const piece = document.createElement('span')
    piece.className = 'confetti-piece'
    piece.style.left = `${Math.random() * 100}vw`
    piece.style.background = COLORS[Math.floor(Math.random() * COLORS.length)]
    piece.style.animationDelay = `${Math.random() * 0.8}s`
    piece.style.animationDuration = `${2.5 + Math.random() * 2}s`
    piece.style.width = `${6 + Math.random() * 6}px`
    piece.style.height = `${10 + Math.random() * 8}px`
    piece.style.setProperty('--drift', `${(Math.random() - 0.5) * 200}px`)
    piece.style.setProperty('--spin', `${360 + Math.random() * 720}deg`)
    container.appendChild(piece)
  }

  setTimeout(() => container.remove(), 6000)
}
