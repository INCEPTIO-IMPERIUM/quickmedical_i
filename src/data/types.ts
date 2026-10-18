export type Language = 'en' | 'th'

/** A piece of content that exists in every supported language. */
export type Localized = Record<Language, string>

export type BodyAreaId =
  | 'head'
  | 'shoulder'
  | 'chest'
  | 'arm'
  | 'hand'
  | 'abdomen'
  | 'hip'
  | 'knee'
  | 'lower-leg'
  | 'upper-back'
  | 'lower-back'

export type BodySide = 'front' | 'back'

export type BodyArea = {
  id: BodyAreaId
  /** Short marker label, e.g. "Knee". */
  label: Localized
  /** Option text in the body-area list, e.g. "Calf / shin". */
  optionLabel: Localized
  /** Heading shown when the area is selected, e.g. "Knee pain". */
  title: Localized
  /** Anatomical region name used inside generated titles, e.g. "Knee joint". */
  region: Localized
  system: Localized
  description: Localized
  causes: Localized[]
  flags: Localized[]
  anatomy: Localized
}

export type Hotspot = {
  area: BodyAreaId
  /** Marker position as a percentage of the figure's width and height. */
  x: number
  y: number
}

export type SensationId = 'pain' | 'soreness' | 'numb' | 'burning' | 'swelling' | 'cut' | 'rash'

export type AssociatedId =
  | 'fever'
  | 'cough'
  | 'vomiting'
  | 'dizziness'
  | 'breathing'
  | 'chest-pressure'
  | 'blood'
  | 'unable-fluids'

export type AbdomenQualityId = 'cramping' | 'burning' | 'sharp' | 'dull' | 'intermittent'

export type DurationId = 'just-started' | 'today' | '1-3-days' | '4-7-days' | 'over-a-week' | 'comes-and-goes'

export type Severity = 'mild' | 'moderate' | 'severe'

export type MedicalSource = {
  label: Localized
  url: string
}
