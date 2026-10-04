import { useState } from 'react'
import { ArrowRight, LoaderCircle } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import PasswordInput from '../../components/auth/PasswordInput.jsx'
import { register } from '../../store/slices/authSlice.js'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Register() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoading, error } = useSelector((state) => state.auth)
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', password: '', confirmPassword: '' })
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [confirmVisible, setConfirmVisible] = useState(false)
  const [validationError, setValidationError] = useState('')

  const updateField = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }))

  const handleSubmit = async (event) => {
    event.preventDefault()
    setValidationError('')
    if (!form.firstName.trim() || !form.lastName.trim() || !form.phone.trim()) return setValidationError('Complete all required fields.')
    if (!emailPattern.test(form.email.trim())) return setValidationError('Enter a valid email address.')
    if (form.password.length < 8) return setValidationError('Password must be at least 8 characters.')
    if (new TextEncoder().encode(form.password).length > 72) return setValidationError('Password must be no more than 72 bytes.')
    if (form.password !== form.confirmPassword) return setValidationError('Passwords do not match.')

    try {
      await dispatch(register({
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        password: form.password,
      })).unwrap()
      navigate('/dashboard', { replace: true })
    } catch {
      // The rejected thunk exposes the safe API message through auth state.
    }
  }

  return (
    <div className="auth-form-content auth-register-content">
      <span className="auth-form-eyebrow">PATIENT ACCESS</span>
      <h2>Create your account</h2>
      <p className="auth-form-description">Set up a secure patient account for your MediFlow clinic.</p>
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <div className="auth-fields-two">
          <label className="auth-field" htmlFor="register-first-name"><span>First name</span><input id="register-first-name" name="firstName" autoComplete="given-name" value={form.firstName} onChange={updateField} required /></label>
          <label className="auth-field" htmlFor="register-last-name"><span>Last name</span><input id="register-last-name" name="lastName" autoComplete="family-name" value={form.lastName} onChange={updateField} required /></label>
        </div>
        <label className="auth-field" htmlFor="register-email"><span>Email address</span><input id="register-email" name="email" type="email" autoComplete="email" value={form.email} onChange={updateField} placeholder="you@example.com" required /></label>
        <label className="auth-field" htmlFor="register-phone"><span>Phone number</span><input id="register-phone" name="phone" type="tel" autoComplete="tel" value={form.phone} onChange={updateField} placeholder="+1 (555) 000-0000" required /></label>
        <PasswordInput id="register-password" label="Password" value={{ password: form.password, visible: passwordVisible, toggle: () => setPasswordVisible(!passwordVisible) }} onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))} autoComplete="new-password" minLength={8} />
        <PasswordInput id="register-confirm-password" label="Confirm password" value={{ password: form.confirmPassword, visible: confirmVisible, toggle: () => setConfirmVisible(!confirmVisible) }} onChange={(event) => setForm((current) => ({ ...current, confirmPassword: event.target.value }))} autoComplete="new-password" minLength={8} />
        <p className="auth-password-hint">Use at least 8 characters. Staff accounts are provisioned by an administrator.</p>
        {(validationError || error) && <p className="auth-feedback" role="alert">{validationError || error}</p>}
        <button className="auth-submit" type="submit" disabled={isLoading}>{isLoading ? <LoaderCircle size={17} className="auth-spinner" /> : null}<span>{isLoading ? 'Creating account...' : 'Create patient account'}</span>{!isLoading && <ArrowRight size={16} />}</button>
      </form>
      <p className="auth-terms">By creating an account, you agree to keep your sign-in details secure.</p>
      <p className="auth-form-bottom">Already have an account? <Link to="/login">Sign in</Link></p>
    </div>
  )
}