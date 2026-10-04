import { HeartPulse, ShieldCheck, Sparkles } from 'lucide-react'
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import AuthLoadingScreen from './AuthLoadingScreen.jsx'

const currentYear = new Date().getFullYear()

export default function AuthLayout() {
  const { user, isAuthenticated, isLoading } = useSelector((state) => state.auth)
  const { pathname } = useLocation()
  const isLogin = pathname === '/login'

  if (isLoading) return <AuthLoadingScreen />
  if (isAuthenticated && user) return <Navigate to="/dashboard" replace />

  return (
    <main className="auth-shell">
      <section className="auth-aside">
        <Link className="auth-brand" to="/" aria-label="MediFlow home"><span className="auth-brand-mark"><HeartPulse size={20} /></span><span>Medi<span>Flow</span></span></Link>
        <div className="auth-aside-message">
          <span className="auth-kicker"><Sparkles size={14} /> Care, connected</span>
          <h1>Make room for<br />better care.</h1>
          <p>A calmer workspace for the people who keep clinics moving and patients feeling cared for.</p>
        </div>
        <div className="auth-aside-note"><ShieldCheck size={17} /><span>Your account stays yours. Secure access for every care team.</span></div>
        <span className="auth-aside-index">MEDIFLOW / CLINIC WORKSPACE</span>
      </section>
      <section className="auth-main">
        <header className="auth-switch">{isLogin ? <><span>New to MediFlow?</span><Link to="/register">Create an account</Link></> : <><span>Already have an account?</span><Link to="/login">Sign in</Link></>}</header>
        <div className="auth-form-wrap"><Outlet /></div>
        <footer className="auth-footer"><span>© {currentYear} MediFlow</span><Link to="/">Back to home</Link></footer>
      </section>
    </main>
  )
}