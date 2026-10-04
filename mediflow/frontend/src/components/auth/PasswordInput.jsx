import { Eye, EyeOff } from 'lucide-react'

export default function PasswordInput({ id, label, value, onChange, autoComplete, minLength, error }) {
  return (
    <label className="auth-field" htmlFor={id}>
      <span>{label}</span>
      <span className={`auth-input-shell ${error ? 'has-error' : ''}`}>
        <input id={id} name={id} type={value.visible ? 'text' : 'password'} value={value.password} onChange={onChange} autoComplete={autoComplete} minLength={minLength} required />
        <button type="button" className="auth-password-toggle" aria-label={value.visible ? 'Hide password' : 'Show password'} onClick={value.toggle}><span className="sr-only">{value.visible ? 'Hide password' : 'Show password'}</span>{value.visible ? <EyeOff size={17} /> : <Eye size={17} />}</button>
      </span>
    </label>
  )
}