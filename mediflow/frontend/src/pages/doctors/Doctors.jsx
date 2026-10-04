import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CalendarDays, Eye, Pencil, Plus, Stethoscope, Trash2 } from 'lucide-react'
import Button from '../../components/common/Button.jsx'
import Card from '../../components/common/Card.jsx'
import ConfirmDialog from '../../components/common/ConfirmDialog.jsx'
import EmptyState from '../../components/common/EmptyState.jsx'
import ErrorState from '../../components/common/ErrorState.jsx'
import Modal from '../../components/common/Modal.jsx'
import PageHeader from '../../components/common/PageHeader.jsx'
import Pagination from '../../components/common/Pagination.jsx'
import DoctorForm from '../../components/forms/DoctorForm.jsx'
import Badge from '../../components/common/Badge.jsx'
import DropdownMenu from '../../components/ui/DropdownMenu.jsx'
import SearchInput from '../../components/ui/SearchInput.jsx'
import { addDoctor, fetchDoctors, removeDoctor, saveDoctor, setDoctorFilters } from '../../store/slices/doctorSlice.js'

const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export default function Doctors() {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { doctors, isLoading, isSaving, error, pagination, filters } = useSelector((state) => state.doctors)
  const [search, setSearch] = useState(filters.search)
  const [formSelection, setFormSelection] = useState(null)
  const [deleteSelection, setDeleteSelection] = useState(null)
  const [actionError, setActionError] = useState('')
  const canCreate = user?.role === 'admin'

  useEffect(() => {
    const timer = window.setTimeout(() => dispatch(setDoctorFilters({ search })), 250)
    return () => window.clearTimeout(timer)
  }, [dispatch, search])

  useEffect(() => {
    dispatch(fetchDoctors({ ...filters, page: pagination.page, limit: pagination.limit }))
  }, [dispatch, filters, pagination.page, pagination.limit])

  const refresh = () => dispatch(fetchDoctors({ ...filters, page: pagination.page, limit: pagination.limit }))
  const setFilter = (name, value) => dispatch(setDoctorFilters({ [name]: value }))
  const specialties = [...new Set(doctors.map((doctor) => doctor.specialty))]

  const save = async (data) => {
    setActionError('')
    try {
      if (formSelection.doctor?._id) await dispatch(saveDoctor({ id: formSelection.doctor._id, data })).unwrap()
      else await dispatch(addDoctor(data)).unwrap()
      setFormSelection(null)
      refresh()
    } catch (message) {
      setActionError(typeof message === 'string' ? message : 'Unable to save this doctor. Please try again.')
    }
  }

  const remove = async () => {
    try {
      await dispatch(removeDoctor(deleteSelection._id)).unwrap()
      setDeleteSelection(null)
      refresh()
    } catch (message) {
      setActionError(typeof message === 'string' ? message : 'Unable to delete this doctor. Please try again.')
    }
  }

  return (
    <div className="page-content">
      <PageHeader title="Doctors" description="Your care team, specialties, experience, and weekly availability." action={canCreate && <Button icon={Plus} onClick={() => { setActionError(''); setFormSelection({ doctor: null }) }}>Add doctor</Button>} />
      <div className="page-toolbar">
        <SearchInput value={search} onChange={setSearch} label="Search doctors" placeholder="Search by name, specialty, email or ID..." />
        <div className="page-toolbar-group">
          <label className="sr-only" htmlFor="doctor-specialty">Filter by specialty</label><select id="doctor-specialty" className="mf-select" value={filters.specialty} onChange={(event) => setFilter('specialty', event.target.value)}><option value="">All specialties</option>{specialties.map((value) => <option key={value}>{value}</option>)}</select>
          <label className="sr-only" htmlFor="doctor-availability">Filter by availability day</label><select id="doctor-availability" className="mf-select" value={filters.availability} onChange={(event) => setFilter('availability', event.target.value)}><option value="">Any day</option>{weekdays.map((day) => <option key={day}>{day}</option>)}</select>
          <label className="sr-only" htmlFor="doctor-status">Filter by status</label><select id="doctor-status" className="mf-select" value={filters.status} onChange={(event) => setFilter('status', event.target.value)}><option value="">All statuses</option><option value="active">Active</option><option value="inactive">Inactive</option><option value="on_leave">On leave</option></select>
        </div>
      </div>
      {error ? <Card><ErrorState message={error} onRetry={refresh} /></Card> : doctors.length ? <div className="doctor-grid">
        {doctors.map((doctor) => {
          const canEdit = canCreate || (user?.role === 'doctor' && doctor.user === user.id)
          return <Card className="doctor-card" key={doctor._id}>
            <div className="doctor-card-top"><span className="doctor-avatar">{doctor.firstName?.[0]}{doctor.lastName?.[0]}</span><DropdownMenu items={[
              { label: 'View profile', icon: Eye, to: `/doctors/${doctor._id}` },
              ...(canEdit ? [{ label: 'Edit details', icon: Pencil, onClick: () => setFormSelection({ doctor }) }] : []),
              ...(canCreate ? [{ label: 'Delete', icon: Trash2, danger: true, onClick: () => setDeleteSelection(doctor) }] : []),
            ]} /></div>
            <h2>Dr. {doctor.firstName} {doctor.lastName}</h2><p className="doctor-specialty"><Stethoscope size={14} />{doctor.specialty}</p><p className="doctor-experience">{doctor.qualification} · {doctor.experience} years</p>
            <div className="doctor-card-divider" />
            <div className="doctor-card-meta"><span><CalendarDays size={14} />Weekly availability</span><Badge tone={doctor.status === 'active' ? 'green' : doctor.status === 'on_leave' ? 'amber' : 'gray'}>{doctor.status?.replaceAll('_', ' ')}</Badge></div>
            <p className="doctor-availability-summary">{doctor.availability?.length ? doctor.availability.map((item) => item.day.slice(0, 3)).join(', ') : 'No schedule set'}</p>
            <Button variant="secondary" size="small" className="doctor-view-button" to={`/doctors/${doctor._id}`}>View profile</Button>
          </Card>
        })}
      </div> : <Card>{isLoading ? <div className="mf-loading-state" role="status" aria-label="Loading doctors"><span className="mf-skeleton-row" /><span className="mf-skeleton-row" /><span className="mf-skeleton-row" /></div> : <EmptyState icon={Stethoscope} title="No doctors found" description="Try another search or filter, or add a doctor to your clinic." />}</Card>}
      {!error && <Pagination page={pagination.page} totalPages={pagination.totalPages} total={pagination.total} onPageChange={(page) => dispatch(setDoctorFilters({ page }))} />}
      <Modal open={Boolean(formSelection)} onClose={() => !isSaving && setFormSelection(null)} title={formSelection?.doctor ? 'Edit doctor' : 'Add doctor'} size="large">
        {formSelection && <DoctorForm key={formSelection.doctor?._id || 'new'} initialValues={formSelection.doctor} loading={isSaving} error={actionError} onSubmit={save} onCancel={() => setFormSelection(null)} />}
      </Modal>
      <ConfirmDialog open={Boolean(deleteSelection)} title="Delete doctor?" message={deleteSelection ? `Delete Dr. ${deleteSelection.firstName} ${deleteSelection.lastName}'s profile? This cannot be undone.` : ''} loading={isSaving} onConfirm={remove} onClose={() => setDeleteSelection(null)} />
      {actionError && !formSelection && <p className="auth-feedback" role="alert">{actionError}</p>}
    </div>
  )
}