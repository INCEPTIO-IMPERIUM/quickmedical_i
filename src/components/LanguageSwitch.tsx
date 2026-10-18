import type { Language } from '../data/types'
import { usePreferences } from '../preferences/preferencesContext'

const LANGUAGES: { id: Language; label: string }[] = [
  { id: 'th', label: 'TH' },
  { id: 'en', label: 'EN' },
]

export function LanguageSwitch() {
  const { language, setLanguage, t } = usePreferences()
  return (
    <div className="language-switch" role="group" aria-label={t('language.label')}>
      {LANGUAGES.map((option) => (
        <button
          key={option.id}
          type="button"
          lang={option.id}
          aria-pressed={language === option.id}
          onClick={() => setLanguage(option.id)}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
