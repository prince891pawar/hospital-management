const tones = {
  active: 'green',
  paid: 'green',
  completed: 'green',
  confirmed: 'green',
  waiting: 'amber',
  pending: 'amber',
  scheduled: 'blue',
  cancelled: 'red',
  overdue: 'red',
  inactive: 'gray',
  draft: 'gray',
  default: 'gray',
}

export default function Badge({ children, tone, dot = false }) {
  const resolvedTone = tone || tones[String(children).toLowerCase()] || 'gray'
  return <span className={`mf-badge mf-badge-${resolvedTone}`}>{dot && <span className="mf-badge-dot" />}{children}</span>
}