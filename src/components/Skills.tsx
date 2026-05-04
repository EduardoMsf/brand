import { useEffect } from 'react'
import { useLangContext } from '../context/LangContext'

const SKILL_TAGS = [
  ['React', 'Next.js', 'Lit Elements', 'TypeScript', 'Web Components'],
  ['Zustand', 'Redux Toolkit', 'React Query', 'Prisma', 'PostgreSQL'],
  ['NestJS', 'Node.js', 'REST', 'JWT/RBAC', 'Redis'],
  ['FSD', 'DDD', 'OWASP', 'Design Patterns'],
  ['Jest', 'Playwright', 'GitHub Actions', 'SonarQube', 'Docker'],
  ['Lighthouse', 'Web Vitals', 'SSR/SSG/ISR', 'RSC', 'AWS'],
]

export default function Skills() {
  const { tr } = useLangContext()
  const { skills: tx } = tr

  useEffect(() => {
    const section = document.getElementById('skills')
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
    <section id="skills" className="skills">
      <div className="section-label">
        <span className="section-label-text">{tx.label}</span>
        <span className="section-label-line" />
      </div>

      <div className="skills-grid">
        {tx.cells.map((cell, i) => (
          <div
            key={cell.num}
            className="skill-cell reveal"
            data-delay={`${i * 0.1}s`}
          >
            <span className="skill-cell-number">{cell.num}</span>
            <h3 className="skill-cell-title">{cell.title}</h3>
            <p className="skill-cell-desc">{cell.desc}</p>
            <div className="skill-cell-tags">
              {SKILL_TAGS[i].map(tag => (
                <span key={tag} className="skill-tag">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
