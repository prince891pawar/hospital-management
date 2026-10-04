import { Bell, ChevronDown, Menu, Search } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { getNavigationForRole } from '../../constants/navigation.js'
import { logout } from '../../store/slices/authSlice.js'
import DropdownMenu from '../ui/DropdownMenu.jsx'
import UserAvatar from '../common/UserAvatar.jsx'

export default function Navbar({ onOpenSidebar, onToggleCollapsed }) {
  const { pathname } = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.user)
  const page = getNavigationForRole(user?.role).find((item) => item.path === pathname)
  const pageTitle = page?.label || (pathname === '/profile' ? 'Profile' : 'Dashboard')
  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(' ') || 'MediFlow user'
  const roleLabel = user?.role ? `${user.role[0].toUpperCase()}${user.role.slice(1)}` : ''

  const signOut = async () => {
    await dispatch(logout()).unwrap()
    navigate('/login', { replace: true })
  }

  return (
    <header className="mf-navbar">
      <div className="mf-navbar-leading">
        <button type="button" className="mf-icon-button mf-mobile-menu" aria-label="Open navigation" onClick={onOpenSidebar}><Menu size={20} /></button>
        <button type="button" className="mf-icon-button mf-desktop-collapse" aria-label="Toggle sidebar" onClick={onToggleCollapsed}><Menu size={19} /></button>
        <div className="mf-breadcrumb"><span>Workspace</span><span className="mf-breadcrumb-divider">/</span><strong>{pageTitle}</strong></div>
      </div>
      <div className="mf-navbar-actions">
        <label className="mf-navbar-search"><Search size={16} /><span className="sr-only">Search MediFlow</span><input placeholder="Search anything..." /></label>
        <button type="button" className="mf-icon-button mf-notification-button" aria-label="Notifications"><Bell size={18} /><i /></button>
        <div className="mf-navbar-divider" />
        <DropdownMenu
          label="Open profile menu"
          renderTrigger={({ open, onToggle, label }) => <button type="button" className="mf-navbar-profile-trigger" aria-label={label} aria-expanded={open} onClick={onToggle}><UserAvatar user={user} /><span className="mf-navbar-profile-copy"><strong className="mf-navbar-profile-name">{fullName}</strong><small>{user?.email} · {roleLabel}</small></span><ChevronDown size={14} /></button>}
          items={[
            { label: 'Profile', to: '/profile' },
            { label: 'Settings', to: '/settings' },
            { label: 'Logout', onClick: signOut, danger: true },
          ]}
        />
      </div>
    </header>
  )
}