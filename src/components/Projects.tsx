import { useEffect } from "react";
import { useLangContext } from "../context/LangContext";

const PROJECT_BADGES = [
  ["Next.js 15", "Prisma", "Claude AI"],
  ["React", "NestJS", "Zod"],
  ["Lit Elements", "Web Components"],
  ["TypeScript", "Patterns"],
];

export default function Projects() {
  const { tr } = useLangContext();
  const { projects: tx } = tr;

  useEffect(() => {
    const section = document.getElementById("projects");
    if (!section) return;

    const items = section.querySelectorAll<HTMLElement>(".reveal");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        items.forEach((el) => {
          el.style.transitionDelay = el.dataset.delay ?? "0s";
          el.classList.add("revealed");
        });
        observer.disconnect();
      },
      { threshold: 0.1 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" className="projects">
      <div className="section-label">
        <span className="section-label-text">{tx.label}</span>
        <span className="section-label-line" />
      </div>

      <div className="projects-list">
        {tx.items.map((project, i) => (
          <a
            key={project.num}
            href={project.link}
            target="_blank"
            className="project-item reveal"
            data-delay={`${i * 0.1}s`}
          >
            {/* col 1 */}
            <span className="project-number">{project.num}</span>

            {/* col 2 */}
            <div className="project-info">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-desc">{project.desc}</p>
            </div>

            {/* col 3 */}
            <div className="project-badges">
              {PROJECT_BADGES[i].map((badge) => (
                <span key={badge} className="project-badge">
                  {badge}
                </span>
              ))}
            </div>

            {/* absolutely positioned — not a grid item */}
            <span className="project-arrow" aria-hidden="true">
              →
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
