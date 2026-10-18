import type { Localized, MedicalSource } from './types'

export const MEDICAL_SOURCES: MedicalSource[] = [
  {
    label: { en: 'Body temperature', th: 'อุณหภูมิร่างกาย' },
    url: 'https://medlineplus.gov/ency/article/001982.htm',
  },
  {
    label: { en: 'Abdominal pain', th: 'อาการปวดท้อง' },
    url: 'https://medlineplus.gov/ency/article/003120.htm',
  },
  {
    label: { en: 'Nausea & vomiting', th: 'คลื่นไส้และอาเจียน' },
    url: 'https://medlineplus.gov/nauseaandvomiting.html',
  },
  {
    label: { en: 'Cough advice', th: 'คำแนะนำเรื่องอาการไอ' },
    url: 'https://www.nhs.uk/symptoms/cough/',
  },
  {
    label: { en: 'Cuts & scrapes', th: 'แผลบาดและแผลถลอก' },
    url: 'https://www.mayoclinic.org/first-aid/first-aid-cuts/basics/art-20056711',
  },
  {
    label: { en: 'Emergency warning signs', th: 'สัญญาณเตือนฉุกเฉิน' },
    url: 'https://medlineplus.gov/ency/article/001927.htm',
  },
]

export type GuideId = 'help' | 'cause' | 'causes'

export type Guide = {
  title: Localized
  paragraphs: Localized[]
}

export const GUIDES: Record<GuideId, Guide> = {
  help: {
    title: { en: 'How to use QuickMedical', th: 'วิธีใช้ QuickMedical' },
    paragraphs: [
      {
        en: 'Choose a body area by selecting one of the rose-gold markers. Switch between front and back views, search for symptoms or body areas, and review the general causes and warning signs in the details panel.',
        th: 'เลือกบริเวณร่างกายด้วยจุดสีโรสโกลด์ สลับมุมมองด้านหน้าและด้านหลัง ค้นหาอาการหรือบริเวณร่างกาย แล้วอ่านสาเหตุทั่วไปและสัญญาณเตือนในแผงรายละเอียด',
      },
      {
        en: 'The information is educational and cannot diagnose a condition or replace professional medical advice.',
        th: 'ข้อมูลนี้จัดทำเพื่อการศึกษา ไม่สามารถวินิจฉัยโรคหรือใช้แทนคำแนะนำจากบุคลากรทางการแพทย์',
      },
    ],
  },
  cause: {
    title: { en: 'About this possible cause', th: 'เกี่ยวกับสาเหตุที่อาจเป็นไปได้นี้' },
    paragraphs: [
      {
        en: 'This item is one possible explanation associated with the selected symptom, not a diagnosis. The same symptom can occur for different reasons, and context such as duration, associated symptoms and medical history matters.',
        th: 'รายการนี้เป็นเพียงคำอธิบายหนึ่งที่อาจเกี่ยวข้องกับอาการที่เลือก ไม่ใช่การวินิจฉัย อาการเดียวกันอาจเกิดได้จากหลายสาเหตุ โดยต้องพิจารณาระยะเวลา อาการร่วม และประวัติสุขภาพ',
      },
    ],
  },
  causes: {
    title: { en: 'Common causes and context', th: 'สาเหตุทั่วไปและบริบท' },
    paragraphs: [
      {
        en: 'Common causes are shown to help you understand the range of possibilities. They are not ranked by likelihood for your individual situation and are not a substitute for clinical evaluation.',
        th: 'แสดงสาเหตุที่พบบ่อยเพื่อให้เข้าใจความเป็นไปได้ แต่ไม่ได้จัดอันดับตามโอกาสเกิดในกรณีเฉพาะของคุณ และไม่สามารถใช้แทนการประเมินทางคลินิก',
      },
    ],
  },
}
