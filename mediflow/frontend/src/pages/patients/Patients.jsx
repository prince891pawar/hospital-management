import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Eye, Pencil, Plus, Trash2 } from 'lucide-react'
import Button from '../../components/common/Button.jsx'
import Card from '../../components/common/Card.jsx'
import ConfirmDialog from '../../components/common/ConfirmDialog.jsx'
import ErrorState from '../../components/common/ErrorState.jsx'
import Modal from '../../components/common/Modal.jsx'
import PageHeader from '../../components/common/PageHeader.jsx'
import Pagination from '../../components/common/Pagination.jsx'
import PatientForm from '../../components/forms/PatientForm.jsx'
import DataTable from '../../components/ui/DataTable.jsx'
import DropdownMenu from '../../components/ui/DropdownMenu.jsx'
import SearchInput from '../../components/ui/SearchInput.jsx'
import StatusBadge from '../../components/ui/StatusBadge.jsx'
import { addPatient, fetchPatients, removePatient, savePatient, setPatientFilters } from '../../store/slices/patientSlice.js'

function patientAge(dateOfBirth) {
  if (!dateOfBirth) return '—'
  const birth = new Date(dateOfBirth)
  const now = new Date()
  let age = now.getFullYear() - birth.getFullYear()
  if (now < new Date(now.getFullYear(), birth.getMonth(), birth.getDate())) age -= 1
  return age
}

export default function Patients() {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { patients, isLoading, isSaving, error, pagination, filters } = useSelector((state) => state.patients)
  const [search, setSearch] = useState(filters.search)
  const [formSelection, setFormSelection] = useState(null)
  const [deleteSelection, setDeleteSelection] = useState(null)
  const [actionError, setActionError] = useState('')
  const canManage = ['admin', 'receptionist'].includes(user?.role)

  useEffect(() => {
    const timer = window.setTimeout(() => dispatch(setPatientFilters({ search })), 250)
    return () => window.clearTimeout(timer)
  }, [dispatch, search])

  useEffect(() => {
    dispatch(fetchPatients({ ...filters, page: pagination.page, limit: pagination.limit }))
  }, [dispatch, filters, pagination.page, pagination.limit])

  const refresh = () => dispatch(fetchPatients({ ...filters, page: pagination.page, limit: pagination.limit }))
  const setFilter = (name, value) => dispatch(setPatientFilters({ [name]: value }))

  const save = async (data) => {
    setActionError('')
    try {
      if (formSelection.patient?._id) await dispatch(savePatient({ id: formSelection.patient._id, data })).unwrap()
      else await dispatch(addPatient(data)).unwrap()
      setFormSelection(null)
      refresh()
    } catch (message) {
      setActionError(typeof message === 'string' ? message : 'Unable to save this patient. Please try again.')
    }
  }

  const remove = async () => {
    try {
      await dispatch(removePatient(deleteSelection._id)).unwrap()
      setDeleteSelection(null)
      refresh()
    } catch (message) {
      setActionError(typeof message === 'string' ? message : 'Unable to delete this patient. Please try again.')
    }
  }

  const columns = [
    { key: 'name', label: 'Patient', render: (row) => <div className="person-cell"><span className="mf-avatar">{row.firstName?.[0]}{row.lastName?.[0]}</span><span><strong>{row.firstName} {row.lastName}</strong><small>{row.email || 'No email on file'}</small></span></div> },
    { key: 'patientId', label: 'Patient ID' },
    { key: 'age', label: 'Age', render: (row) => patientAge(row.dateOfBirth) },
    { key: 'gender', label: 'Gender', render: (row) => row.gender?.replaceAll('_', ' ') || '—' },
    { key: 'phone', label: 'Phone' },
    { key: 'status', label: 'Status', render: (row) => <StatusBadge status={row.status} /> },
    { key: 'lastVisit', label: 'Last visit', render: () => 'Not recorded' },
    { key: 'actions', label: '', render: (row) => <DropdownMenu items={[
      { label: 'View', icon: Eye, to: `/patients/${row._id}` },
      ...(canManage ? [{ label: 'Edit', icon: Pencil, onClick: () => { setActionError(''); setFormSelection({ patient: row }) } }] : []),
      ...(user?.role === 'admin' ? [{ label: 'Delete', icon: Trash2, danger: true, onClick: () => setDeleteSelection(row) }] : []),
    ]} /> },
  ]

  return (
    <div className="page-content">
      <PageHeader title="Patients" description="Manage clinic patients and their medical records." action={canManage && <Button icon={Plus} onClick={() => { setActionError(''); setFormSelection({ patient: null }) }}>Add patient</Button>} />
      <div className="page-toolbar">
        <SearchInput value={search} onChange={setSearch} label="Search patients" placeholder="Search by name, ID, email or phone..." />
        <div className="page-toolbar-group">
          <label className="sr-only" htmlFor="patient-status-filter">Filter by status</label>
          <select id="patient-status-filter" className="mf-select" value={filters.status} onChange={(event) => setFilter('status', event.target.value)}><option value="">All statuses</option><option value="active">Active</option><option value="inactive">Inactive</option><option value="archived">Archived</option></select>
          <label className="sr-only" htmlFor="patient-gender-filter">Filter by gender</label>
          <select id="patient-gender-filter" className="mf-select" value={filters.gender} onChange={(event) => setFilter('gender', event.target.value)}><option value="">All genders</option><option value="female">Female</option><option value="male">Male</option><option value="non_binary">Non-binary</option><option value="prefer_not_to_say">Prefer not to say</option></select>
          <label className="sr-only" htmlFor="patient-sort">Sort patients</label>
          <select id="patient-sort" className="mf-select" value={filters.sort} onChange={(event) => setFilter('sort', event.target.value)}><option value="newest">Newest first</option><option value="oldest">Oldest first</option><option value="name">Name A-Z</option><option value="-name">Name Z-A</option><option value="patientId">Patient ID</option></select>
        </div>
      </div>
      <Card className="mf-table-page-card">
        <div className="list-card-heading"><div><h2>Patient records</h2><span>{pagination.total} records</span></div></div>
        {error ? <ErrorState message={error} onRetry={refresh} /> : <DataTable columns={columns} rows={patients} loading={isLoading} emptyTitle="No patients found" emptyDescription="Try another search or adjust your filters." />}
        {!error && <Pagination page={pagination.page} totalPages={pagination.totalPages} total={pagination.total} onPageChange={(page) => dispatch(setPatientFilters({ page }))} />}
      </Card>
      <Modal open={Boolean(formSelection)} onClose={() => !isSaving && setFormSelection(null)} title={formSelection?.patient ? 'Edit patient' : 'Add patient'} size="large">
        {formSelection && <PatientForm key={formSelection.patient?._id || 'new'} initialValues={formSelection.patient} loading={isSaving} error={actionError} onSubmit={save} onCancel={() => setFormSelection(null)} />}
      </Modal>
      <ConfirmDialog open={Boolean(deleteSelection)} title="Delete patient?" message={deleteSelection ? `Delete ${deleteSelection.firstName} ${deleteSelection.lastName}'s patient record? This cannot be undone.` : ''} loading={isSaving} onConfirm={remove} onClose={() => setDeleteSelection(null)} />
      {actionError && !formSelection && <p className="auth-feedback" role="alert">{actionError}</p>}
    </div>
  )
}