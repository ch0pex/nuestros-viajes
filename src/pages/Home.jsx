import { experiences } from '../data/experiences.js'
import ExperienceCard from '../components/ExperienceCard.jsx'

export default function Home() {
  return (
    <main className="home">
      <section className="hero">
        <h1>De lo mutuo nadie se cansa</h1>
        <p>
          {experiences.length} resultados · Valoración media: 5.0 · Cancelación imposible: estos recuerdos no se
          devuelven
        </p>
      </section>
      <section className="card-list">
        {experiences.map((exp) => (
          <ExperienceCard key={exp.slug} experience={exp} />
        ))}
      </section>
    </main>
  )
}
