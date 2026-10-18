import { useState } from 'react'
import type { BodyAreaId } from '../data/types'
import { usePreferences } from '../preferences/preferencesContext'
import { searchBodyArea } from '../state/insights'
import { LanguageSwitch } from './LanguageSwitch'
import { ThemeMenu } from './ThemeMenu'
import './Header.css'

type HeaderProps = {
  onSearchMatch: (area: BodyAreaId) => void
  onOpenHelp: () => void
}

export function Header({ onSearchMatch, onOpenHelp }: HeaderProps) {
  const { t } = usePreferences()
  const [query, setQuery] = useState('')
  const noMatch = query.trim().length >= 2 && searchBodyArea(query) === null

  function handleSearch(value: string) {
    setQuery(value)
    const match = searchBodyArea(value)
    if (match) onSearchMatch(match)
  }

  return (
    <header className="app-header">
      <div className="header-inner">
        <a className="brand" href="#top" aria-label={t('brand.home')}>
          <span className="brand-mark">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 4v16M4 12h16" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
            </svg>
          </span>
          <span className="brand-word">
            Quick<span>Medical</span>
          </span>
          <span className="brand-sub">
            {t('brand.tagline')}
            <br />
            <span className="brand-sub-line">{t('brand.subTagline')}</span>
          </span>
        </a>

        <nav className="nav" aria-label={t('nav.label')}>
          <a className="active" href="#explore">
            {t('nav.explore')}
          </a>
          <a href="#medical-sources">{t('nav.sources')}</a>
          <a href="#red-flags">{t('nav.seekCare')}</a>
        </nav>

        <div className="header-search" role="search">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="10.8" cy="10.8" r="6.8" stroke="currentColor" strokeWidth="1.7" />
            <path d="m16 16 4.5 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(event) => handleSearch(event.target.value)}
            placeholder={t('search.placeholder')}
            aria-label={t('search.label')}
            aria-describedby={noMatch ? 'search-no-match' : undefined}
            autoComplete="off"
          />
          {noMatch && (
            <p id="search-no-match" className="search-no-match" role="status">
              {t('search.noMatch')}
            </p>
          )}
        </div>

        <div className="header-actions">
          <ThemeMenu />
          <LanguageSwitch />
          <button type="button" className="round-action" onClick={onOpenHelp} aria-label={t('help.open')} title={t('help.open')}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
              <path
                d="M9.6 9a2.5 2.5 0 1 1 4.4 1.6c-1 .9-2 1.1-2 2.4M12 16.7h.01"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <span className="avatar" aria-hidden="true">
            QM
          </span>
          <span className="hello">{t('header.hello')}</span>
        </div>
      </div>
    </header>
  )
}
