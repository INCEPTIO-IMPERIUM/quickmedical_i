import { BODY_AREAS, BODY_AREA_ORDER } from '../data/bodyAreas'
import {
  ABDOMEN_QUALITIES,
  ASSOCIATED_SYMPTOMS,
  DURATIONS,
  FEVER_THRESHOLD_C,
  SENSATIONS,
  SEVERITIES,
  TEMPERATURE_RANGE_C,
} from '../data/symptoms'
import type { BodyAreaId } from '../data/types'
import type { MessageKey } from '../i18n/en'
import type { Preferences } from '../preferences/preferencesContext'
import type { ExplorerState } from './explorer'

type Translate = Pick<Preferences, 't' | 'l'>

export type TemperatureReading =
  | { status: 'empty' }
  | { status: 'out-of-range' }
  | { status: 'normal' | 'fever'; celsius: number }

export function readTemperature(raw: string): TemperatureReading {
  const text = raw.trim()
  if (text === '') return { status: 'empty' }
  const celsius = Number(text)
  if (!Number.isFinite(celsius) || celsius < TEMPERATURE_RANGE_C.min || celsius > TEMPERATURE_RANGE_C.max) {
    return { status: 'out-of-range' }
  }
  return { status: celsius >= FEVER_THRESHOLD_C ? 'fever' : 'normal', celsius }
}

/**
 * Safety messages for the current selections, most urgent first.
 * Prototype rules: they must be reviewed by a health professional before real-world use (spec §4.8).
 */
export function getGuidance(state: ExplorerState): MessageKey[] {
  const { associated, sensations, severity, area } = state
  const messages: MessageKey[] = []
  if (associated.includes('breathing')) messages.push('guidance.breathing')
  if (associated.includes('chest-pressure')) messages.push('guidance.chestPressure')
  if (associated.includes('blood')) messages.push('guidance.blood')
  if (associated.includes('vomiting') && associated.includes('unable-fluids')) messages.push('guidance.dehydration')
  if (severity === 'severe') messages.push(area === 'abdomen' ? 'guidance.severeAbdomen' : 'guidance.severe')
  if (sensations.includes('cut')) messages.push('guidance.wound')
  if (sensations.includes('numb')) messages.push('guidance.numbness')
  return messages
}

export function hasAnySelection(state: ExplorerState): boolean {
  return (
    state.area !== null ||
    state.sensations.length > 0 ||
    state.associated.length > 0 ||
    state.duration !== null ||
    state.severity !== null
  )
}

function abdomenQualityFor(state: ExplorerState) {
  if (state.area !== 'abdomen' || !state.sensations.includes('pain')) return null
  return ABDOMEN_QUALITIES.find((quality) => quality.id === state.abdomenQuality) ?? null
}

/** Heading of the "Selected symptom" block. */
export function getSymptomTitle(state: ExplorerState, { t, l }: Translate): string {
  if (!state.area) return hasAnySelection(state) ? t('selected.general') : t('selected.emptyTitle')

  const quality = abdomenQualityFor(state)
  if (quality) return l(quality.title)

  const region = l(BODY_AREAS[state.area].region)
  if (state.sensations.length === 0) return l(BODY_AREAS[state.area].title)
  const first = SENSATIONS.find((sensation) => sensation.id === state.sensations[0])
  return first ? l(first.titleTemplate, { region }) : region
}

/** One-line, neutral summary the user can show to a healthcare professional. */
export function getSummaryText(state: ExplorerState, { t, l }: Translate): string {
  if (!hasAnySelection(state)) return t('summary.empty')

  const pieces: string[] = []

  if (state.area) {
    pieces.push(l(BODY_AREAS[state.area].region))
    const sensations = SENSATIONS.filter((sensation) => state.sensations.includes(sensation.id))
    const quality = abdomenQualityFor(state)
    const labels = sensations
      .filter((sensation) => !(quality && sensation.id === 'pain'))
      .map((sensation) => l(sensation.summaryLabel))
    if (quality) labels.unshift(l(quality.title))
    pieces.push(labels.length ? labels.join(', ') : t('summary.noSensation'))
  } else if (state.sensations.length > 0) {
    pieces.push(
      SENSATIONS.filter((sensation) => state.sensations.includes(sensation.id))
        .map((sensation) => l(sensation.summaryLabel))
        .join(', '),
    )
  }

  const others = ASSOCIATED_SYMPTOMS.filter((option) => state.associated.includes(option.id))
  if (others.length) pieces.push(t('summary.other', { list: others.map((option) => l(option.label)).join(', ') }))

  const reading = readTemperature(state.temperature)
  if (state.associated.includes('fever') && (reading.status === 'normal' || reading.status === 'fever')) {
    pieces.push(t('summary.temperature', { value: reading.celsius.toFixed(1) }))
  }

  const severity = SEVERITIES.find((option) => option.id === state.severity)
  if (severity) pieces.push(t('summary.severity', { value: l(severity.label) }))

  const duration = DURATIONS.find((option) => option.id === state.duration)
  if (duration) pieces.push(t('summary.duration', { value: l(duration.label) }))

  return pieces.join(' · ')
}

function normalize(text: string): string {
  return text.toLocaleLowerCase().replace(/\s+/g, ' ').trim()
}

/** First body area whose names or common causes match the query, in either language. */
export function searchBodyArea(query: string): BodyAreaId | null {
  const q = normalize(query)
  if (q.length < 2) return null
  for (const id of BODY_AREA_ORDER) {
    const area = BODY_AREAS[id]
    const texts = [area.label, area.optionLabel, area.title, area.region, area.system, ...area.causes]
    const haystack = normalize([id, ...texts.flatMap((text) => [text.en, text.th])].join(' '))
    if (haystack.includes(q)) return id
  }
  return null
}
