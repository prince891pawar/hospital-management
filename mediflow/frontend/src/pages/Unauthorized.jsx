import { ShieldX } from 'lucide-react'
import Button from '../components/common/Button.jsx'

export default function Unauthorized() {
  return (
    <main className="not-found-page">
      <div className="not-found-content">
        <span className="not-found-icon"><ShieldX size={25} /></span>
        <h1>Access restricted</h1>
        <p className="not-found-description">You don't have permission to access this page.</p>
        <Button to="/dashboard">Back to Dashboard</Button>
      </div>
    </main>
  )
}