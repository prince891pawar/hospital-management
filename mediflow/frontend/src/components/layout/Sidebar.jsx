import { LifeBuoy, PanelLeftClose, PanelLeftOpen, X } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getNavigationForRole } from '../../constants/navigation.js'
import UserAvatar from '../common/UserAvatar.jsx'

export default function Sidebar({ collapsed, onToggleCollapsed, mobileOpen, onCloseMobile }) {
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.user)
  const navigationItems = getNavigationForRole(user?.role)
  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(' ') || 'MediFlow user'
  const roleLabel = user?.role ? `${user.role[0].toUpperCase()}${user.role.slice(1)}` : ''

  return (
    <>
      {mobileOpen && <button type="button" className="mf-sidebar-overlay" aria-label="Close navigation" onClick={onCloseMobile} />}
      <aside className={`mf-sidebar ${collapsed ? 'is-collapsed' : ''} ${mobileOpen ? 'is-mobile-open' : ''}`} aria-label="Main navigation">
        <div className="mf-sidebar-brand-row">
          <NavLink to="/dashboard" className="mf-logo" onClick={onCloseMobile}>
            <span className="mf-logo-mark">M</span><span className="mf-logo-name">Medi<span>Flow</span></span>
          </NavLink>
          <button type="button" className="mf-icon-button mf-mobile-close" aria-label="Close navigation" onClick={onCloseMobile}><X size={18} /></button>
          <button type="button" className="mf-icon-button mf-collapse-button" aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'} title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'} onClick={onToggleCollapsed}>
            {collapsed ? <PanelLeftOpen size={17} /> : <PanelLeftClose size={17} />}
          </button>
        </div>

        <p className="mf-nav-caption">WORKSPACE</p>
        <nav className="mf-nav-list">
          {navigationItems.map(({ label, path, icon: Icon }) => (
            <NavLink key={path} to={path} onClick={onCloseMobile} aria-label={label} title={label} className={({ isActive }) => `mf-nav-link ${isActive ? 'is-active' : ''}`}>
              <Icon size={18} strokeWidth={1.8} /><span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="mf-sidebar-bottom">
          <button type="button" className="mf-nav-link mf-support-link" aria-label="Help & Support" onClick={() => navigate('/settings')} title="Help & Support">
            <LifeBuoy size={18} strokeWidth={1.8} /><span>Help &amp; Support</span>
          </button>
          <div className="mf-sidebar-user">
            <UserAvatar user={user} className="mf-avatar-sidebar" />
            <span className="mf-sidebar-user-info"><strong>{fullName}</strong><small>{roleLabel} · {user?.email}</small></span>
          </div>
        </div>
      </aside>
    </>
  )
}