import { useEffect } from 'react'
import { BadgeCheck, Info, TriangleAlert, X } from 'lucide-react'

const icons = { success: BadgeCheck, info: Info, error: TriangleAlert }

export default function Toast({ tone = 'success', message, onClose, duration = 4000 }) {
  useEffect(() => {
    if (!message || duration <= 0) return undefined
    const timeoutId = window.setTimeout(onClose, duration)
    return () => window.clearTimeout(timeoutId)
  }, [duration, message, onClose])

  if (!message) return null

  const Icon = icons[tone] || Info
  return (
    <div className={`mf-toast mf-toast-${tone}`} role={tone === 'error' ? 'alert' : 'status'} aria-live={tone === 'error' ? 'assertive' : 'polite'}>
      <Icon size={18} aria-hidden="true" />
      <p>{message}</p>
      <button type="button" aria-label="Dismiss notification" onClick={onClose}><X size={16} /></button>
    </div>
  )
}