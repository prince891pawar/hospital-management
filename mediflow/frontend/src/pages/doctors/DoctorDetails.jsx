import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ArrowLeft, CalendarDays, Clock3, Mail, Phone, Stethoscope } from 'lucide-react'
import Button from '../../components/common/Button.jsx'
import Card from '../../components/common/Card.jsx'
import EmptyState from '../../components/common/EmptyState.jsx'
import ErrorState from '../../components/common/ErrorState.jsx'
import LoadingState from '../../components/common/LoadingState.jsx'
import PageHeader from '../../components/common/PageHeader.jsx'
import Badge from '../../components/common/Badge.jsx'
import { clearSelectedDoctor, fetchDoctor } from '../../store/slices/doctorSlice.js'

export default function DoctorDetails({ doctorId }) {
  const dispatch = useDispatch()
  const { selectedDoctor: doctor, isLoading, error } = useSelector((state) => state.doctors)

  useEffect(() => {
    dispatch(fetchDoctor(doctorId))
    return () => dispatch(clearSelectedDoctor())
  }, [dispatch, doctorId])

  if (isLoading && !doctor) return <LoadingState rows={5} />
  if (error && !doctor) return <ErrorState message={error} onRetry={() => dispatch(fetchDoctor(doctorId))} />
  if (!doctor) return <Card><EmptyState title="Doctor not found" description="The requested doctor profile may have been removed." /></Card>

  const fullName = `Dr. ${doctor.firstName} ${doctor.lastName}`
  return (
    <div className="page-content">
      <Link className="detail-back-link" to="/doctors"><ArrowLeft size={15} />Back to doctors</Link>
      <PageHeader title={fullName} description={doctor.doctorId} action={<Badge tone={doctor.status === 'active' ? 'green' : doctor.status === 'on_leave' ? 'amber' : 'gray'} dot>{doctor.status?.replaceAll('_', ' ')}</Badge>} />
      <div className="detail-profile-banner"><span className="doctor-avatar doctor-detail-avatar">{doctor.firstName?.[0]}{doctor.lastName?.[0]}</span><div><h2>{fullName}</h2><p><Stethoscope size={14} />{doctor.specialty}</p></div></div>
      <div className="patient-detail-grid">
        <Card className="detail-card"><div className="detail-card-heading"><span className="detail-heading-icon"><Stethoscope size={17} /></span><div><h2>Professional information</h2><p>Credentials and clinical background</p></div></div><div className="detail-info-grid"><Info label="Specialty">{doctor.specialty}</Info><Info label="Qualification">{doctor.qualification}</Info><Info label="Experience">{doctor.experience} years</Info><Info label="Consultation fee">${Number(doctor.consultationFee).toFixed(2)}</Info></div>{doctor.bio && <p className="doctor-detail-bio">{doctor.bio}</p>}</Card>
        <Card className="detail-card"><div className="detail-card-heading"><span className="detail-heading-icon detail-icon-blue"><Phone size={17} /></span><div><h2>Contact information</h2><p>Professional contact details</p></div></div><div className="detail-info-grid"><Info label="Email"><span className="detail-icon-label"><Mail size={13} />{doctor.email}</span></Info><Info label="Phone"><span className="detail-icon-label"><Phone size={13} />{doctor.phone}</span></Info></div></Card>
        <Card className="detail-card availability-detail-card"><div className="detail-card-heading"><span className="detail-heading-icon detail-icon-amber"><Clock3 size={17} /></span><div><h2>Weekly availability</h2><p>Scheduled appointment windows by day</p></div></div>{doctor.availability?.length ? <div className="weekly-availability">{doctor.availability.map(({ day, slots }) => <div className="weekly-availability-row" key={day}><strong>{day}</strong><span>{slots.map((slot) => `${slot.start}–${slot.end}`).join(' · ')}</span></div>)}</div> : <EmptyState icon={CalendarDays} title="No availability set" description="Weekly hours have not been configured." />}</Card>
        <Card className="detail-card"><div className="detail-card-heading"><span className="detail-heading-icon detail-icon-green"><CalendarDays size={17} /></span><div><h2>Appointment overview</h2><p>Summary placeholder for a later module</p></div></div><EmptyState icon={CalendarDays} title="No appointment statistics" description="Doctor appointment statistics will be connected later." /></Card>
      </div>
      <Button variant="secondary" to="/doctors" icon={ArrowLeft}>Back to doctors</Button>
    </div>
  )
}

function Info({ label, children }) {
  return <div className="detail-info-item"><span>{label}</span><strong>{children || 'Not provided'}</strong></div>
}