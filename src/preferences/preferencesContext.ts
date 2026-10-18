import { createContext, useContext } from 'react'
import type { Language, Localized } from '../data/types'
import type { MessageKey } from '../i18n/en'

export type Theme = 'soft-light' | 'warm-dark'

export type Vars = Record<string, string | number>

export type Preferences = {
  language: Language
  setLanguage: (language: Language) => void
  theme: Theme
  setTheme: (theme: Theme) => void
  /** Translate a UI message key, filling `{name}` placeholders from `vars`. */
  t: (key: MessageKey, vars?: Vars) => string
  /** Pick the current language from a piece of localized content. */
  l: (content: Localized, vars?: Vars) => string
}

export const PreferencesContext = createContext<Preferences | null>(null)

export function usePreferences(): Preferences {
  const preferences = useContext(PreferencesContext)
  if (!preferences) throw new Error('usePreferences must be used inside <PreferencesProvider>')
  return preferences
}

export function fillTemplate(template: string, vars?: Vars): string {
  if (!vars) return template
  return template.replace(/\{(\w+)\}/g, (match, name: string) => (name in vars ? String(vars[name]) : match))
}
