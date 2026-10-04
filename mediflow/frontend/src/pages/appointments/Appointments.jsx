import { useState } from 'react'
import { CalendarDays, Plus, Trash2 } from 'lucide-react'
import Button from '../../components/common/Button.jsx'
import Card from '../../components/common/Card.jsx'
import PageHeader from '../../components/common/PageHeader.jsx'
import RecordActionDialog from '../../components/common/RecordActionDialog.jsx'
import DataTable from '../../components/ui/DataTable.jsx'
import DropdownMenu from '../../components/ui/DropdownMenu.jsx'
import SearchInput from '../../components/ui/SearchInput.jsx'
import StatusBadge from '../../components/ui/StatusBadge.jsx'
import { managementAppointmentDates, managementAppointments } from '../../data/managementData.js'

export default function Appointments() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('All statuses')
  const [date, setDate] = useState(managementAppointmentDates.todayInput)
  const [selection, setSelection] = useState(null)
  const selectedDate = new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).format(new Date(`${date}T12:00:00`))
  const rows = managementAppointments.filter((row) => `${row.patient} ${row.doctor} ${row.id}`.toLowerCase().includes(search.toLowerCase())).filter((row) => row.date === selectedDate).filter((row) => status === 'All statuses' || row.status === status)
  const columns = [
    { key: 'patient', label: 'Patient', render: (row) => <div className="person-cell"><span className={`mf-avatar avatar-${row.tone}`}>{row.initials}</span><span><strong>{row.patient}</strong><small>{row.id}</small></span></div> },
    { key: 'doctor', label: 'Doctor', render: (row) => <div className="doctor-cell"><strong>{row.doctor}</strong><small>{row.specialty}</small></div> },
    { key: 'date', label: 'Date' },
    { key: 'time', label: 'Time' },
    { key: 'type', label: 'Appointment type' },
    { key: 'status', label: 'Status', render: (row) => <StatusBadge status={row.status} /> },
    { key: 'actions', label: '', render: (row) => <DropdownMenu items={[{ label: 'View details', onClick: () => setSelection({ action: 'View', entity: 'appointment', record: row }) }, { label: 'Edit appointment', onClick: () => setSelection({ action: 'Edit', entity: 'appointment', record: row }) }, { label: 'Cancel appointment', icon: Trash2, danger: true, onClick: () => setSelection({ action: 'Cancel', entity: 'appointment', record: row }) }]} /> },
  ]

  return (
    <div className="page-content">
      <PageHeader title="Appointments" description="Coordinate visits and keep the day moving smoothly." action={<Button icon={Plus} onClick={() => setSelection({ action: 'Add', entity: 'appointment' })}>New appointment</Button>} />
      <div className="page-toolbar">
        <SearchInput value={search} onChange={setSearch} label="Search appointments" placeholder="Search by patient, doctor or ID..." />
        <div className="page-toolbar-group">
          <label className="sr-only" htmlFor="appointment-date">Select appointment date</label><input id="appointment-date" className="mf-date-input" type="date" value={date} onChange={(event) => setDate(event.target.value)} />
          <label className="sr-only" htmlFor="appointment-status">Filter appointment status</label><select id="appointment-status" className="mf-select" value={status} onChange={(event) => setStatus(event.target.value)}><option>All statuses</option><option>Confirmed</option><option>Waiting</option><option>Completed</option><option>Cancelled</option><option>Scheduled</option></select>
        </div>
      </div>
      <Card className="mf-table-page-card">
        <div className="list-card-heading"><div><h2>Appointment schedule</h2><span>{rows.length} appointments</span></div><div className="schedule-date-label"><CalendarDays size={14} />{selectedDate}</div></div>
        <DataTable columns={columns} rows={rows} emptyTitle="No appointments found" emptyDescription="Try changing the date, search, or status filters." />
      </Card>
      <RecordActionDialog selection={selection} onClose={() => setSelection(null)} />
    </div>
  )
}