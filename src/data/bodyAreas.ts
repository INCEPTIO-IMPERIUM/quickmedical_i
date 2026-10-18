import type { BodyArea, BodyAreaId, BodySide, Hotspot, Localized } from './types'

/**
 * Medical content carried over unchanged from the HTML prototype
 * (.claude/template/quickmedical_theme_language.html).
 *
 * Spec §4.8 and §9: causes and warning signs must be reviewed by a qualified
 * health professional, with a source and review date, before real-world use.
 */
export const MEDICAL_CONTENT_REVIEW = {
  status: 'unreviewed',
  origin: 'HTML prototype',
} as const

const causes = {
  muscleStrain: { en: 'Muscle strain', th: 'กล้ามเนื้อตึงหรือบาดเจ็บ' },
  overuse: { en: 'Overuse', th: 'ใช้งานมากเกินไป' },
  jointIrritation: { en: 'Joint irritation', th: 'ข้อต่อระคายเคือง' },
  arthritis: { en: 'Arthritis', th: 'ข้ออักเสบ' },
  bursitis: { en: 'Bursitis', th: 'ถุงน้ำรอบข้ออักเสบ' },
  tension: { en: 'Tension', th: 'ความตึงเครียด' },
  migraine: { en: 'Migraine', th: 'ไมเกรน' },
  dehydration: { en: 'Dehydration', th: 'ภาวะขาดน้ำ' },
  sinus: { en: 'Sinus symptoms', th: 'อาการจากไซนัส' },
  tendonIrritation: { en: 'Tendon irritation', th: 'เอ็นระคายเคือง' },
  jointStiffness: { en: 'Joint stiffness', th: 'ข้อต่อตึง' },
  reflux: { en: 'Reflux', th: 'กรดไหลย้อน' },
  respiratoryIllness: { en: 'Respiratory illness', th: 'การเจ็บป่วยของระบบหายใจ' },
  heartRelated: { en: 'Heart-related causes', th: 'สาเหตุเกี่ยวกับหัวใจ' },
  overuseOrStrain: { en: 'Overuse or strain', th: 'ใช้งานมากเกินไปหรือกล้ามเนื้อตึง' },
  skinIrritation: { en: 'Skin irritation', th: 'ผิวหนังระคายเคือง' },
  nerveIrritation: { en: 'Nerve irritation', th: 'เส้นประสาทระคายเคือง' },
  nerveCompression: { en: 'Nerve compression', th: 'เส้นประสาทถูกกดทับ' },
  indigestion: { en: 'Indigestion', th: 'อาหารไม่ย่อย' },
  gasBloating: { en: 'Gas or bloating', th: 'มีแก๊สหรือท้องอืด' },
  constipation: { en: 'Constipation', th: 'ท้องผูก' },
  digestiveInfection: { en: 'Digestive infection', th: 'การติดเชื้อในระบบย่อยอาหาร' },
  exerciseSoreness: { en: 'Exercise soreness', th: 'ปวดเมื่อยจากการออกกำลังกาย' },
  shinIrritation: { en: 'Shin irritation', th: 'ระคายเคืองบริเวณหน้าแข้ง' },
  muscleTension: { en: 'Muscle tension', th: 'กล้ามเนื้อตึง' },
  postureStrain: { en: 'Posture-related strain', th: 'อาการตึงจากท่าทาง' },
} satisfies Record<string, Localized>

const systems = {
  musculoskeletal: { en: 'Musculoskeletal', th: 'กระดูกและกล้ามเนื้อ' },
  neurological: { en: 'Neurological', th: 'ระบบประสาท' },
  digestive: { en: 'Digestive', th: 'ระบบย่อยอาหาร' },
  cardioRespiratory: { en: 'Cardiovascular / Respiratory', th: 'หัวใจและหลอดเลือด / ทางเดินหายใจ' },
} satisfies Record<string, Localized>

