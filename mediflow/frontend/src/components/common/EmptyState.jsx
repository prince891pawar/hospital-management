import { FolderOpen } from 'lucide-react'

export default function EmptyState({ title = 'Nothing to show yet', description = 'Try adjusting your search or filters.', action, icon: Icon = FolderOpen }) {
  return (
    <div className="mf-state">
      <span className="mf-state-icon"><Icon size={21} /></span>
      <h3>{title}</h3>
      <p>{description}</p>
      {action}
    </div>
  )
}