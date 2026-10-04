import { CalendarDays, ClipboardPlus } from 'lucide-react'
import { useSelector } from 'react-redux'
import Button from '../../components/common/Button.jsx'
import Card from '../../components/common/Card.jsx'
import EmptyState from '../../components/common/EmptyState.jsx'
import PageHeader from '../../components/common/PageHeader.jsx'

export default function PatientDashboard() {
  const user = useSelector((state) => state.auth.user)

  return (
    <div className="page-content">
      <PageHeader title={`Welcome back, ${user?.firstName || 'there'}`} description="Your personal care information and clinic updates will appear here." />
      <div className="patient-home-grid">
        <Card><EmptyState icon={CalendarDays} title="No upcoming visits" description="When your clinic schedules a visit, you’ll find the details here." action={<Button to="/my-appointments">View appointments</Button>} /></Card>
        <Card><EmptyState icon={ClipboardPlus} title="No shared prescriptions" description="Prescriptions shared by your care team will appear here." action={<Button variant="secondary" to="/my-prescriptions">View prescriptions</Button>} /></Card>
      </div>
    </div>
  )
}