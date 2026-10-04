import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ArrowLeft, CalendarDays, ClipboardPlus, MapPin, Phone, UserRound } from 'lucide-react'
import Button from '../../components/common/Button.jsx'
import Card from '../../components/common/Card.jsx'
import EmptyState from '../../components/common/EmptyState.jsx'
import ErrorState from '../../components/common/ErrorState.jsx'
import LoadingState from '../../components/common/LoadingState.jsx'
import PageHeader from '../../components/common/PageHeader.jsx'
import Badge from '../../components/common/Badge.jsx'
import { clearSelectedPatient, fetchPatient } from '../../store/slices/patientSlice.js'

function calculateAge(dateOfBirth) {
  if (!dateOfBirth) return 'Not provided'
  const birthDate = new Date(dateOfBirth)
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  if (today < new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate())) age -= 1
  return `${age} years`
}

function InfoItem({ label, children }) {
  return <div className="detail-info-item"><span>{label}</span><strong>{children || 'Not provided'}</strong></div>
}

export default function PatientDetails({ patientId }) {
  const dispatch = useDispatch()
  const { selectedPatient: patient, isLoading, error } = useSelector((state) => state.patients)

  useEffect(() => {
    dispatch(fetchPatient(patientId))
    return () => dispatch(clearSelectedPatient())
  }, [dispatch, patientId])

  if (isLoading && !patient) return <LoadingState rows={5} />
  if (error && !patient) return <ErrorState message={error} onRetry={() => dispatch(fetchPatient(patientId))} />
  if (!patient) return <Card><EmptyState title="Patient not found" description="The requested patient record may have been removed." /></Card>

  const fullName = `${patient.firstName} ${patient.lastName}`
  const address = patient.address ? [patient.address.street, patient.address.city, patient.address.state, patient.address.postalCode, patient.address.country].filter(Boolean).join(', ') : ''

  return (
    <div className="page-content">
      <Link className="detail-back-link" to="/patients"><ArrowLeft size={15} />Back to patients</Link>
      <PageHeader title={fullName} description={`Patient ID ${patient.patientId}`} action={<Badge tone={patient.status === 'active' ? 'green' : 'gray'} dot>{patient.status}</Badge>} />
      <div className="patient-detail-grid">
        <Card className="detail-card"><div className="detail-card-heading"><span className="detail-heading-icon"><UserRound size={17} /></span><div><h2>Basic information</h2><p>Patient profile and demographic details</p></div></div><div className="detail-info-grid"><InfoItem label="Full name">{fullName}</InfoItem><InfoItem label="Date of birth">{patient.dateOfBirth ? new Date(patient.dateOfBirth).toLocaleDateString() : 'Not provided'}</InfoItem><InfoItem label="Age">{calculateAge(patient.dateOfBirth)}</InfoItem><InfoItem label="Gender">{patient.gender?.replaceAll('_', ' ')}</InfoItem><InfoItem label="Blood group">{patient.bloodGroup}</InfoItem><InfoItem label="Patient ID">{patient.patientId}</InfoItem></div></Card>
        <Card className="detail-card"><div className="detail-card-heading"><span className="detail-heading-icon detail-icon-blue"><Phone size={17} /></span><div><h2>Contact information</h2><p>Ways to reach this patient</p></div></div><div className="detail-info-grid"><InfoItem label="Email">{patient.email}</InfoItem><InfoItem label="Phone">{patient.phone}</InfoItem><InfoItem label="Address"><span className="detail-address"><MapPin size={13} />{address || 'Not provided'}</span></InfoItem></div></Card>
        <Card className="detail-card"><div className="detail-card-heading"><span className="detail-heading-icon detail-icon-amber"><Phone size={17} /></span><div><h2>Emergency contact</h2><p>Contact information for urgent situations</p></div></div><div className="detail-info-grid"><InfoItem label="Name">{patient.emergencyContact?.name}</InfoItem><InfoItem label="Relationship">{patient.emergencyContact?.relationship}</InfoItem><InfoItem label="Phone">{patient.emergencyContact?.phone}</InfoItem></div></Card>
        <Card className="detail-card"><div className="detail-card-heading"><span className="detail-heading-icon detail-icon-rose"><ClipboardPlus size={17} /></span><div><h2>Medical information</h2><p>Clinical notes and sensitivities</p></div></div><div className="detail-list-group"><div><h3>Medical history</h3>{patient.medicalHistory?.length ? <ul>{patient.medicalHistory.map((item, index) => <li key={`${item}-${index}`}>{item}</li>)}</ul> : <p>No medical history recorded.</p>}</div><div><h3>Allergies</h3>{patient.allergies?.length ? <ul>{patient.allergies.map((item, index) => <li key={`${item}-${index}`}>{item}</li>)}</ul> : <p>No known allergies recorded.</p>}</div></div></Card>
        <Card className="detail-card detail-placeholder-card"><div className="detail-card-heading"><span className="detail-heading-icon"><CalendarDays size={17} /></span><div><h2>Recent appointments</h2><p>Appointment records will appear here when connected.</p></div></div><EmptyState icon={CalendarDays} title="No appointment data" description="Appointments will be available in a later module." /></Card>
        <Card className="detail-card detail-placeholder-card"><div className="detail-card-heading"><span className="detail-heading-icon detail-icon-blue"><ClipboardPlus size={17} /></span><div><h2>Recent prescriptions</h2><p>Prescription records will appear here when connected.</p></div></div><EmptyState icon={ClipboardPlus} title="No prescription data" description="Prescriptions will be available in a later module." /></Card>
      </div>
      <Button variant="secondary" to="/patients" icon={ArrowLeft}>Back to patients</Button>
    </div>
  )
}