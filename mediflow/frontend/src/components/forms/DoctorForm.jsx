import { useState } from 'react'
import Button from '../common/Button.jsx'

const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const defaultDoctor = { firstName: '', lastName: '', email: '', phone: '', specialty: '', qualification: '', experience: '', consultationFee: '', bio: '', status: 'active', profileImage: '', availability: [] }

function initialSchedule(values = []) {
  return Object.fromEntries(weekdays.map((day) => {
    const existing = values.find((item) => item.day === day)
    return [day, existing?.slots?.length ? existing.slots : []]
  }))
}

export default function DoctorForm({ initialValues, onSubmit, onCancel, loading = false, error = '' }) {
  const [form, setForm] = useState(() => ({ ...defaultDoctor, ...initialValues, experience: initialValues?.experience ?? '', consultationFee: initialValues?.consultationFee ?? '' }))
  const [schedule, setSchedule] = useState(() => initialSchedule(initialValues?.availability))
  const [validationError, setValidationError] = useState('')
  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }))

  const toggleDay = (day, enabled) => setSchedule((current) => ({ ...current, [day]: enabled ? [{ start: '09:00', end: '13:00' }, { start: '14:00', end: '18:00' }] : [] }))
  const updateSlot = (day, index, field, value) => setSchedule((current) => ({ ...current, [day]: current[day].map((slot, slotIndex) => slotIndex === index ? { ...slot, [field]: value } : slot) }))

  const handleSubmit = (event) => {
    event.preventDefault()
    setValidationError('')
    if (!form.firstName.trim() || !form.lastName.trim() || !form.email.trim() || !form.phone.trim() || !form.specialty.trim() || !form.qualification.trim()) {
      setValidationError('Complete all required doctor fields.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) return setValidationError('Enter a valid email address.')
    const availability = weekdays.filter((day) => schedule[day].length).map((day) => ({ day, slots: schedule[day] }))
    onSubmit({ ...form, email: form.email.trim(), experience: Number(form.experience), consultationFee: Number(form.consultationFee), availability })
  }

  return (
    <form className="resource-form" onSubmit={handleSubmit} noValidate>
      <div className="resource-form-grid">
        <label className="settings-field"><span>First name *</span><input name="firstName" value={form.firstName} onChange={update} required /></label>
        <label className="settings-field"><span>Last name *</span><input name="lastName" value={form.lastName} onChange={update} required /></label>
        <label className="settings-field"><span>Email *</span><input name="email" type="email" value={form.email} onChange={update} required /></label>
        <label className="settings-field"><span>Phone *</span><input name="phone" type="tel" value={form.phone} onChange={update} required /></label>
        <label className="settings-field"><span>Specialty *</span><input name="specialty" value={form.specialty} onChange={update} required /></label>
        <label className="settings-field"><span>Qualification *</span><input name="qualification" value={form.qualification} onChange={update} required /></label>
        <label className="settings-field"><span>Experience (years)</span><input name="experience" type="number" min="0" max="80" value={form.experience} onChange={update} required /></label>
        <label className="settings-field"><span>Consultation fee</span><input name="consultationFee" type="number" min="0" step="0.01" value={form.consultationFee} onChange={update} required /></label>
        <label className="settings-field"><span>Status</span><select name="status" value={form.status} onChange={update}><option value="active">Active</option><option value="inactive">Inactive</option><option value="on_leave">On leave</option></select></label>
        <label className="settings-field"><span>Profile image URL</span><input name="profileImage" type="url" value={form.profileImage || ''} onChange={update} /></label>
        <label className="settings-field resource-field-wide"><span>Bio</span><textarea name="bio" rows="3" maxLength="2000" value={form.bio || ''} onChange={update} /></label>
      </div>
      <fieldset className="availability-fieldset"><legend>Weekly availability</legend><p>Select any days and set one or two appointment windows.</p>
        <div className="availability-list">{weekdays.map((day) => <div className="availability-day" key={day}>
          <label className="availability-day-toggle"><input type="checkbox" checked={schedule[day].length > 0} onChange={(event) => toggleDay(day, event.target.checked)} /><span>{day}</span></label>
          {schedule[day].length > 0 && <div className="availability-slots">{schedule[day].map((slot, index) => <div className="availability-slot" key={`${day}-${index}`}><label><span>{index === 0 ? 'Morning' : 'Afternoon'} start</span><input type="time" value={slot.start} onChange={(event) => updateSlot(day, index, 'start', event.target.value)} /></label><label><span>{index === 0 ? 'Morning' : 'Afternoon'} end</span><input type="time" value={slot.end} onChange={(event) => updateSlot(day, index, 'end', event.target.value)} /></label></div>)}</div>}
        </div>)}</div>
      </fieldset>
      {(validationError || error) && <p className="auth-feedback" role="alert">{validationError || error}</p>}
      <div className="modal-actions"><Button variant="secondary" onClick={onCancel} disabled={loading}>Cancel</Button><Button type="submit" disabled={loading}>{loading ? 'Saving...' : initialValues?._id ? 'Save doctor' : 'Create doctor'}</Button></div>
    </form>
  )
}