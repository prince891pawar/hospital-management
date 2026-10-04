export default function PageHeader({ eyebrow, title, description, action, className = '' }) {
  return (
    <header className={`page-header ${className}`.trim()}>
      <div>
        {eyebrow && <p className="page-eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {description && <p className="page-description">{description}</p>}
      </div>
      {action && <div className="page-header-action">{action}</div>}
    </header>
  )
}