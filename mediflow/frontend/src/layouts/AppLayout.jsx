import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/layout/Navbar.jsx'
import Sidebar from '../components/layout/Sidebar.jsx'

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    if (!mobileOpen) return undefined

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setMobileOpen(false)
    }

    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [mobileOpen])

  return (
    <div className={`mf-app-frame ${collapsed ? 'is-sidebar-collapsed' : ''}`}>
      <Sidebar
        collapsed={collapsed}
        onToggleCollapsed={() => setCollapsed(!collapsed)}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />
      <div className="mf-main-column">
        <Navbar onOpenSidebar={() => setMobileOpen(true)} onToggleCollapsed={() => setCollapsed(!collapsed)} />
        <main className="mf-page-area"><Outlet /></main>
        <footer className="mf-app-footer"><span>MediFlow Clinic Management</span><span>Workspace · 2026</span></footer>
      </div>
    </div>
  )
}