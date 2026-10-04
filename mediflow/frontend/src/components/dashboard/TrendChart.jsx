import { ArrowUpRight } from 'lucide-react'
import Card from '../common/Card.jsx'

export default function TrendChart({ title, subtitle, value, change, data, labels, color = 'teal', kind = 'bar' }) {
  return (
    <Card className="chart-card">
      <div className="chart-card-head">
        <div><p className="chart-title">{title}</p><p className="chart-subtitle">{subtitle}</p></div>
        <button className="chart-more-button" type="button" aria-label={`${title} options`}>···</button>
      </div>
      <div className="chart-summary"><strong>{value}</strong><span><ArrowUpRight size={14} />{change}</span></div>
      <div className={`chart-plot chart-${kind} chart-${color}`} role="img" aria-label={`${title} trend chart`}>
        <div className="chart-grid-lines"><i /><i /><i /><i /></div>
        <div className="chart-bars">{data.map((height, index) => <span key={labels[index]} style={{ '--bar-height': `${height}%` }} className={index === data.length - 2 ? 'is-highlighted' : ''} title={`${labels[index]}: ${height}`} />)}</div>
      </div>
      <div className="chart-axis">{labels.map((label) => <span key={label}>{label}</span>)}</div>
    </Card>
  )
}