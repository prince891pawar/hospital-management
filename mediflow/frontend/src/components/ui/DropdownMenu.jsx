import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { MoreHorizontal } from 'lucide-react'

export default function DropdownMenu({ label = 'More actions', items, align = 'right', renderTrigger }) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (!containerRef.current?.contains(event.target)) setOpen(false)
    }
    document.addEventListener('mousedown', closeOnOutsideClick)
    return () => document.removeEventListener('mousedown', closeOnOutsideClick)
  }, [])

  const handleAction = (item) => {
    setOpen(false)
    item.onClick?.()
  }

  return (
    <div className="mf-menu-wrap" ref={containerRef}>
      {renderTrigger
        ? renderTrigger({ open, onToggle: () => setOpen(!open), label })
        : <button className="mf-icon-button mf-row-menu-trigger" type="button" aria-label={label} aria-expanded={open} onClick={() => setOpen(!open)}><MoreHorizontal size={19} /></button>}
      {open && <div className={`mf-menu-panel mf-menu-${align}`} role="menu">
        {items.map((item) => {
          const Icon = item.icon
          const content = <>{Icon && <Icon size={15} />}<span>{item.label}</span></>
          return item.to
            ? <Link key={item.label} to={item.to} role="menuitem" className={`mf-menu-item ${item.danger ? 'is-danger' : ''}`} onClick={() => handleAction(item)}>{content}</Link>
            : <button key={item.label} type="button" role="menuitem" className={`mf-menu-item ${item.danger ? 'is-danger' : ''}`} onClick={() => handleAction(item)}>{content}</button>
        })}
      </div>}
    </div>
  )
}