import { useState, type Dispatch } from 'react'
import { BODY_AREA_ORDER, BODY_AREAS } from '../data/bodyAreas'
import { ABDOMEN_QUALITIES, ASSOCIATED_SYMPTOMS, DURATIONS, SENSATIONS, SEVERITIES, TEMPERATURE_RANGE_C } from '../data/symptoms'
import type { BodyAreaId, DurationId } from '../data/types'
import type { MessageKey } from '../i18n/en'
import { usePreferences } from '../preferences/preferencesContext'
import type { ExplorerAction, ExplorerState } from '../state/explorer'
import { readTemperature } from '../state/insights'

type QuickCheckFormProps = {
  state: ExplorerState
  dispatch: Dispatch<ExplorerAction>
}

const TEMPERATURE_NOTES: Record<ReturnType<typeof readTemperature>['status'], MessageKey> = {
  empty: 'temperature.default',
  normal: 'temperature.default',
  fever: 'temperature.fever',
  'out-of-range': 'temperature.outOfRange',
}

export function QuickCheckForm({ state, dispatch }: QuickCheckFormProps) {
  const { t, l } = usePreferences()
  const [showAllAssociated, setShowAllAssociated] = useState(false)
  const temperature = readTemperature(state.temperature)
  // Selected symptoms stay visible even when the list is collapsed.
  const visibleAssociated = ASSOCIATED_SYMPTOMS.filter(
    (option) => showAllAssociated || option.alwaysVisible || state.associated.includes(option.id),
  )

  function reset() {
    setShowAllAssociated(false)
    dispatch({ type: 'reset' })
  }

  return (
    <section className="quick-check-panel" aria-labelledby="quick-check-title">
      <div className="quick-check-heading">
        <div>
          <div className="tiny-label">
            <span className="accent">✳</span> {t('form.kicker')}
          </div>
          <h2 id="quick-check-title">{t('form.heading')}</h2>
        </div>
        <span className="quick-note">{t('form.selectOnly')}</span>
      </div>

      <div className="quick-field">
        <label htmlFor="area-select">{t('form.bodyArea')}</label>
        <select
          id="area-select"
          className="form-select"
          value={state.area ?? ''}
          onChange={(event) => {
            const area = event.target.value as BodyAreaId | ''
            dispatch(area ? { type: 'selectArea', area, focus: true } : { type: 'clearArea' })
          }}
        >
          <option value="">{t('form.chooseArea')}</option>
          {BODY_AREA_ORDER.map((id) => (
            <option key={id} value={id}>
              {l(BODY_AREAS[id].optionLabel)}
            </option>
          ))}
        </select>
      </div>

      <fieldset className="quick-field">
        <legend>{t('form.symptomType')}</legend>
        <div className="choice-list">
          {SENSATIONS.map((option) => {
            const on = state.sensations.includes(option.id)
            return (
              <button
                key={option.id}
                type="button"
                className={`choice-pill${on ? ' active' : ''}`}
                aria-pressed={on}
                onClick={() => dispatch({ type: 'toggleSensation', id: option.id })}
              >
                {l(option.label)}
              </button>
            )
          })}
        </div>
        {state.area === 'abdomen' && (
          <div className="abdomen-qualities">
            <div className="qualifier-title" id="abdomen-quality-title">
              {t('form.abdomenQuality')}
            </div>
            <div className="choice-list" role="group" aria-labelledby="abdomen-quality-title">
              {ABDOMEN_QUALITIES.map((option) => {
                const on = state.abdomenQuality === option.id
                return (
                  <button
                    key={option.id}
                    type="button"
                    className={`choice-pill${on ? ' active' : ''}`}
                    aria-pressed={on}
                    onClick={() => dispatch({ type: 'toggleAbdomenQuality', id: option.id })}
                  >
                    {l(option.label)}
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </fieldset>

      <div className="quick-field" role="group" aria-labelledby="other-symptoms-title">
        <div className="quick-field-heading">
          <span className="field-title" id="other-symptoms-title">
            {t('form.otherSymptoms')} <span>{t('form.optional')}</span>
          </span>
          <button
            type="button"
            className="toggle-more"
            aria-expanded={showAllAssociated}
            onClick={() => setShowAllAssociated((value) => !value)}
          >
            {showAllAssociated ? t('form.less') : t('form.more')}
          </button>
        </div>
        <div className="choice-list">
          {visibleAssociated.map((option) => {
            const on = state.associated.includes(option.id)
            return (
              <button
                key={option.id}
                type="button"
                className={`choice-pill${on ? ' active' : ''}`}
                aria-pressed={on}
                onClick={() => dispatch({ type: 'toggleAssociated', id: option.id })}
              >
                {l(option.label)}
              </button>
            )
          })}
        </div>
        {state.associated.includes('fever') && (
          <div className="temperature-slot">
            <div className="temperature-row">
              <label htmlFor="temperature-input" className="temperature-label">
                {t('form.temperature')} <span>°C</span>
              </label>
              <input
                id="temperature-input"
                className="temperature-input"
                type="number"
                min={TEMPERATURE_RANGE_C.min}
                max={TEMPERATURE_RANGE_C.max}
                step="0.1"
                inputMode="decimal"
                placeholder="e.g. 38.2"
                aria-describedby="temperature-note"
                aria-invalid={temperature.status === 'out-of-range'}
                value={state.temperature}
                onChange={(event) => dispatch({ type: 'setTemperature', value: event.target.value })}
              />
            </div>
            <p id="temperature-note" className={`temperature-note is-${temperature.status}`}>
              {t(TEMPERATURE_NOTES[temperature.status])}
            </p>
          </div>
        )}
      </div>

      <div className="quick-meta-row">
        <div className="quick-field">
          <label htmlFor="duration-select">
            {t('form.duration')} <span>{t('form.optional')}</span>
          </label>
          <select
            id="duration-select"
            className="form-select"
            value={state.duration ?? ''}
            onChange={(event) =>
              dispatch({ type: 'setDuration', value: (event.target.value || null) as DurationId | null })
            }
          >
            <option value="">{t('form.notSpecified')}</option>
            {DURATIONS.map((option) => (
              <option key={option.id} value={option.id}>
                {l(option.label)}
              </option>
            ))}
          </select>
        </div>
        <fieldset className="quick-field">
          <legend>
            {t('form.severity')} <span>{t('form.optional')}</span>
          </legend>
          <div className="severity-options">
            {SEVERITIES.map((option) => {
              const on = state.severity === option.id
              return (
                <button
                  key={option.id}
                  type="button"
                  className={`severity-choice severity-${option.id}${on ? ' active' : ''}`}
                  aria-pressed={on}
                  onClick={() => dispatch({ type: 'toggleSeverity', value: option.id })}
                >
                  <span className="sev-dot" aria-hidden="true" />
                  {l(option.label)}
                </button>
              )
            })}
          </div>
        </fieldset>
      </div>

      <div className="quick-form-footer">
        <span>{t('form.autoUpdates')}</span>
        <button type="button" className="secondary-button" onClick={reset}>
          {t('form.clear')}
        </button>
      </div>
    </section>
  )
}
