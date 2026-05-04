import Particles from './Particules'
import { useLangContext } from '../context/LangContext'

const handleScroll = (id: string) => {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

export default function Hero() {
  const { tr } = useLangContext()

  return (
    <section id="hero" className="hero">
      <span className="hero-ghost" aria-hidden="true">
        FRONTEND
        <br />
        ENGINEER
      </span>

      <Particles />

      <div className="hero-eyebrow">
        <span className="hero-eyebrow-line" />
        <span className="hero-eyebrow-text">{tr.hero.eyebrow}</span>
      </div>

      <h1 className="hero-name">
        <span>EDUARDO</span>
        <span className="hero-name-accent">SAMANIEGO</span>
      </h1>

      <div className="hero-bottom">
        <p className="hero-subtitle">{tr.hero.subtitle}</p>
        <div className="hero-actions">
          <button
            className="btn-primary"
            onClick={() => handleScroll('projects')}
          >
            {tr.hero.cta_primary}
          </button>
          <button
            className="btn-ghost"
            onClick={() => handleScroll('contact')}
          >
            {tr.hero.cta_secondary}
          </button>
        </div>
      </div>

      <div className="hero-scroll" aria-hidden="true">
        <span className="hero-scroll-label">Scroll</span>
        <div className="hero-scroll-line" />
      </div>
    </section>
  )
}
