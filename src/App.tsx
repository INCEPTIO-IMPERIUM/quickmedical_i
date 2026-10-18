import { useReducer, useState } from 'react'
import { BodyMap } from './components/BodyMap'
import { DetailsPanel } from './components/DetailsPanel'
import { GuideDialog, type GuideRequest } from './components/GuideDialog'
import { Header } from './components/Header'
import { defaultSideFor } from './data/bodyAreas'
import { usePreferences } from './preferences/preferencesContext'
import { explorerReducer, initialExplorerState } from './state/explorer'

function App() {
  const { t } = usePreferences()
  const [state, dispatch] = useReducer(explorerReducer, initialExplorerState)
  const [guide, setGuide] = useState<GuideRequest | null>(null)

  return (
    <>
      <Header
        onSearchMatch={(area) => dispatch({ type: 'selectArea', area, view: defaultSideFor(area), focus: false })}
        onOpenHelp={() => setGuide({ guide: 'help' })}
      />
      <main id="top" className="page">
        <div className="eyebrow-row">
          <div className="crumb">
            {t('page.crumbWorkspace')}&nbsp; / &nbsp;<b>{t('page.crumbExplorer')}</b>
          </div>
          <div className="status-pill">
            <span className="status-dot" aria-hidden="true" /> {t('page.status')}{' '}
            <span className="status-sep" aria-hidden="true">
              ·
            </span>{' '}
            {t('page.mode')}
          </div>
        </div>
        <div className="dashboard" id="explore">
          <BodyMap state={state} dispatch={dispatch} />
          <DetailsPanel state={state} dispatch={dispatch} onOpenGuide={setGuide} />
        </div>
        <footer className="footer">
          <span>QuickMedical</span>
          <span aria-hidden="true">•</span>
          <span>{t('footer.tagline')}</span>
          <span aria-hidden="true">•</span>
          <span>{t('footer.disclaimer')}</span>
        </footer>
      </main>
      <GuideDialog request={guide} onClose={() => setGuide(null)} />
    </>
  )
}

export default App
