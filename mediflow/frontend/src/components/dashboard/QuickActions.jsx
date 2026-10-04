import { ArrowUpRight, ClipboardPlus, CreditCard, Plus, UserRoundPlus, UsersRound } from 'lucide-react'
import { Link } from 'react-router-dom'
import Card from '../common/Card.jsx'

const actions = [
  { label: 'Add patient', path: '/patients', icon: UserRoundPlus, tone: 'teal' },
  { label: 'New appointment', path: '/appointments', icon: Plus, tone: 'blue' },
  { label: 'Add doctor', path: '/doctors', icon: UsersRound, tone: 'amber' },
  { label: 'New prescription', path: '/prescriptions', icon: ClipboardPlus, tone: 'violet' },
  { label: 'Create invoice', path: '/billing', icon: CreditCard, tone: 'green' },
]

export default function QuickActions() {
  return (
    <Card className="quick-actions-card">
      <div className="section-heading"><div><h2>Quick actions</h2><p>Common tasks, one click away</p></div></div>
      <div className="quick-action-list">
        {actions.map(({ label, path, icon: Icon, tone }) => (
          <Link to={path} className="quick-action-item" key={label}>
            <span className={`quick-action-icon tone-${tone}`}><Icon size={17} /></span><span>{label}</span><ArrowUpRight size={14} className="quick-action-arrow" />
          </Link>
        ))}
      </div>
    </Card>
  )
}