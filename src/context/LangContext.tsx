import { createContext, useContext, ReactNode } from 'react'
import { useLang } from '../hooks/useLang'
import { t } from '../i18n/translations'

type LangContextType = {
  lang: 'en' | 'es'
  toggle: () => void
  tr: typeof t['en']
}

const LangContext = createContext<LangContextType | null>(null)

export function LangProvider({ children }: { children: ReactNode }) {
  const { lang, toggle } = useLang()
  return (
    <LangContext.Provider value={{ lang, toggle, tr: t[lang] }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLangContext() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLangContext must be used within LangProvider')
  return ctx
}
