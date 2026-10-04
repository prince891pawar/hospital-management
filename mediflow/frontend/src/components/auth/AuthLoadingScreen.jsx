import { HeartPulse, LoaderCircle } from 'lucide-react'

export default function AuthLoadingScreen() {
  return <main className="auth-loading-screen" role="status"><span className="auth-loading-mark"><HeartPulse size={23} /></span><span>Restoring your secure session</span><LoaderCircle size={18} className="auth-spinner" /><span className="sr-only">Please wait</span></main>
}