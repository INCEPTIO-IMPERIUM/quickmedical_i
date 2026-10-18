import { defaultSideFor } from '../data/bodyAreas'
import type {
  AbdomenQualityId,
  AssociatedId,
  BodyAreaId,
  BodySide,
  DurationId,
  SensationId,
  Severity,
} from '../data/types'

export type BodyView = BodySide | 'both'

export type ExplorerState = {
  area: BodyAreaId | null
  view: BodyView
  zoom: number
  sensations: SensationId[]
  associated: AssociatedId[]
  abdomenQuality: AbdomenQualityId | null
  /** Raw text of the temperature field, in °C. */
  temperature: string
  duration: DurationId | null
  severity: Severity | null
}

export const MIN_ZOOM = 1
export const MAX_ZOOM = 2.25
const ZOOM_STEP = 0.2
const FOCUS_ZOOM = 1.55

export const initialExplorerState: ExplorerState = {
  area: null,
  view: 'both',
  zoom: MIN_ZOOM,
  sensations: [],
  associated: [],
  abdomenQuality: null,
  temperature: '',
  duration: null,
  severity: null,
}

export type ExplorerAction =
  /** `focus` switches to the area's side and zooms in on it; otherwise only `view` (if given) changes. */
  | { type: 'selectArea'; area: BodyAreaId; view?: BodySide; focus: boolean }
  | { type: 'clearArea' }
  | { type: 'setView'; view: BodyView }
  | { type: 'zoomIn' }
  | { type: 'zoomOut' }
  | { type: 'zoomFit' }
  | { type: 'zoomFocus' }
  | { type: 'toggleSensation'; id: SensationId }
  | { type: 'toggleAssociated'; id: AssociatedId }
  | { type: 'toggleAbdomenQuality'; id: AbdomenQualityId }
  | { type: 'setTemperature'; value: string }
  | { type: 'setDuration'; value: DurationId | null }
  | { type: 'toggleSeverity'; value: Severity }
  | { type: 'reset' }

function toggle<T>(list: T[], item: T): T[] {
  return list.includes(item) ? list.filter((x) => x !== item) : [...list, item]
}

function clampZoom(zoom: number): number {
  return Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, Math.round(zoom * 100) / 100))
}

export function explorerReducer(state: ExplorerState, action: ExplorerAction): ExplorerState {
  switch (action.type) {
    case 'selectArea': {
      const next: ExplorerState = {
        ...state,
        area: action.area,
        // The abdomen qualifier only applies while the abdomen is selected.
        abdomenQuality: action.area === 'abdomen' ? state.abdomenQuality : null,
      }
      if (action.focus) {
        return { ...next, view: action.view ?? defaultSideFor(action.area), zoom: FOCUS_ZOOM }
      }
      return action.view ? { ...next, view: action.view } : next
    }
    case 'clearArea':
      return { ...state, area: null, abdomenQuality: null, view: 'both', zoom: MIN_ZOOM }
    case 'setView':
      return { ...state, view: action.view }
    case 'zoomIn':
      return { ...state, zoom: clampZoom(state.zoom + ZOOM_STEP) }
    case 'zoomOut':
      return { ...state, zoom: clampZoom(state.zoom - ZOOM_STEP) }
    case 'zoomFit':
      return { ...state, zoom: MIN_ZOOM }
    case 'zoomFocus':
      if (!state.area) return state
      return {
        ...state,
        view: defaultSideFor(state.area),
        zoom: state.zoom > MIN_ZOOM ? state.zoom : 1.6,
      }
    case 'toggleSensation': {
      const sensations = toggle(state.sensations, action.id)
      // Removing "pain" also removes the abdominal pain quality that depends on it.
      const abdomenQuality = sensations.includes('pain') ? state.abdomenQuality : null
      return { ...state, sensations, abdomenQuality }
    }
    case 'toggleAssociated': {
      const associated = toggle(state.associated, action.id)
      // The temperature only belongs to the summary while fever is selected.
      const temperature = associated.includes('fever') ? state.temperature : ''
      return { ...state, associated, temperature }
    }
    case 'toggleAbdomenQuality': {
      const abdomenQuality = state.abdomenQuality === action.id ? null : action.id
      const sensations =
        abdomenQuality && !state.sensations.includes('pain') ? [...state.sensations, 'pain' as const] : state.sensations
      return { ...state, abdomenQuality, sensations }
    }
    case 'setTemperature':
      return { ...state, temperature: action.value }
    case 'setDuration':
      return { ...state, duration: action.value }
    case 'toggleSeverity':
      return { ...state, severity: state.severity === action.value ? null : action.value }
    case 'reset':
      return initialExplorerState
  }
}
