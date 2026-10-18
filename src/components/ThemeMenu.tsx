import { useEffect, useRef, useState } from 'react'
import type { MessageKey } from '../i18n/en'
import { usePreferences, type Theme } from '../preferences/preferencesContext'

const THEMES: { id: Theme; name: MessageKey; hint: MessageKey; swatch: string }[] = [
  { id: 'soft-light', name: 'theme.light', hint: 'theme.lightHint', swatch: 'swatch-light' },
  { id: 'warm-dark', name: 'theme.dark', hint: 'theme.darkHint', swatch: 'swatch-dark' },
]

export function ThemeMenu() {
  const { theme, setTheme, t } = usePreferences()
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    wrapRef.current?.querySelector<HTMLButtonElement>('[aria-checked="true"]')?.focus()

    function onPointerDown(event: PointerEvent) {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false)
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Escape') return
      setOpen(false)
      triggerRef.current?.focus()
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  function choose(next: Theme) {
    setTheme(next)
    setOpen(false)
    triggerRef.current?.focus()
  }

  return (
    <div className="theme-picker-wrap" ref={wrapRef}>
      <button
        ref={triggerRef}
        type="button"
        className="round-action"
        aria-label={t('theme.toggle')}
        title={t('theme.toggle')}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls="theme-menu"
        onClick={() => setOpen((value) => !value)}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M12 2v2m0 16v2M4.93 4.93l1.4 1.4m11.34 11.34 1.4 1.4M2 12h2m16 0h2M4.93 19.07l1.4-1.4M17.67 6.33l1.4-1.4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
      <div className="theme-menu" id="theme-menu" role="menu" aria-label={t('theme.heading')} hidden={!open}>
        <div className="theme-menu-heading" aria-hidden="true">
          {t('theme.heading')}
        </div>
        {THEMES.map((option) => (
          <button
            key={option.id}
            type="button"
            className="theme-option"
            role="menuitemradio"
            aria-checked={theme === option.id}
            onClick={() => choose(option.id)}
          >
            <span className={`theme-swatch ${option.swatch}`} aria-hidden="true" />
            <span className="theme-copy">
              <strong>{t(option.name)}</strong>
              <small>{t(option.hint)}</small>
            </span>
            <span className="theme-check" aria-hidden="true">
              ✓
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
