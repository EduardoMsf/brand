import { useEffect } from 'react'
import { useLangContext } from '../context/LangContext'

export default function Quotes() {
  const { tr } = useLangContext()
  const { quotes: tx } = tr

  useEffect(() => {
    const section = document.getElementById('quotes')
    if (!section) return

    const items = section.querySelectorAll<HTMLElement>('.reveal')

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        items.forEach(el => {
          el.style.transitionDelay = el.dataset.delay ?? '0s'
          el.classList.add('revealed')
        })
        observer.disconnect()
      },
      { threshold: 0.1 },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="quotes" className="quotes">
      <div className="section-label">
        <span className="section-label-text">{tx.label}</span>
        <span className="section-label-line" />
      </div>

      <div className="quotes-grid">
        {tx.items.map((quote, i) => (
          <div
            key={i}
            className="quote-card reveal"
            data-delay={`${(i % 3 + Math.floor(i / 3)) * 0.1}s`}
          >
            <span className="quote-mark">&ldquo;</span>
            <p className="quote-text">{quote.text}</p>
            <div className="quote-author">
              <span className="quote-author-line" />
              <span className="quote-author-name">{quote.author}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
