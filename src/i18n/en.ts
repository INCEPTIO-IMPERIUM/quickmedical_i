/** UI text. Medical content lives in src/data with its own translations. */
export const en = {
  'app.title': 'QuickMedical — Check & Visualize',
  'brand.home': 'QuickMedical home',
  'brand.tagline': 'Check & Visualize',
  'brand.subTagline': 'See your body. Understand your symptoms.',

  'nav.label': 'Main navigation',
  'nav.explore': 'Explore',
  'nav.sources': 'Medical sources',
  'nav.seekCare': 'When to seek care',

  'search.label': 'Search symptoms',
  'search.placeholder': 'Search a body area, e.g. knee, hand, abdomen…',
  'search.noMatch': 'No matching symptom. Try another word.',

  'theme.toggle': 'Choose appearance',
  'theme.heading': 'Choose appearance',
  'theme.light': 'Soft Light',
  'theme.lightHint': 'Warm, airy, minimal',
  'theme.dark': 'Warm Dark',
  'theme.darkHint': 'Soft charcoal & rose gold',

  'language.label': 'Choose language',
  'help.open': 'Open help',
  'header.hello': 'Hello, Guest',

  'page.crumbWorkspace': 'Workspace',
  'page.crumbExplorer': 'Body explorer',
  'page.status': 'ANATOMY VIEW READY',
  'page.mode': 'Educational mode',

  'map.panelLabel': 'Interactive human anatomy map',
  'map.kicker': 'Interactive body atlas',
  'map.heading': 'Explore your body',
  'map.intro': 'Select a highlighted area to explore symptom information.',
  'map.viewGroup': 'Anatomy view',
  'map.viewBoth': 'Both',
  'map.viewFront': 'Front',
  'map.viewBack': 'Back',
  'map.zoomGroup': 'Anatomy zoom controls',
  'map.zoomHint': 'ZOOM TO A BODY AREA',
  'map.focusSelected': 'Focus selected',
  'map.focusSelectedHint': 'Zoom to the selected body area',
  'map.zoomIn': 'Zoom in',
  'map.zoomOut': 'Zoom out',
  'map.fit': 'Fit',
  'map.fitHint': 'Fit full body',
  'map.frontLabel': 'ANTERIOR · FRONT',
  'map.backLabel': 'POSTERIOR · BACK',
  'map.frontAlt': 'Realistic front view of human muscular anatomy',
  'map.backAlt': 'Realistic back view of human muscular anatomy',
  'map.selectArea': 'Select {area}',
  'map.referenceLoaded': 'Anatomical reference loaded',
  'map.selectedArea': 'Selected area',
  'map.tapMarker': 'Tap a marker to explore',

  'details.panelLabel': 'Selected symptom details',
  'details.resetBody': 'Reset body selection',
  'details.clearArea': 'Clear selected area',

  'form.kicker': 'QUICK CHECK',
  'form.heading': 'What are you feeling?',
  'form.selectOnly': 'Select only what applies',
  'form.bodyArea': 'Body area',
  'form.chooseArea': 'Choose a body area',
  'form.symptomType': 'Symptom type',
  'form.abdomenQuality': 'Abdominal pain quality',
  'form.otherSymptoms': 'Other symptoms',
  'form.optional': '(optional)',
  'form.more': 'More +',
  'form.less': 'Less −',
  'form.temperature': 'Measured temperature',
  'form.duration': 'Duration',
  'form.notSpecified': 'Not specified',
  'form.severity': 'Severity',
  'form.autoUpdates': 'Auto-updates as you select',
  'form.clear': 'Clear selections',

  'temperature.default': 'Enter a temperature in °C. Context and measurement method matter.',
  'temperature.outOfRange': 'Enter a temperature between 30°C and 45°C, or leave this field blank.',
  'temperature.fever':
    'A reading of 38°C or above often indicates fever; age, measurement method and context matter. See the linked MedlinePlus reference.',

  'selected.kicker': 'Selected symptom',
  'selected.emptyTitle': 'Select a body area',
  'selected.emptyDescription':
    'Select a rose-gold marker on the body or choose an area from the list to see general information about it.',
  'selected.general': 'General symptoms',
  'selected.generalDescription':
    'Symptoms that are not limited to one body area. Add a body area if the symptom is felt in a particular place.',

  'summary.kicker': 'YOUR SYMPTOM SUMMARY',
  'summary.empty': 'No details selected yet',
  'summary.noSensation': 'No sensation selected',
  'summary.other': 'Other symptoms: {list}',
  'summary.temperature': 'Temperature entered: {value}°C',
  'summary.severity': 'Severity: {value}',
  'summary.duration': 'Duration: {value}',
  'summary.hint':
    'Use this summary to explain what you have noticed to a healthcare professional. Selected details do not indicate a particular disease.',

  'guidance.keepInMind': 'Keep in mind',
  'guidance.keepInMindBody':
    'This tool offers general education only. It cannot assess the cause of symptoms or rule out an emergency. Get medical advice if symptoms are severe, worsening or concerning.',
  'guidance.seekCare': 'When to seek care',
  'guidance.breathing': 'Difficulty breathing can be an emergency warning sign. Seek emergency medical care now.',
  'guidance.chestPressure':
    'New or persistent chest pressure can be an emergency warning sign. Seek emergency medical care now.',
  'guidance.blood': 'Blood in vomit or stool needs urgent medical assessment.',
  'guidance.dehydration':
    'Vomiting with inability to keep fluids down can lead to dehydration. Get prompt medical care.',
  'guidance.severeAbdomen': 'Severe or rapidly worsening abdominal pain needs urgent assessment.',
  'guidance.severe':
    'Severe or rapidly worsening symptoms may need urgent assessment, particularly if sudden or accompanied by other warning signs.',
  'guidance.wound':
    'For a wound, seek urgent care if it is deep, bleeding will not stop, or sensation or movement is affected.',
  'guidance.numbness':
    'If numbness starts suddenly, especially with weakness, facial changes or difficulty speaking, seek emergency care.',

  'causes.heading': 'Common causes',
  'causes.viewAll': 'View all ↗',

  'flags.heading': 'When to seek care',
  'flags.label': 'Important signs',
  'flags.general':
    'Get emergency help for severe symptoms, difficulty breathing, sudden weakness, chest pressure, or other rapidly worsening symptoms.',
  'flags.note':
    'Seek urgent medical care for severe or rapidly worsening symptoms. This tool does not provide a diagnosis.',

  'sources.heading': 'MEDICAL REFERENCES',

  'modal.eyebrow': 'QUICKMEDICAL HEALTH LIBRARY',
  'modal.causeEyebrow': 'POSSIBLE CAUSE · {cause}',
  'modal.close': 'Close dialog',
  'modal.callout':
    'Get emergency help for severe symptoms, difficulty breathing, sudden weakness, chest pressure, or other rapidly worsening symptoms.',

  'footer.tagline': 'Better information. Healthier decisions.',
  'footer.disclaimer': 'Educational information only — not a diagnosis.',
} as const

export type MessageKey = keyof typeof en