const areaList: BodyArea[] = [
  {
    id: 'head',
    label: { en: 'Head', th: 'ศีรษะ' },
    optionLabel: { en: 'Head / neck', th: 'ศีรษะ / คอ' },
    title: { en: 'Headache', th: 'ปวดศีรษะ' },
    region: { en: 'Head and neck', th: 'ศีรษะและลำคอ' },
    system: systems.neurological,
    description: {
      en: 'Head discomfort can have many causes, including tension, dehydration, illness or migraine. Note when it started, how it feels and whether other symptoms occur.',
      th: 'อาการไม่สบายศีรษะอาจเกิดได้จากหลายสาเหตุ เช่น ความตึงเครียด ภาวะขาดน้ำ การเจ็บป่วย หรือไมเกรน สังเกตว่าเริ่มเมื่อใด รู้สึกอย่างไร และมีอาการอื่นร่วมด้วยหรือไม่',
    },
    causes: [causes.tension, causes.migraine, causes.dehydration, causes.sinus],
    flags: [
      { en: 'A sudden, extremely severe headache', th: 'ปวดศีรษะรุนแรงมากและเกิดขึ้นฉับพลัน' },
      { en: 'New weakness, confusion or difficulty speaking', th: 'อ่อนแรง สับสน หรือพูดลำบากที่เกิดขึ้นใหม่' },
      { en: 'Headache after a significant head injury', th: 'ปวดศีรษะหลังได้รับบาดเจ็บที่ศีรษะอย่างรุนแรง' },
    ],
    anatomy: {
      en: 'The head contains the brain, sensory organs, muscles and nerves. Symptoms may originate from different structures and need context.',
      th: 'ศีรษะประกอบด้วยสมอง อวัยวะรับความรู้สึก กล้ามเนื้อ และเส้นประสาท อาการอาจมาจากโครงสร้างหลายส่วน จึงต้องพิจารณาบริบทประกอบ',
    },
  },
  {
    id: 'shoulder',
    label: { en: 'Shoulder', th: 'ไหล่' },
    optionLabel: { en: 'Shoulder', th: 'ไหล่' },
    title: { en: 'Shoulder discomfort', th: 'ปวด/ไม่สบายไหล่' },
    region: { en: 'Shoulder joint', th: 'ข้อไหล่' },
    system: systems.musculoskeletal,
    description: {
      en: 'Shoulder discomfort may be associated with muscle strain, tendon irritation, posture or joint conditions. Movement and recent activity can offer useful context.',
      th: 'อาการไม่สบายไหล่อาจเกี่ยวข้องกับกล้ามเนื้อตึง เอ็นระคายเคือง ท่าทาง หรือปัญหาข้อต่อ การเคลื่อนไหวและกิจกรรมที่ผ่านมาอาจช่วยให้ข้อมูลเพิ่มเติม',
    },
    causes: [causes.muscleStrain, causes.tendonIrritation, causes.overuse, causes.jointStiffness],
    flags: [
      { en: 'Visible deformity after an injury', th: 'เห็นความผิดรูปหลังได้รับบาดเจ็บ' },
      { en: 'Sudden loss of movement or strength', th: 'สูญเสียการเคลื่อนไหวหรือแรงอย่างฉับพลัน' },
      {
        en: 'Shoulder discomfort with chest pressure or shortness of breath',
        th: 'ไม่สบายไหล่ร่วมกับแน่นหน้าอกหรือหายใจไม่อิ่ม',
      },
    ],
    anatomy: {
      en: 'The shoulder combines the collarbone, shoulder blade, upper arm bone, tendons and muscles to allow a wide range of movement.',
      th: 'ไหล่ประกอบด้วยกระดูกไหปลาร้า สะบัก กระดูกต้นแขน เอ็น และกล้ามเนื้อ ซึ่งช่วยให้เคลื่อนไหวได้หลากหลาย',
    },
  },
  {
    id: 'chest',
    label: { en: 'Chest', th: 'หน้าอก' },
    optionLabel: { en: 'Chest', th: 'หน้าอก' },
    title: { en: 'Chest discomfort', th: 'แน่น/ไม่สบายหน้าอก' },
    region: { en: 'Chest and rib cage', th: 'หน้าอกและซี่โครง' },
    system: systems.cardioRespiratory,
    description: {
      en: 'Chest discomfort can have many causes and cannot be assessed reliably by a body map alone. New, unexplained or concerning chest symptoms should be taken seriously.',
      th: 'อาการไม่สบายหน้าอกอาจเกิดได้จากหลายสาเหตุ และไม่สามารถประเมินได้อย่างน่าเชื่อถือจากแผนผังร่างกายเพียงอย่างเดียว อาการใหม่ที่ไม่ทราบสาเหตุหรือน่ากังวลควรได้รับการใส่ใจ',
    },
    causes: [causes.muscleStrain, causes.reflux, causes.respiratoryIllness, causes.heartRelated],
    flags: [
      { en: 'Chest pressure, squeezing or heaviness', th: 'แน่นหน้าอก รู้สึกบีบรัด หรือหนักหน้าอก' },
      { en: 'Difficulty breathing, faintness or cold sweating', th: 'หายใจลำบาก หน้ามืด หรือเหงื่อเย็น' },
      { en: 'Pain spreading to the arm, back, neck or jaw', th: 'อาการปวดร้าวไปแขน หลัง คอ หรือกราม' },
    ],
    anatomy: {
      en: 'The chest contains the heart, lungs, ribs and major blood vessels. Symptoms in this area may require prompt professional assessment.',
      th: 'ทรวงอกประกอบด้วยหัวใจ ปอด ซี่โครง และหลอดเลือดขนาดใหญ่ อาการบริเวณนี้อาจจำเป็นต้องได้รับการประเมินจากผู้เชี่ยวชาญโดยเร็ว',
    },
  },
  {
    id: 'arm',
    label: { en: 'Arm', th: 'แขน' },
    optionLabel: { en: 'Arm / elbow', th: 'แขน / ข้อศอก' },
    title: { en: 'Arm discomfort', th: 'ปวด/ไม่สบายแขน' },
    region: { en: 'Arm and elbow', th: 'แขนและข้อศอก' },
    system: systems.musculoskeletal,
    description: {
      en: 'Arm symptoms may be associated with muscle overuse, tendon irritation, nerve compression or injury. Consider where the discomfort begins and what movements affect it.',
      th: 'อาการที่แขนอาจเกี่ยวข้องกับการใช้กล้ามเนื้อมากเกินไป เอ็นระคายเคือง เส้นประสาทถูกกดทับ หรือการบาดเจ็บ ควรสังเกตจุดเริ่มต้นของอาการและการเคลื่อนไหวที่ทำให้อาการเปลี่ยนไป',
    },
    causes: [causes.muscleStrain, causes.tendonIrritation, causes.nerveCompression, causes.overuse],
    flags: [
      { en: 'Sudden weakness or numbness on one side', th: 'อ่อนแรงหรือชาข้างเดียวอย่างฉับพลัน' },
      { en: 'An arm injury with major swelling or deformity', th: 'บาดเจ็บที่แขนร่วมกับบวมมากหรือผิดรูป' },
      {
        en: 'Arm discomfort with chest pressure or breathing difficulty',
        th: 'ไม่สบายแขนร่วมกับแน่นหน้าอกหรือหายใจลำบาก',
      },
    ],
    anatomy: {
      en: 'The arm includes muscles, tendons, nerves, blood vessels and bones that work together for strength, grip and precise movement.',
      th: 'แขนประกอบด้วยกล้ามเนื้อ เอ็น เส้นประสาท หลอดเลือด และกระดูก ซึ่งทำงานร่วมกันเพื่อสร้างแรง การจับ และการเคลื่อนไหวอย่างละเอียด',
    },
  },
  {
    id: 'hand',
    label: { en: 'Hand', th: 'มือ' },
    optionLabel: { en: 'Hand / fingers', th: 'มือ / นิ้วมือ' },
    title: { en: 'Hand discomfort', th: 'ปวด/ไม่สบายมือ' },
    region: { en: 'Hand and fingers', th: 'มือและนิ้ว' },
    system: systems.musculoskeletal,
    description: {
      en: 'Hand symptoms can be related to overuse, skin irritation, a wound or injury, or changes in nerves and circulation. Note the exact location and whether movement or sensation has changed.',
      th: 'อาการที่มืออาจเกี่ยวข้องกับการใช้งานมากเกินไป การระคายเคืองผิวหนัง บาดแผล การบาดเจ็บ หรือการเปลี่ยนแปลงของเส้นประสาทและการไหลเวียนเลือด สังเกตตำแหน่งและการเปลี่ยนแปลงของการเคลื่อนไหวหรือความรู้สึก',
    },
    causes: [causes.overuseOrStrain, causes.jointIrritation, causes.skinIrritation, causes.nerveIrritation],
    flags: [
      { en: 'A deep wound or bleeding that will not stop', th: 'แผลลึกหรือเลือดไหลไม่หยุด' },
      { en: 'New loss of feeling or movement', th: 'สูญเสียความรู้สึกหรือการเคลื่อนไหวที่เกิดขึ้นใหม่' },
      { en: 'Sudden one-sided weakness or numbness', th: 'อ่อนแรงหรือชาข้างเดียวอย่างฉับพลัน' },
    ],
    anatomy: {
      en: 'The hand contains small bones, joints, tendons, nerves, blood vessels and skin. A cut, swelling, numbness or pain may need different kinds of assessment.',
      th: 'มือประกอบด้วยกระดูกขนาดเล็ก ข้อต่อ เอ็น เส้นประสาท หลอดเลือด และผิวหนัง แผลบาด อาการบวม ชา หรือปวดอาจต้องได้รับการประเมินต่างกัน',
    },
  },
  {
    id: 'abdomen',
    label: { en: 'Abdomen', th: 'หน้าท้อง' },
    optionLabel: { en: 'Abdomen / stomach', th: 'ท้อง / กระเพาะอาหาร' },
    title: { en: 'Stomach discomfort', th: 'ปวด/ไม่สบายท้อง' },
    region: { en: 'Abdomen', th: 'ท้อง' },
    system: systems.digestive,
    description: {
      en: 'Abdominal discomfort can be related to digestion, food, infection or other causes. The location, duration and associated symptoms matter when deciding what to do next.',
      th: 'อาการไม่สบายท้องอาจเกี่ยวข้องกับการย่อยอาหาร อาหาร การติดเชื้อ หรือสาเหตุอื่น ตำแหน่ง ระยะเวลา และอาการร่วมมีความสำคัญต่อการตัดสินใจขั้นต่อไป',
    },
    causes: [causes.indigestion, causes.gasBloating, causes.constipation, causes.digestiveInfection],
    flags: [
      { en: 'Severe or rapidly worsening abdominal pain', th: 'ปวดท้องรุนแรงหรือแย่ลงอย่างรวดเร็ว' },
      { en: 'Blood in vomit or stool', th: 'มีเลือดในอาเจียนหรืออุจจาระ' },
      { en: 'Persistent vomiting or fainting', th: 'อาเจียนต่อเนื่องหรือเป็นลม' },
    ],
    anatomy: {
      en: 'The abdomen contains the stomach, intestines, liver and other organs. Similar discomfort may arise from different structures.',
      th: 'ช่องท้องประกอบด้วยกระเพาะอาหาร ลำไส้ ตับ และอวัยวะอื่น อาการคล้ายกันอาจเกิดจากอวัยวะคนละส่วน',
    },
  },
  {
    id: 'hip',
    label: { en: 'Hip', th: 'สะโพก' },
    optionLabel: { en: 'Hip / pelvis', th: 'สะโพก / เชิงกราน' },
    title: { en: 'Hip discomfort', th: 'ปวด/ไม่สบายสะโพก' },
    region: { en: 'Hip joint', th: 'ข้อสะโพก' },
    system: systems.musculoskeletal,
    description: {
      en: 'Hip discomfort may be associated with muscle strain, joint irritation, overuse or injury. The location and effect on walking can help describe it to a clinician.',
      th: 'อาการไม่สบายสะโพกอาจเกี่ยวข้องกับกล้ามเนื้อตึง ข้อต่อระคายเคือง การใช้งานมากเกินไป หรือการบาดเจ็บ ตำแหน่งและผลต่อการเดินช่วยให้สื่อสารกับบุคลากรทางการแพทย์ได้',
    },
    causes: [causes.muscleStrain, causes.overuse, causes.jointIrritation, causes.bursitis],
    flags: [
      { en: 'Unable to stand or bear weight after an injury', th: 'ยืนหรือลงน้ำหนักไม่ได้หลังบาดเจ็บ' },
      { en: 'Sudden severe pain or visible deformity', th: 'ปวดรุนแรงฉับพลันหรือเห็นความผิดรูป' },
      { en: 'Fever with a hot or swollen joint', th: 'มีไข้ร่วมกับข้อร้อนหรือบวม' },
    ],
    anatomy: {
      en: 'The hip is a ball-and-socket joint connecting the pelvis and thigh bone, supported by cartilage, ligaments and surrounding muscles.',
      th: 'สะโพกเป็นข้อต่อแบบลูกบอลและเบ้า เชื่อมกระดูกเชิงกรานกับกระดูกต้นขา และมีกระดูกอ่อน เอ็น และกล้ามเนื้อโดยรอบช่วยพยุง',
    },
  },
  {
    id: 'knee',
    label: { en: 'Knee', th: 'เข่า' },
    optionLabel: { en: 'Knee', th: 'เข่า' },
    title: { en: 'Knee pain', th: 'ปวดเข่า' },
    region: { en: 'Knee joint', th: 'ข้อเข่า' },
    system: systems.musculoskeletal,
    description: {
      en: 'Pain or discomfort in the knee can be related to strain, overuse, minor injury, or joint conditions. This guide offers general information to help you understand possible causes and next steps.',
      th: 'อาการปวดหรือไม่สบายเข่าอาจเกี่ยวข้องกับการตึง การใช้งานมากเกินไป การบาดเจ็บเล็กน้อย หรือภาวะของข้อต่อ คู่มือนี้ให้ข้อมูลทั่วไปเพื่อทำความเข้าใจสาเหตุที่เป็นไปได้และขั้นตอนต่อไป',
    },
    causes: [causes.muscleStrain, causes.overuse, causes.jointIrritation, causes.arthritis, causes.bursitis],
    flags: [
      { en: 'Severe swelling or deformity', th: 'บวมมากหรือผิดรูป' },
      { en: 'Unable to bear weight', th: 'ลงน้ำหนักไม่ได้' },
      { en: 'Sudden severe pain after injury', th: 'ปวดรุนแรงฉับพลันหลังบาดเจ็บ' },
    ],
    anatomy: {
      en: 'The knee connects the thigh bone, shin bone and kneecap, with cartilage and ligaments that support movement.',
      th: 'ข้อเข่าเชื่อมกระดูกต้นขา กระดูกหน้าแข้ง และกระดูกสะบ้า โดยมีกระดูกอ่อนและเอ็นช่วยรองรับการเคลื่อนไหว',
    },
  },
  {
    id: 'lower-leg',
    label: { en: 'Lower leg', th: 'ขาส่วนล่าง' },
    optionLabel: { en: 'Calf / shin', th: 'น่อง / หน้าแข้ง' },
    title: { en: 'Lower-leg discomfort', th: 'ปวด/ไม่สบายขาส่วนล่าง' },
    region: { en: 'Calf and shin', th: 'น่องและหน้าแข้ง' },
    system: systems.musculoskeletal,
    description: {
      en: 'Lower-leg discomfort can relate to exercise, muscle strain or injury. One-sided swelling, warmth or pain that is unexplained should be assessed promptly.',
      th: 'อาการไม่สบายขาส่วนล่างอาจเกี่ยวข้องกับการออกกำลังกาย กล้ามเนื้อตึง หรือการบาดเจ็บ หากมีอาการบวม ร้อน หรือปวดข้างเดียวโดยไม่ทราบสาเหตุ ควรรีบรับการประเมิน',
    },
    causes: [causes.muscleStrain, causes.exerciseSoreness, causes.shinIrritation, causes.tendonIrritation],
    flags: [
      { en: 'One-sided swelling, warmth or redness', th: 'บวม ร้อน หรือแดงเพียงข้างเดียว' },
      { en: 'Sudden severe pain or inability to walk', th: 'ปวดรุนแรงฉับพลันหรือเดินไม่ได้' },
      {
        en: 'Lower-leg symptoms with chest pain or shortness of breath',
        th: 'อาการที่ขาส่วนล่างร่วมกับเจ็บหน้าอกหรือหายใจไม่อิ่ม',
      },
    ],
    anatomy: {
      en: 'The lower leg contains the shin bone, calf muscles, tendons, nerves and blood vessels that support walking and balance.',
      th: 'ขาส่วนล่างประกอบด้วยกระดูกหน้าแข้ง กล้ามเนื้อน่อง เอ็น เส้นประสาท และหลอดเลือด ซึ่งช่วยในการเดินและการทรงตัว',
    },
  },
  {
    id: 'upper-back',
    label: { en: 'Upper back', th: 'หลังส่วนบน' },
    optionLabel: { en: 'Upper back', th: 'หลังส่วนบน' },
    title: { en: 'Upper-back discomfort', th: 'ปวด/ไม่สบายหลังส่วนบน' },
    region: { en: 'Upper back', th: 'หลังส่วนบน' },
    system: systems.musculoskeletal,
    description: {
      en: 'Upper-back discomfort may be associated with posture, muscle tension, lifting or strain. Consider whether movement, breathing or activity changes the discomfort.',
      th: 'อาการไม่สบายหลังส่วนบนอาจเกี่ยวข้องกับท่าทาง กล้ามเนื้อตึง การยกของ หรือการใช้งานมากเกินไป สังเกตว่าการเคลื่อนไหว การหายใจ หรือกิจกรรมทำให้อาการเปลี่ยนไปหรือไม่',
    },
    causes: [causes.muscleTension, causes.postureStrain, causes.overuse, causes.jointIrritation],
    flags: [
      { en: 'Severe pain after an injury', th: 'ปวดรุนแรงหลังบาดเจ็บ' },
      { en: 'Numbness or weakness that is new', th: 'อาการชา หรืออ่อนแรงที่เกิดขึ้นใหม่' },
      {
        en: 'Back discomfort with chest pressure or breathing difficulty',
        th: 'ไม่สบายหลังร่วมกับแน่นหน้าอกหรือหายใจลำบาก',
      },
    ],
    anatomy: {
      en: 'The upper back includes the thoracic spine, ribs and muscles that support posture and protect structures in the chest.',
      th: 'หลังส่วนบนประกอบด้วยกระดูกสันหลังส่วนอก ซี่โครง และกล้ามเนื้อที่ช่วยพยุงท่าทางและปกป้องอวัยวะในทรวงอก',
    },
  },
  {
    id: 'lower-back',
    label: { en: 'Lower back', th: 'หลังส่วนล่าง' },
    optionLabel: { en: 'Lower back', th: 'หลังส่วนล่าง' },
    title: { en: 'Lower-back discomfort', th: 'ปวด/ไม่สบายหลังส่วนล่าง' },
    region: { en: 'Lower back', th: 'หลังส่วนล่าง' },
    system: systems.musculoskeletal,
    description: {
      en: 'Lower-back discomfort can be associated with muscle strain, activity or spinal conditions. Changes in strength, sensation or bladder and bowel function need urgent assessment.',
      th: 'อาการไม่สบายหลังส่วนล่างอาจเกี่ยวข้องกับกล้ามเนื้อตึง กิจกรรม หรือภาวะของกระดูกสันหลัง หากแรงกล้ามเนื้อ ความรู้สึก หรือการทำงานของกระเพาะปัสสาวะและลำไส้เปลี่ยนไป ต้องรีบรับการประเมิน',
    },
    causes: [causes.muscleStrain, causes.overuse, causes.jointIrritation, causes.nerveIrritation],
    flags: [
      { en: 'New loss of bladder or bowel control', th: 'สูญเสียการควบคุมปัสสาวะหรืออุจจาระที่เกิดขึ้นใหม่' },
      { en: 'Numbness around the groin or saddle area', th: 'ชาบริเวณขาหนีบหรือบริเวณที่สัมผัสอาน' },
      { en: 'Progressive leg weakness or major injury', th: 'ขาอ่อนแรงมากขึ้นหรือได้รับบาดเจ็บรุนแรง' },
    ],
    anatomy: {
      en: 'The lower back supports body weight and movement through the lumbar spine, muscles, ligaments and nearby nerves.',
      th: 'หลังส่วนล่างช่วยรองรับน้ำหนักและการเคลื่อนไหวผ่านกระดูกสันหลังส่วนเอว กล้ามเนื้อ เอ็น และเส้นประสาทใกล้เคียง',
    },
  },
]

