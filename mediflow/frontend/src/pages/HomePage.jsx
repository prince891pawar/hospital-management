import { Activity, ArrowRight, HeartPulse, ShieldCheck, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <main className="landing-shell">
      <header className="topbar">
        <Link className="brand" to="/" aria-label="MediFlow home">
          <span className="brand-mark"><HeartPulse size={19} strokeWidth={2.3} /></span>
          <span>Medi<span>Flow</span></span>
        </Link>
        <nav className="topbar-nav" aria-label="Main navigation">
          <a href="#platform">Platform</a>
          <a href="#care">For care teams</a>
        </nav>
        <Link className="sign-in-link" to="/login">Sign in <ArrowRight size={15} /></Link>
      </header>

      <section className="hero-section" id="platform">
        <div className="hero-copy">
          <div className="eyebrow"><Sparkles size={14} /> Care, connected</div>
          <h1>Modern Clinic<br /><span>Management Platform</span></h1>
          <p className="hero-description">
            A calmer way to run your clinic. Bring your team, patient care, and everyday operations together in one thoughtful workspace.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/register">Get started <ArrowRight size={17} /></Link>
            <Link className="button button-secondary" to="/login">Login</Link>
          </div>
          <div className="trust-note"><ShieldCheck size={16} /> Built for teams who put care first</div>
        </div>

        <div className="hero-visual" id="care">
          <img
            className="clinic-image"
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85"
            alt="Clinician reviewing a patient's care in a modern clinic"
          />
          <div className="visual-wash" />
          <div className="visual-caption">
            <span className="caption-icon"><Activity size={18} /></span>
            <span><strong>More time for care</strong><small>Less friction in every day</small></span>
          </div>
          <div className="visual-index">01 <span>/</span> 03</div>
        </div>
      </section>

      <footer className="landing-footer">
        <span>Thoughtfully designed for modern care.</span>
        <span>Clinic operations, in rhythm.</span>
      </footer>
    </main>
  )
}