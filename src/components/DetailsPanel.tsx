import type { Dispatch } from 'react'
import { BODY_AREAS } from '../data/bodyAreas'
import { MEDICAL_SOURCES } from '../data/sources'
import type { Localized } from '../data/types'
import { usePreferences } from '../preferences/preferencesContext'
import type { ExplorerAction, ExplorerState } from '../state/explorer'
import { getGuidance, getSummaryText, getSymptomTitle, hasAnySelection } from '../state/insights'
import type { GuideRequest } from './GuideDialog'
import { QuickCheckForm } from './QuickCheckForm'
import './DetailsPanel.css'

type DetailsPanelProps = {
  state: ExplorerState
  dispatch: Dispatch<ExplorerAction>
  onOpenGuide: (request: GuideRequest) => void
}

export function DetailsPanel({ state, dispatch, onOpenGuide }: DetailsPanelProps) {
  const preferences = usePreferences()
  const { t, l } = preferences
  const area = state.area ? BODY_AREAS[state.area] : null
  const guidance = getGuidance(state)
  const anySelection = hasAnySelection(state)

  let category: string | null = null
  let description = t('selected.emptyDescription')
  if (area) {
    category = l(area.system)
    description = l(area.description)
  } else if (anySelection) {
    category = t('selected.general')
    description = t('selected.generalDescription')
  }

  return (
    <aside className="details-panel panel" aria-label={t('details.panelLabel')}>
      <div className="details-top">
        <button type="button" className="back-link" onClick={() => dispatch({ type: 'clearArea' })}>
          <span aria-hidden="true">‹</span> {t('details.resetBody')}
        </button>
        <button
          type="button"
          className="close-button"
          aria-label={t('details.clearArea')}
          disabled={!area}
          onClick={() => dispatch({ type: 'clearArea' })}
        >
          ×
        </button>
      </div>

      <QuickCheckForm state={state} dispatch={dispatch} />

      <div className="selected-summary">
        <div className="tiny-label">
          <span className="dot" aria-hidden="true" /> {t('selected.kicker')}
        </div>
        <div className="symptom-title-row">
          <span className="symptom-symbol" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 3v18M3 12h18" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </span>
          <div>
            <h2 className="symptom-title" aria-live="polite">
              {getSymptomTitle(state, preferences)}
            </h2>
            {category && <span className="category-tag">✳ {category}</span>}
          </div>
        </div>
        <p className="detail-copy">{description}</p>
      </div>

      <div className="summary-result">
        <div className="summary-copy" aria-live="polite">
          <div className="tiny-label">{t('summary.kicker')}</div>
          <p>{getSummaryText(state, preferences)}</p>
          {anySelection && <span>{t('summary.hint')}</span>}
        </div>
        <div className={`guidance-note${guidance.length ? ' urgent' : ''}`} role={guidance.length ? 'alert' : undefined}>
          <strong>{guidance.length ? t('guidance.seekCare') : t('guidance.keepInMind')}</strong>
          <span>{guidance.length ? guidance.map((key) => t(key)).join(' ') : t('guidance.keepInMindBody')}</span>
        </div>
      </div>

      {area && (
        <div className="detail-section">
          <div className="section-head">
            <h3>
              <span className="mini-icon" aria-hidden="true">
                ◎
              </span>{' '}
              {t('causes.heading')}
            </h3>
            <button type="button" className="text-link" onClick={() => onOpenGuide({ guide: 'causes' })}>
              {t('causes.viewAll')}
            </button>
          </div>
          <div className="chip-list">
            {area.causes.map((cause: Localized) => (
              <button
                key={cause.en}
                type="button"
                className="condition-chip"
                onClick={() => onOpenGuide({ guide: 'cause', cause })}
              >
                {l(cause)}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="redflags" id="red-flags">
        <div className="section-head">
          <h3>
            <span className="warning-icon" aria-hidden="true">
              !
            </span>{' '}
            {t('flags.heading')}
          </h3>
          <span className="warning-label">{t('flags.label')}</span>
        </div>
        <ul className="flag-list">
          {area ? (
            area.flags.map((flag) => (
              <li key={flag.en} className="flag">
                {l(flag)}
              </li>
            ))
          ) : (
            <li className="flag">{t('flags.general')}</li>
          )}
        </ul>
        <p className="urgent-note">{t('flags.note')}</p>
      </div>

      <div className="medical-sources" id="medical-sources">
        <div className="tiny-label">{t('sources.heading')}</div>
        <div className="source-links">
          {MEDICAL_SOURCES.map((source) => (
            <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer">
              {l(source.label)} <span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </div>
    </aside>
  )
}
