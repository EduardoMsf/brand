import { useEffect } from "react";
import { useLangContext } from "../context/LangContext";

const LINK_DATA = [
  {
    value: "samaniegomsf@gmail.com",
    href: "mailto:samaniegomsf@gmail.com",
  },
  {
    value: "linkedin.com/in/eduardomsf/",
    href: "https://www.linkedin.com/in/eduardomsf/",
  },
  {
    value: "github.com/EduardoMsf",
    href: "https://github.com/EduardoMsf",
  },
];

export default function Contact() {
  const { tr } = useLangContext();
  const { contact: tx } = tr;

  useEffect(() => {
    const section = document.getElementById("contact");
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
    <section id="contact" className="contact">
      <div className="section-label">
        <span className="section-label-text">{tx.label}</span>
        <span className="section-label-line" />
      </div>

      <div className="contact-grid">
        {/* ── Left column ── */}
        <div className="contact-left reveal" data-delay="0s">
          <h2 className="contact-headline">
            {tx.headline.map((line, i) => (
              <span
                key={i}
                className={i === tx.headline.length - 1 ? "contact-headline-accent" : undefined}
              >
                {line}
              </span>
            ))}
          </h2>
        </div>

        {/* ── Right column ── */}
        <div className="contact-right reveal" data-delay="0.2s">
          <p className="contact-intro">{tx.intro}</p>

          <div className="contact-links">
            {LINK_DATA.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                className="contact-link"
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel={
                  link.href.startsWith("mailto")
                    ? undefined
                    : "noopener noreferrer"
                }
              >
                <div className="contact-link-left">
                  <span className="contact-link-label">{tx.links[i]}</span>
                  <span className="contact-link-value">{link.value}</span>
                </div>
                <span className="contact-link-arrow" aria-hidden="true">
                  →
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
