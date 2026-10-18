import { useEffect, useRef } from 'react'
import { GUIDES, type GuideId } from '../data/sources'
import type { Localized } from '../data/types'
import { usePreferences } from '../preferences/preferencesContext'
import './GuideDialog.css'

export type GuideRequest = { guide: Exclude<GuideId, 'cause'> } | { guide: 'cause'; cause: Localized }

type GuideDialogProps = {
  request: GuideRequest | null
  onClose: () => void
}

/** Native <dialog>: focus is kept inside while open and returned to the opening button on close. */
export function GuideDialog({ request, onClose }: GuideDialogProps) {
  const { t, l } = usePreferences()
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (request && !dialog.open) dialog.showModal()
    if (!request && dialog.open) dialog.close()
  }, [request])

  const guide = request ? GUIDES[request.guide] : null
  const cause = request?.guide === 'cause' ? l(request.cause) : null

  return (
    <dialog
      ref={dialogRef}
      className="modal"
      aria-labelledby="modal-title"
      onClose={onClose}
      onClick={(event) => {
        // A click on the backdrop lands on the <dialog> element itself.
        if (event.target === event.currentTarget) onClose()
      }}
    >
      {guide && (
        <div className="modal-body">
          <div className="modal-head">
            <div>
              <div className="tiny-label">{cause ? t('modal.causeEyebrow', { cause }) : t('modal.eyebrow')}</div>
              <h2 id="modal-title">{cause ?? l(guide.title)}</h2>
            </div>
            <button type="button" className="modal-close" aria-label={t('modal.close')} onClick={onClose} autoFocus>
              ×
            </button>
          </div>
          {guide.paragraphs.map((paragraph) => (
            <p key={paragraph.en}>{l(paragraph)}</p>
          ))}
          <div className="modal-callout">{t('modal.callout')}</div>
        </div>
      )}
    </dialog>
  )
}
