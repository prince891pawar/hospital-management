import { ArrowRight, CalendarPlus, Clock3 } from 'lucide-react'
import { useState } from 'react'
import AppointmentStatusBadge from '../../components/appointments/AppointmentStatusBadge.jsx'
import Button from '../../components/common/Button.jsx'
import Card from '../../components/common/Card.jsx'
import Modal from '../../components/common/Modal.jsx'
import PageHeader from '../../components/common/PageHeader.jsx'
import DataTable from '../../components/ui/DataTable.jsx'
import DropdownMenu from '../../components/ui/DropdownMenu.jsx'
import StatCard from '../../components/ui/StatCard.jsx'
import QuickActions from '../../components/dashboard/QuickActions.jsx'
import TrendChart from '../../components/dashboard/TrendChart.jsx'
import { appointmentRows, appointmentTrend, chartLabels, dashboardStats, patientRows, revenueTrend } from '../../data/dashboardData.js'

const dashboardDate = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }).format(new Date())

export default function Dashboard() {
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false)

  const appointmentColumns = [
    { key: 'patient', label: 'Patient', render: (row) => <div className="person-cell"><span className={`mf-avatar avatar-${row.patientTone}`}>{row.initials}</span><span><strong>{row.patient}</strong><small>{row.id.toUpperCase()}</small></span></div> },
    { key: 'doctor', label: 'Doctor', render: (row) => <div className="doctor-cell"><strong>{row.doctor}</strong><small>{row.specialty}</small></div> },
    { key: 'time', label: 'Time', render: (row) => <span className="table-time"><Clock3 size={14} />{row.time}</span> },
    { key: 'type', label: 'Type' },
    { key: 'status', label: 'Status', render: (row) => <AppointmentStatusBadge status={row.status} /> },
    { key: 'actions', label: '', render: () => <DropdownMenu items={[{ label: 'View details', to: '/appointments' }, { label: 'Edit appointment', to: '/appointments' }]} /> },
  ]

  const patientColumns = [
    { key: 'name', label: 'Patient', render: (row) => <div className="person-cell"><span className={`mf-avatar avatar-${row.tone}`}>{row.initials}</span><span><strong>{row.name}</strong><small>{row.id}</small></span></div> },
    { key: 'age', label: 'Age' },
    { key: 'gender', label: 'Gender' },
    { key: 'lastVisit', label: 'Last visit' },
    { key: 'status', label: 'Status', render: (row) => <AppointmentStatusBadge status={row.status} /> },
    { key: 'actions', label: '', render: () => <DropdownMenu items={[{ label: 'View patient', to: '/patients' }, { label: 'Edit patient', to: '/patients' }]} /> },
  ]

  return (
    <div className="page-content">
      <PageHeader
        eyebrow={dashboardDate}
        title="Good morning, Alex"
        description="Here’s what’s happening at your clinic today."
        action={<Button icon={CalendarPlus} onClick={() => setAppointmentModalOpen(true)}>New appointment</Button>}
      />

      <section className="stats-grid" aria-label="Clinic overview">
        {dashboardStats.map((stat) => <StatCard key={stat.label} {...stat} />)}
      </section>

      <section className="dashboard-middle-grid" aria-label="Clinic analytics and shortcuts">
        <div className="analytics-grid">
          <TrendChart title="Appointment trends" subtitle="Appointments over the last 12 months" value="1,284" change="12.8%" data={appointmentTrend} labels={chartLabels} />
          <TrendChart title="Revenue overview" subtitle="Collected revenue over the last 12 months" value="$84,250" change="8.2%" data={revenueTrend} labels={chartLabels} color="green" />
          <TrendChart title="Patient growth" subtitle="New patients over the last 12 months" value="2,840" change="10.4%" data={[31, 36, 43, 40, 51, 57, 62, 67, 74, 79, 91, 100]} labels={chartLabels} color="blue" />
        </div>
        <QuickActions />
      </section>

      <Card className="table-card">
        <div className="section-heading table-section-heading">
          <div><div className="section-title-with-icon"><span className="section-heading-icon"><Clock3 size={17} /></span><h2>Today’s appointments</h2></div><p>Your upcoming schedule for today</p></div>
          <Button variant="subtle" size="small" to="/appointments" iconAfter={ArrowRight}>View all</Button>
        </div>
        <DataTable columns={appointmentColumns} rows={appointmentRows} />
      </Card>

      <Card className="table-card recent-patients-card">
        <div className="section-heading table-section-heading">
          <div><div className="section-title-with-icon"><span className="section-heading-icon section-heading-icon-blue"><Clock3 size={17} /></span><h2>Recent patients</h2></div><p>Latest patient activity at your clinic</p></div>
          <Button variant="subtle" size="small" to="/patients" iconAfter={ArrowRight}>View all</Button>
        </div>
        <DataTable columns={patientColumns} rows={patientRows} />
      </Card>

      <Modal open={appointmentModalOpen} onClose={() => setAppointmentModalOpen(false)} title="New appointment">
        <p className="modal-description">Appointment scheduling will be connected when clinic workflows are implemented.</p>
        <div className="modal-actions"><Button variant="secondary" onClick={() => setAppointmentModalOpen(false)}>Close</Button><Button to="/appointments" onClick={() => setAppointmentModalOpen(false)}>Go to appointments</Button></div>
      </Modal>
    </div>
  )
}
