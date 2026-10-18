import { useRef, type Dispatch, type PointerEvent } from 'react'
import anatomyBack from '../assets/anatomy-back.webp'
import anatomyFront from '../assets/anatomy-front.webp'
import { BODY_AREAS, HOTSPOTS } from '../data/bodyAreas'
import type { BodySide } from '../data/types'
import type { MessageKey } from '../i18n/en'
import { usePreferences } from '../preferences/preferencesContext'
import { MIN_ZOOM, type BodyView, type ExplorerAction, type ExplorerState } from '../state/explorer'
import './BodyMap.css'

const FIGURES: { side: BodySide; image: string; label: MessageKey; alt: MessageKey }[] = [
  { side: 'front', image: anatomyFront, label: 'map.frontLabel', alt: 'map.frontAlt' },
  { side: 'back', image: anatomyBack, label: 'map.backLabel', alt: 'map.backAlt' },
]

const VIEWS: { id: BodyView; label: MessageKey }[] = [
  { id: 'both', label: 'map.viewBoth' },
  { id: 'front', label: 'map.viewFront' },
  { id: 'back', label: 'map.viewBack' },
]

type BodyMapProps = {
  state: ExplorerState
  dispatch: Dispatch<ExplorerAction>
}

export function BodyMap({ state, dispatch }: BodyMapProps) {
  const { t, l } = usePreferences()
  const stageRef = useRef<HTMLDivElement>(null)
  const zoomed = state.zoom > MIN_ZOOM
  // Zoom applies to one figure: the back figure in the back view, otherwise the front figure.
  const zoomSide: BodySide = state.view === 'back' ? 'back' : 'front'

  function figureTransform(side: BodySide): string {
    const tilt = 'rotateY(calc(var(--tilt-y, 0) * 1deg)) rotateX(calc(var(--tilt-x, 0) * 1deg))'
    if (side !== zoomSide || !zoomed) return tilt
    // Percent translations are relative to the figure's own size, so the selected marker moves to the centre.
    const marker = HOTSPOTS[side].find((spot) => spot.area === state.area)
    const tx = marker ? -(marker.x / 100 - 0.5) * state.zoom * 100 : 0
    const ty = marker ? -(marker.y / 100 - 0.5) * state.zoom * 100 : 0
    return `translate(${tx}%, ${ty}%) scale(${state.zoom})`
  }

  // A gentle hover tilt, written to CSS variables so pointer moves do not re-render React.
  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const stage = stageRef.current
    if (!stage || event.pointerType === 'touch' || zoomed) return
    const rect = stage.getBoundingClientRect()
    stage.style.setProperty('--tilt-y', String(((event.clientX - rect.left) / rect.width - 0.5) * 4))
    stage.style.setProperty('--tilt-x', String(-((event.clientY - rect.top) / rect.height - 0.5) * 2.4))
  }

  function resetTilt() {
    stageRef.current?.style.removeProperty('--tilt-x')
    stageRef.current?.style.removeProperty('--tilt-y')
  }

  return (
    <section className="body-panel panel" aria-label={t('map.panelLabel')}>
      <div className="body-head">
        <div>
          <div className="tiny-label">
            <span className="accent">✳</span>&nbsp; {t('map.kicker')}
          </div>
          <h1>{t('map.heading')}</h1>
          <p>{t('map.intro')}</p>
        </div>
        <div className="body-controls" role="group" aria-label={t('map.viewGroup')}>
          {VIEWS.map((view) => (
            <button
              key={view.id}
              type="button"
              className={`view-btn${state.view === view.id ? ' active' : ''}`}
              aria-pressed={state.view === view.id}
              onClick={() => dispatch({ type: 'setView', view: view.id })}
            >
              {t(view.label)}
            </button>
          ))}
        </div>
      </div>

      <div className="zoom-toolbar" role="group" aria-label={t('map.zoomGroup')}>
        <span className="zoom-hint">
          <span className="zoom-mark" aria-hidden="true">
            ⌕
          </span>{' '}
          {t('map.zoomHint')}
        </span>
        <div className="zoom-controls">
          <button
            type="button"
            className="zoom-focus"
            title={t('map.focusSelectedHint')}
            disabled={!state.area}
            onClick={() => dispatch({ type: 'zoomFocus' })}
          >
            {t('map.focusSelected')}
          </button>
          <button
            type="button"
            aria-label={t('map.zoomOut')}
            title={t('map.zoomOut')}
            disabled={!zoomed}
            onClick={() => dispatch({ type: 'zoomOut' })}
          >
            −
          </button>
          <span className="zoom-level" aria-live="polite">
            {Math.round(state.zoom * 100)}%
          </span>
          <button
            type="button"
            aria-label={t('map.zoomIn')}
            title={t('map.zoomIn')}
            onClick={() => dispatch({ type: 'zoomIn' })}
          >
            +
          </button>
          <button type="button" title={t('map.fitHint')} disabled={!zoomed} onClick={() => dispatch({ type: 'zoomFit' })}>
            {t('map.fit')}
          </button>
        </div>
      </div>

      <div
        ref={stageRef}
        className={`anatomy-stage${state.view === 'both' ? '' : ' single-view'}`}
        onPointerMove={handlePointerMove}
        onPointerLeave={resetTilt}
      >
        <div className="orbit" />
        <div className="scan-line" />
        {FIGURES.map((figure) => {
          const hidden = state.view !== 'both' && state.view !== figure.side
          return (
            <div
              key={figure.side}
              className={`model-wrap${hidden ? ' hidden-view' : ''}${zoomed && figure.side === zoomSide ? ' zoom-target' : ''}`}
            >
              <div className="model-label">{t(figure.label)}</div>
              <div className="figure" style={{ transform: figureTransform(figure.side) }}>
                <img src={figure.image} alt={t(figure.alt)} draggable={false} />
                {HOTSPOTS[figure.side].map((spot) => {
                  const active = state.area === spot.area
                  const label = l(BODY_AREAS[spot.area].label)
                  return (
                    <button
                      key={spot.area}
                      type="button"
                      className={`hotspot${active ? ' active' : ''}`}
                      style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                      aria-label={t('map.selectArea', { area: label })}
                      aria-pressed={active}
                      onClick={() => dispatch({ type: 'selectArea', area: spot.area, view: figure.side, focus: true })}
                    >
                      <span aria-hidden="true">{label}</span>
                    </button>
                  )
                })}
              </div>
              <div className="ground-ring" />
            </div>
          )
        })}
      </div>

      <div className="model-footnote">
        <span className="footnote-status">
          <i /> {t('map.referenceLoaded')}
        </span>
        <span>
          <span className="accent">●</span> {t('map.selectedArea')}
          <span className="footnote-hint">{t('map.tapMarker')}</span>
        </span>
      </div>
    </section>
  )
}
