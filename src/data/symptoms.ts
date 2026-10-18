import type { AbdomenQualityId, AssociatedId, DurationId, Localized, SensationId, Severity } from './types'

export type SensationOption = {
  id: SensationId
  /** Text on the choice pill. */
  label: Localized
  /** Text used in the symptom summary line. */
  summaryLabel: Localized
  /** Heading template; `{region}` is replaced with the selected region name. */
  titleTemplate: Localized
}

export const SENSATIONS: SensationOption[] = [
  {
    id: 'pain',
    label: { en: 'Pain', th: 'ปวด' },
    summaryLabel: { en: 'Pain', th: 'ปวด' },
    titleTemplate: { en: '{region} pain', th: 'ปวด{region}' },
  },
  {
    id: 'soreness',
    label: { en: 'Sore / ache', th: 'ปวดเมื่อย' },
    summaryLabel: { en: 'Sore / aching', th: 'ปวดเมื่อย' },
    titleTemplate: { en: '{region} soreness', th: 'ปวดเมื่อยบริเวณ{region}' },
  },
  {
    id: 'numb',
    label: { en: 'Numb / tingling', th: 'ชา / เสียวซ่า' },
    summaryLabel: { en: 'Numbness / tingling', th: 'อาการชา / เสียวซ่า' },
    titleTemplate: { en: '{region} numbness', th: 'อาการชาบริเวณ{region}' },
  },
  {
    id: 'burning',
    label: { en: 'Burning', th: 'แสบร้อน' },
    summaryLabel: { en: 'Burning sensation', th: 'รู้สึกแสบร้อน' },
    titleTemplate: { en: '{region} burning sensation', th: 'อาการแสบร้อนบริเวณ{region}' },
  },
  {
    id: 'swelling',
    label: { en: 'Swelling', th: 'บวม' },
    summaryLabel: { en: 'Swelling', th: 'บวม' },
    titleTemplate: { en: '{region} swelling', th: 'อาการบวมบริเวณ{region}' },
  },
  {
    id: 'cut',
    label: { en: 'Cut / open wound', th: 'แผลบาด / แผลเปิด' },
    summaryLabel: { en: 'Cut / open wound', th: 'แผลบาด / แผลเปิด' },
    titleTemplate: { en: '{region} wound', th: 'แผลบริเวณ{region}' },
  },
  {
    id: 'rash',
    label: { en: 'Rash / itching', th: 'ผื่น / คัน' },
    summaryLabel: { en: 'Rash / itching', th: 'ผื่น / คัน' },
    titleTemplate: { en: '{region} rash / itching', th: 'ผื่น / คันบริเวณ{region}' },
  },
]

export type AssociatedOption = {
  id: AssociatedId
  label: Localized
  /** Shown before the "More" toggle is opened. */
  alwaysVisible: boolean
}

export const ASSOCIATED_SYMPTOMS: AssociatedOption[] = [
  { id: 'fever', label: { en: 'Fever / high temperature', th: 'ไข้ / อุณหภูมิสูง' }, alwaysVisible: true },
  { id: 'cough', label: { en: 'Cough', th: 'ไอ' }, alwaysVisible: true },
  { id: 'vomiting', label: { en: 'Nausea / vomiting', th: 'คลื่นไส้ / อาเจียน' }, alwaysVisible: true },
  { id: 'dizziness', label: { en: 'Dizziness', th: 'เวียนศีรษะ' }, alwaysVisible: false },
  { id: 'breathing', label: { en: 'Difficulty breathing', th: 'หายใจลำบาก' }, alwaysVisible: false },
  { id: 'chest-pressure', label: { en: 'Chest pressure', th: 'แน่นหน้าอก' }, alwaysVisible: false },
  { id: 'blood', label: { en: 'Blood in vomit / stool', th: 'มีเลือดในอาเจียน / อุจจาระ' }, alwaysVisible: false },
  {
    id: 'unable-fluids',
    label: { en: 'Unable to keep fluids down', th: 'ดื่มน้ำแล้วอาเจียนออกหมด' },
    alwaysVisible: false,
  },
]

export type AbdomenQualityOption = {
  id: AbdomenQualityId
  label: Localized
  /** Heading used when this quality is chosen together with pain. */
  title: Localized
}

export const ABDOMEN_QUALITIES: AbdomenQualityOption[] = [
  {
    id: 'cramping',
    label: { en: 'Cramping / gripping', th: 'ปวดบิด / เกร็ง' },
    title: { en: 'Cramping abdominal pain', th: 'ปวดท้องบิด' },
  },
  {
    id: 'burning',
    label: { en: 'Burning', th: 'แสบร้อน' },
    title: { en: 'Burning abdominal pain', th: 'ปวดท้องแสบร้อน' },
  },
  {
    id: 'sharp',
    label: { en: 'Sharp', th: 'ปวดแปลบ' },
    title: { en: 'Sharp abdominal pain', th: 'ปวดท้องแบบแปลบ' },
  },
  {
    id: 'dull',
    label: { en: 'Dull / aching', th: 'ปวดตื้อ / ปวดเมื่อย' },
    title: { en: 'Dull abdominal pain', th: 'ปวดท้องตื้อ ๆ' },
  },
  {
    id: 'intermittent',
    label: { en: 'Comes and goes', th: 'เป็น ๆ หาย ๆ' },
    title: { en: 'Abdominal pain that comes and goes', th: 'อาการปวดท้องเป็น ๆ หาย ๆ' },
  },
]

export const DURATIONS: { id: DurationId; label: Localized }[] = [
  { id: 'just-started', label: { en: 'Just started', th: 'เพิ่งเริ่ม' } },
  { id: 'today', label: { en: 'Today', th: 'วันนี้' } },
  { id: '1-3-days', label: { en: '1–3 days', th: '1–3 วัน' } },
  { id: '4-7-days', label: { en: '4–7 days', th: '4–7 วัน' } },
  { id: 'over-a-week', label: { en: 'More than a week', th: 'มากกว่า 1 สัปดาห์' } },
  { id: 'comes-and-goes', label: { en: 'Comes and goes', th: 'เป็น ๆ หาย ๆ' } },
]

export const SEVERITIES: { id: Severity; label: Localized }[] = [
  { id: 'mild', label: { en: 'Mild', th: 'เล็กน้อย' } },
  { id: 'moderate', label: { en: 'Moderate', th: 'ปานกลาง' } },
  { id: 'severe', label: { en: 'Severe', th: 'รุนแรง' } },
]

/** Accepted range for a measured body temperature, in °C. */
export const TEMPERATURE_RANGE_C = { min: 30, max: 45 } as const
export const FEVER_THRESHOLD_C = 38
