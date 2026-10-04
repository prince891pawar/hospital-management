import { useState } from 'react'
import Button from '../common/Button.jsx'

const maximumDateOfBirth = new Date().toISOString().slice(0, 10)

const defaultPatient = {
  firstName: '', lastName: '', email: '', phone: '', dateOfBirth: '', gender: 'prefer_not_to_say', bloodGroup: '',
  address: { street: '', city: '', state: '', postalCode: '', country: '' },
  emergencyContact: { name: '', relationship: '', phone: '' }, medicalHistory: [], allergies: [], status: 'active', profileImage: '',
}

function linesToList(value) {
  return value.split(/[\n,]/).map((item) => item.trim()).filter(Boolean)
}

export default function PatientForm({ initialValues, onSubmit, onCancel, loading = false, error = '' }) {
  const [form, setForm] = useState(() => ({ ...defaultPatient, ...initialValues, address: { ...defaultPatient.address, ...initialValues?.address }, emergencyContact: { ...defaultPatient.emergencyContact, ...initialValues?.emergencyContact }, dateOfBirth: initialValues?.dateOfBirth?.slice(0, 10) || '', medicalHistory: Array.isArray(initialValues?.medicalHistory) ? initialValues.medicalHistory.join('\n') : '', allergies: Array.isArray(initialValues?.allergies) ? initialValues.allergies.join('\n') : '' }))
  const [validationError, setValidationError] = useState('')

  const update = (event) => {
    const { name, value } = event.target
    if (name.startsWith('address.')) {
      const key = name.slice(8)
      setForm((current) => ({ ...current, address: { ...current.address, [key]: value } }))
    } else if (name.startsWith('emergencyContact.')) {
      const key = name.slice(17)
      setForm((current) => ({ ...current, emergencyContact: { ...current.emergencyContact, [key]: value } }))
    } else {
      setForm((current) => ({ ...current, [name]: value }))
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setValidationError('')
    if (!form.firstName.trim() || !form.lastName.trim() || !form.phone.trim() || !form.dateOfBirth || !form.gender) {
      setValidationError('Complete the required name, phone, date of birth, and gender fields.')
      return
    }
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      setValidationError('Enter a valid email address.')
      return
    }
    const { medicalHistory, allergies, ...patient } = form
    onSubmit({ ...patient, email: patient.email.trim() || undefined, medicalHistory: linesToList(medicalHistory), allergies: linesToList(allergies) })
  }

  return (
    <form className="resource-form" onSubmit={handleSubmit} noValidate>
      <div className="resource-form-grid">
        <label className="settings-field"><span>First name *</span><input name="firstName" value={form.firstName} onChange={update} autoComplete="given-name" required /></label>
        <label className="settings-field"><span>Last name *</span><input name="lastName" value={form.lastName} onChange={update} autoComplete="family-name" required /></label>
        <label className="settings-field"><span>Email</span><input name="email" type="email" value={form.email || ''} onChange={update} autoComplete="email" /></label>
        <label className="settings-field"><span>Phone *</span><input name="phone" type="tel" value={form.phone} onChange={update} autoComplete="tel" required /></label>
        <label className="settings-field"><span>Date of birth *</span><input name="dateOfBirth" type="date" value={form.dateOfBirth} max={maximumDateOfBirth} onChange={update} required /></label>
        <label className="settings-field"><span>Gender *</span><select name="gender" value={form.gender} onChange={update} required><option value="">Select gender</option><option value="female">Female</option><option value="male">Male</option><option value="non_binary">Non-binary</option><option value="prefer_not_to_say">Prefer not to say</option></select></label>
        <label className="settings-field"><span>Blood group</span><select name="bloodGroup" value={form.bloodGroup} onChange={update}><option value="">Not specified</option>{['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((group) => <option key={group}>{group}</option>)}</select></label>
        <label className="settings-field"><span>Status</span><select name="status" value={form.status} onChange={update}><option value="active">Active</option><option value="inactive">Inactive</option><option value="archived">Archived</option></select></label>
        <label className="settings-field resource-field-wide"><span>Street address</span><input name="address.street" value={form.address.street} onChange={update} autoComplete="street-address" /></label>
        <label className="settings-field"><span>City</span><input name="address.city" value={form.address.city} onChange={update} autoComplete="address-level2" /></label>
        <label className="settings-field"><span>State / Province</span><input name="address.state" value={form.address.state} onChange={update} autoComplete="address-level1" /></label>
        <label className="settings-field"><span>Postal code</span><input name="address.postalCode" value={form.address.postalCode} onChange={update} autoComplete="postal-code" /></label>
        <label className="settings-field"><span>Country</span><input name="address.country" value={form.address.country} onChange={update} autoComplete="country-name" /></label>
        <label className="settings-field"><span>Emergency contact</span><input name="emergencyContact.name" value={form.emergencyContact.name} onChange={update} /></label>
        <label className="settings-field"><span>Relationship</span><input name="emergencyContact.relationship" value={form.emergencyContact.relationship} onChange={update} /></label>
        <label className="settings-field"><span>Emergency phone</span><input name="emergencyContact.phone" type="tel" value={form.emergencyContact.phone} onChange={update} /></label>
        <label className="settings-field resource-field-wide"><span>Medical history <small>One item per line</small></span><textarea name="medicalHistory" rows="3" value={form.medicalHistory} onChange={update} /></label>
        <label className="settings-field resource-field-wide"><span>Allergies <small>One item per line</small></span><textarea name="allergies" rows="3" value={form.allergies} onChange={update} /></label>
      </div>
      {(validationError || error) && <p className="auth-feedback" role="alert">{validationError || error}</p>}
      <div className="modal-actions"><Button variant="secondary" onClick={onCancel} disabled={loading}>Cancel</Button><Button type="submit" disabled={loading}>{loading ? 'Saving...' : initialValues?._id ? 'Save patient' : 'Create patient'}</Button></div>
    </form>
  )
}