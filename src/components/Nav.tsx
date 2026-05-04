import { useEffect, useState } from 'react'
import { useTheme } from '../hooks/useTheme'
import { useLangContext } from '../context/LangContext'

export default function Nav() {
  const { theme, toggle: toggleTheme } = useTheme()
  const { lang, toggle: toggleLang, tr } = useLangContext()
  const [scrolled, setScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMenuOpen])

  const navLinks = [
    { label: tr.nav.about,    href: '#about' },
    { label: tr.nav.skills,   href: '#skills' },
    { label: tr.nav.projects, href: '#projects' },
    { label: tr.nav.contact,  href: '#contact' },
  ]

  const closeAndScroll = (href: string) => {
    setIsMenuOpen(false)
    const el = document.getElementById(href.slice(1))
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
        {/* Logo */}
        <a href="#" className="nav-logo">
          ES<span className="nav-logo-dot">.</span>
        </a>

        {/* Desktop links */}
        <ul className="nav-links-desktop">
          {navLinks.map(link => (
            <li key={link.href} className="nav-item">
              <a href={link.href} className="nav-link">{link.label}</a>
            </li>
          ))}
        </ul>

        {/* Controls: lang + theme + hamburger */}
        <div className="nav-controls">
          <button
            className="nav-toggle nav-lang-toggle"
            onClick={() => { toggleLang(); setIsMenuOpen(false) }}
            aria-label={`Switch to ${lang === 'en' ? 'Spanish' : 'English'}`}
          >
            {lang === 'en' ? 'ES' : 'EN'}
          </button>

          <button
            className="nav-toggle"
            onClick={() => { toggleTheme(); setIsMenuOpen(false) }}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? '☀' : '☾'}
          </button>

          <button
            className={`hamburger${isMenuOpen ? ' hamburger--open' : ''}`}
            onClick={() => setIsMenuOpen(o => !o)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div className={`mobile-menu${isMenuOpen ? ' mobile-menu--open' : ''}`}>
        {navLinks.map(link => (
          <a
            key={link.href}
            href={link.href}
            className="mobile-menu-link"
            onClick={e => { e.preventDefault(); closeAndScroll(link.href) }}
          >
            {link.label}
          </a>
        ))}
      </div>
    </>
  )
}
