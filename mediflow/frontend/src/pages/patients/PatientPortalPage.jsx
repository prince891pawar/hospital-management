import { CalendarDays, ClipboardPlus } from 'lucide-react'
import Button from '../../components/common/Button.jsx'
import Card from '../../components/common/Card.jsx'
import EmptyState from '../../components/common/EmptyState.jsx'
import PageHeader from '../../components/common/PageHeader.jsx'

export default function PatientPortalPage({ section }) {
  const isAppointments = section === 'appointments'
  const title = isAppointments ? 'My appointments' : 'My prescriptions'
  const Icon = isAppointments ? CalendarDays : ClipboardPlus

  return (
    <div className="page-content">
      <PageHeader title={title} description={isAppointments ? 'Review your upcoming visits and care schedule.' : 'Review treatment plans shared with you by your care team.'} />
      <Card><EmptyState icon={Icon} title={`No ${isAppointments ? 'appointments' : 'prescriptions'} to show`} description="Your personal records will appear here when your clinic shares them with your account." action={isAppointments ? <Button to="/dashboard">Back to your dashboard</Button> : null} /></Card>
    </div>
  )
}