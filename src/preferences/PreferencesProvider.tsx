import { useEffect, useState, type ReactNode } from 'react'
import type { Language } from '../data/types'
import { en } from '../i18n/en'
import { th } from '../i18n/th'
import { fillTemplate, PreferencesContext, type Preferences, type Theme } from './preferencesContext'

// Same keys as the HTML prototype, so a saved choice carries over.
const LANGUAGE_KEY = 'quickmedical-language'
const THEME_KEY = 'quickmedical-theme'

const THEME_COLORS: Record<Theme, string> = { 'soft-light': '#F8F9FB', 'warm-dark': '#292725' }

function readStorage(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

function writeStorage(key: string, value: string) {
  try {
    localStorage.setItem(key, value)
  } catch {
    // Storage can be unavailable (private mode, blocked site data); the choice then lasts for this visit only.
  }
}

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => (readStorage(LANGUAGE_KEY) === 'th' ? 'th' : 'en'))
  const [theme, setTheme] = useState<Theme>(() =>
    readStorage(THEME_KEY) === 'warm-dark' ? 'warm-dark' : 'soft-light',
  )

  const messages = language === 'th' ? th : en

  useEffect(() => {
    writeStorage(LANGUAGE_KEY, language)
    document.documentElement.lang = language
    document.title = messages['app.title']
  }, [language, messages])

  useEffect(() => {
    writeStorage(THEME_KEY, theme)
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[theme])
  }, [theme])

  const value: Preferences = {
    language,
    setLanguage,
    theme,
    setTheme,
    t: (key, vars) => fillTemplate(messages[key], vars),
    l: (content, vars) => fillTemplate(content[language], vars),
  }

  return <PreferencesContext value={value}>{children}</PreferencesContext>
}
