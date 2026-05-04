import { useEffect } from 'react'
import { useLangContext } from '../context/LangContext'

const STAT_NUMBERS = ['4+', '20+', '01']

export default function About() {
  const { tr } = useLangContext()
  const { about: tx } = tr

  const stats = [
    { number: STAT_NUMBERS[0], label: tx.stat1_label },
    { number: STAT_NUMBERS[1], label: tx.stat2_label },
    { number: STAT_NUMBERS[2], label: tx.stat3_label },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return
          const el = entry.target as HTMLElement
          el.style.transitionDelay = el.dataset.delay ?? '0s'
          el.classList.add('revealed')
          observer.unobserve(el)
        })
      },
      { threshold: 0.15 },
    )

    document
      .getElementById('about')
      ?.querySelectorAll('.reveal')
      .forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="about">
      <div className="section-label">
        <span className="section-label-text">{tx.label}</span>
        <span className="section-label-line" />
      </div>

      <div className="about-grid">
        {/* ── Left column ── */}
        <div className="about-left">
          <h2 className="about-headline reveal" data-delay="0s">
            {tx.headline_1}{' '}
            <em className="headline-accent">{tx.headline_accent}</em>
            {' '}{tx.headline_2}
          </h2>

          <div className="about-location reveal" data-delay="0.1s">
            <span className="location-dot" />
            <span className="location-text">{tx.location}</span>
          </div>

          <p className="about-para reveal" data-delay="0.2s">{tx.p1}</p>

          <p className="about-para reveal" data-delay="0.3s">{tx.p2}</p>
        </div>

        {/* ── Right column ── */}
        <div className="about-right">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="about-stat reveal"
              data-delay={`${i * 0.1}s`}
            >
              <span className="stat-number">{stat.number}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
