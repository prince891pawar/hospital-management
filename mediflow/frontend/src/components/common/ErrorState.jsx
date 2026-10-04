import { AlertTriangle } from 'lucide-react'
import Button from './Button.jsx'

export default function ErrorState({ message = 'We could not load this information.', onRetry }) {
  return (
    <div className="mf-state mf-error-state" role="alert">
      <span className="mf-state-icon"><AlertTriangle size={21} /></span>
      <h3>Something went wrong</h3>
      <p>{message}</p>
      {onRetry && <Button variant="secondary" onClick={onRetry}>Try again</Button>}
    </div>
  )
}