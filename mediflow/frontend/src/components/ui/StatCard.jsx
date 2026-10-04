import { ArrowDownRight, ArrowUpRight, CalendarDays, CircleDollarSign, UsersRound, UserRoundCheck } from 'lucide-react'
import Card from '../common/Card.jsx'

const icons = { patients: UsersRound, appointments: CalendarDays, doctors: UserRoundCheck, revenue: CircleDollarSign }

export default function StatCard({ label, value, change, note, icon, tone }) {
  const Icon = icons[icon] || UsersRound
  const positive = change.startsWith('+')
  return (
    <Card className="stat-card">
      <div className="stat-card-heading">
        <span className={`stat-icon stat-icon-${tone}`}><Icon size={19} /></span>
        <span className="stat-card-label">{label}</span>
      </div>
      <div className="stat-value">{value}</div>
      <div className="stat-footnote">
        <span className={positive ? 'stat-change' : 'stat-neutral'}>
          {positive ? <ArrowUpRight size={14} /> : null}{change}
        </span>
        <span>{note}</span>
        {change.startsWith('-') && <ArrowDownRight className="sr-only" size={14} />}
      </div>
    </Card>
  )
}