export const BODY_AREAS = Object.fromEntries(areaList.map((area) => [area.id, area])) as Record<BodyAreaId, BodyArea>

/** Order of the body-area dropdown, matching the prototype. */
export const BODY_AREA_ORDER: BodyAreaId[] = [
  'head',
  'chest',
  'shoulder',
  'arm',
  'hand',
  'abdomen',
  'hip',
  'knee',
  'lower-leg',
  'upper-back',
  'lower-back',
]

export const HOTSPOTS: Record<BodySide, Hotspot[]> = {
  front: [
    { area: 'head', x: 49, y: 7.5 },
    { area: 'shoulder', x: 30, y: 25.5 },
    { area: 'chest', x: 52, y: 29 },
    { area: 'arm', x: 17, y: 34 },
    { area: 'hand', x: 11, y: 49.5 },
    { area: 'abdomen', x: 50, y: 43 },
    { area: 'hip', x: 50, y: 53 },
    { area: 'knee', x: 64, y: 76 },
    { area: 'lower-leg', x: 37, y: 86 },
  ],
  back: [
    { area: 'head', x: 50, y: 7.5 },
    { area: 'shoulder', x: 30, y: 25.5 },
    { area: 'upper-back', x: 50, y: 31.5 },
    { area: 'arm', x: 15, y: 39 },
    { area: 'hand', x: 10, y: 51 },
    { area: 'lower-back', x: 50, y: 47 },
    { area: 'hip', x: 50, y: 56 },
    { area: 'knee', x: 64, y: 76 },
    { area: 'lower-leg', x: 37, y: 87 },
  ],
}

/** The side of the body an area is shown on when it is focused. */
export function defaultSideFor(area: BodyAreaId): BodySide {
  return HOTSPOTS.front.some((spot) => spot.area === area) ? 'front' : 'back'
}
