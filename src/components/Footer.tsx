import { useLangContext } from '../context/LangContext'

export default function Footer() {
  const { tr } = useLangContext()

  return (
    <footer className="site-footer">
      <span className="footer-logo">ES.</span>

      <span className="footer-copy">{tr.footer.copy}</span>

      <button
        className="footer-top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        {tr.footer.back_to_top}
      </button>
    </footer>
  )
}
