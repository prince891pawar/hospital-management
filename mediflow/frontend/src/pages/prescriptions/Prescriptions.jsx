import { useState } from 'react'
import { ClipboardPlus, Download, Plus } from 'lucide-react'
import Button from '../../components/common/Button.jsx'
import Card from '../../components/common/Card.jsx'
import PageHeader from '../../components/common/PageHeader.jsx'
import RecordActionDialog from '../../components/common/RecordActionDialog.jsx'
import DataTable from '../../components/ui/DataTable.jsx'
import DropdownMenu from '../../components/ui/DropdownMenu.jsx'
import SearchInput from '../../components/ui/SearchInput.jsx'
import StatusBadge from '../../components/ui/StatusBadge.jsx'
import { managementPrescriptions } from '../../data/managementData.js'

export default function Prescriptions() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('All statuses')
  const [selection, setSelection] = useState(null)
  const rows = managementPrescriptions.filter((row) => `${row.id} ${row.patient} ${row.doctor} ${row.diagnosis}`.toLowerCase().includes(search.toLowerCase())).filter((row) => status === 'All statuses' || row.status === status)
  const columns = [
    { key: 'id', label: 'Prescription ID', render: (row) => <strong className="table-primary-text">{row.id}</strong> },
    { key: 'patient', label: 'Patient' },
    { key: 'doctor', label: 'Doctor' },
    { key: 'date', label: 'Date' },
    { key: 'diagnosis', label: 'Diagnosis' },
    { key: 'status', label: 'Status', render: (row) => <StatusBadge status={row.status} /> },
    { key: 'actions', label: '', render: (row) => <DropdownMenu items={[{ label: 'View', onClick: () => setSelection({ action: 'View', entity: 'prescription', record: row }) }, { label: 'Download', icon: Download, onClick: () => setSelection({ action: 'Download', entity: 'prescription', record: row }) }, { label: 'Edit', onClick: () => setSelection({ action: 'Edit', entity: 'prescription', record: row }) }]} /> },
  ]

  return (
    <div className="page-content">
      <PageHeader title="Prescriptions" description="Review and manage treatment plans created by your care team." action={<Button icon={Plus} onClick={() => setSelection({ action: 'Add', entity: 'prescription' })}>New prescription</Button>} />
      <div className="page-toolbar"><SearchInput value={search} onChange={setSearch} label="Search prescriptions" placeholder="Search patient, doctor, diagnosis or ID..." /><div className="page-toolbar-group"><label className="sr-only" htmlFor="prescription-status">Filter prescriptions by status</label><select id="prescription-status" className="mf-select" value={status} onChange={(event) => setStatus(event.target.value)}><option>All statuses</option><option>Active</option><option>Completed</option><option>Draft</option></select></div></div>
      <Card className="mf-table-page-card">
        <div className="list-card-heading"><div><h2>Prescription list</h2><span>{rows.length} prescriptions</span></div><span className="list-heading-icon"><ClipboardPlus size={17} /></span></div>
        <DataTable columns={columns} rows={rows} emptyTitle="No prescriptions found" emptyDescription="Try searching for another patient or diagnosis." />
      </Card>
      <RecordActionDialog selection={selection} onClose={() => setSelection(null)} />
    </div>
  )
}