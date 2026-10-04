import { useState } from 'react'
import { ArrowRight, LoaderCircle } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import PasswordInput from '../../components/auth/PasswordInput.jsx'
import { login } from '../../store/slices/authSlice.js'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoading, error } = useSelector((state) => state.auth)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [validationError, setValidationError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    setValidationError('')
    if (!emailPattern.test(email.trim())) return setValidationError('Enter a valid email address.')
    if (!password) return setValidationError('Enter your password.')

    try {
      await dispatch(login({ email: email.trim(), password })).unwrap()
      navigate('/dashboard', { replace: true })
    } catch {
      // The rejected thunk exposes the safe API message through auth state.
    }
  }

  return (
    <div className="auth-form-content">
      <span className="auth-form-eyebrow">WELCOME BACK</span>
      <h2>Sign in to MediFlow</h2>
      <p className="auth-form-description">Enter your account details to continue to your workspace.</p>
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <label className="auth-field" htmlFor="login-email"><span>Email address</span><input id="login-email" name="email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@clinic.com" required /></label>
        <PasswordInput id="login-password" label="Password" value={{ password, visible: passwordVisible, toggle: () => setPasswordVisible(!passwordVisible) }} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" />
        <div className="auth-form-meta"><label className="auth-checkbox"><input type="checkbox" /><span>Remember me</span></label><button type="button" className="auth-text-button" onClick={() => setValidationError('Password recovery will be available in a later step.')}>Forgot password?</button></div>
        {(validationError || error) && <p className="auth-feedback" role="alert">{validationError || error}</p>}
        <button className="auth-submit" type="submit" disabled={isLoading}>{isLoading ? <LoaderCircle size={17} className="auth-spinner" /> : null}<span>{isLoading ? 'Signing in...' : 'Sign in'}</span>{!isLoading && <ArrowRight size={16} />}</button>
      </form>
      <p className="auth-form-bottom">New to MediFlow? <Link to="/register">Create a patient account</Link></p>
    </div>
  )
}