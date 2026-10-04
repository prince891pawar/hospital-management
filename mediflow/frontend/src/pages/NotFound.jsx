import { ArrowLeft, SearchX } from 'lucide-react'
import Button from '../components/common/Button.jsx'

export default function NotFound() {
  return (
    <main className="not-found-page">
      <div className="not-found-content">
        <span className="not-found-icon"><SearchX size={25} /></span>
        <p className="not-found-code">404</p>
        <h1>Page not found</h1>
        <p className="not-found-description">The page you’re looking for may have moved or is not part of this workspace.</p>
        <Button to="/dashboard" icon={ArrowLeft}>Back to Dashboard</Button>
      </div>
    </main>
  )
}