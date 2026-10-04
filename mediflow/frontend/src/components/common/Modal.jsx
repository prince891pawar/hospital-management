import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

export default function Modal({ open, onClose, title, children, size = 'medium' }) {
  useEffect(() => {
    if (!open) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.classList.add('modal-open')
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.classList.remove('modal-open')
    }
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div className="mf-modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className={`mf-modal mf-modal-${size}`} role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <header className="mf-modal-header">
          <h2 id="modal-title">{title}</h2>
          <button className="mf-icon-button" type="button" aria-label="Close dialog" onClick={onClose}><X size={18} /></button>
        </header>
        <div className="mf-modal-content">{children}</div>
      </section>
    </div>,
    document.body,
  )
}