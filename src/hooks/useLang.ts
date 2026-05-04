import { useCallback, useEffect, useState } from 'react'

export type Lang = 'en' | 'es'

const STORAGE_KEY = 'portfolio-lang'

export function useLang() {
  const [lang, setLang] = useState<Lang>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Lang | null
      if (stored === 'en' || stored === 'es') return stored
    } catch {}
    return navigator.language.startsWith('es') ? 'es' : 'en'
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {}
  }, [lang])

  const toggle = useCallback(() => {
    setLang(l => (l === 'en' ? 'es' : 'en'))
  }, [])

  return { lang, toggle }
}
