import { useState } from 'react'
import { ArrowUpRight, Download, FileText, Plus } from 'lucide-react'
import Button from '../../components/common/Button.jsx'
import Card from '../../components/common/Card.jsx'
import PageHeader from '../../components/common/PageHeader.jsx'
import RecordActionDialog from '../../components/common/RecordActionDialog.jsx'
import DataTable from '../../components/ui/DataTable.jsx'
import DropdownMenu from '../../components/ui/DropdownMenu.jsx'
import SearchInput from '../../components/ui/SearchInput.jsx'
import StatusBadge from '../../components/ui/StatusBadge.jsx'
import { managementInvoices } from '../../data/managementData.js'

export default function Billing() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('All statuses')
  const [selection, setSelection] = useState(null)
  const rows = managementInvoices.filter((row) => `${row.id} ${row.patient}`.toLowerCase().includes(search.toLowerCase())).filter((row) => status === 'All statuses' || row.status === status)
  const columns = [
    { key: 'id', label: 'Invoice ID', render: (row) => <strong className="table-primary-text">{row.id}</strong> },
    { key: 'patient', label: 'Patient' },
    { key: 'date', label: 'Date' },
    { key: 'amount', label: 'Amount', render: (row) => <strong className="table-primary-text">{row.amount}</strong> },
    { key: 'status', label: 'Payment status', render: (row) => <StatusBadge status={row.status} /> },
    { key: 'actions', label: '', render: (row) => <DropdownMenu items={[{ label: 'View invoice', onClick: () => setSelection({ action: 'View', entity: 'invoice', record: row }) }, { label: 'Download', icon: Download, onClick: () => setSelection({ action: 'Download', entity: 'invoice', record: row }) }, { label: 'Edit', onClick: () => setSelection({ action: 'Edit', entity: 'invoice', record: row }) }]} /> },
  ]
  const summaries = [
    { label: 'Revenue this month', value: '$48,290', change: '+8.2%', tone: 'green' },
    { label: 'Total invoices', value: '184', change: 'This month', tone: 'blue' },
    { label: 'Paid invoices', value: '152', change: '82.6% collected', tone: 'teal' },
    { label: 'Pending invoices', value: '32', change: '$6,840 outstanding', tone: 'amber' },
  ]

  return (
    <div className="page-content">
      <PageHeader title="Billing" description="Keep invoices and clinic revenue organized in one place." action={<Button icon={Plus} onClick={() => setSelection({ action: 'Add', entity: 'invoice' })}>Create invoice</Button>} />
      <section className="billing-summary-grid" aria-label="Revenue summary">
        {summaries.map((item) => <Card className="billing-summary-card" key={item.label}><span className={`billing-summary-icon tone-${item.tone}`}><FileText size={17} /></span><p>{item.label}</p><strong>{item.value}</strong><small><ArrowUpRight size={13} />{item.change}</small></Card>)}
      </section>
      <div className="page-toolbar"><SearchInput value={search} onChange={setSearch} label="Search invoices" placeholder="Search invoice or patient..." /><div className="page-toolbar-group"><label className="sr-only" htmlFor="invoice-status">Filter invoice status</label><select id="invoice-status" className="mf-select" value={status} onChange={(event) => setStatus(event.target.value)}><option>All statuses</option><option>Paid</option><option>Pending</option><option>Overdue</option></select></div></div>
      <Card className="mf-table-page-card"><div className="list-card-heading"><div><h2>Invoices</h2><span>{rows.length} invoices</span></div><Button variant="secondary" size="small" icon={Download} onClick={() => setSelection({ action: 'Export', entity: 'invoices' })}>Export</Button></div><DataTable columns={columns} rows={rows} emptyTitle="No invoices found" emptyDescription="Try another invoice ID or payment status." /></Card>
      <RecordActionDialog selection={selection} onClose={() => setSelection(null)} />
    </div>
  )
}