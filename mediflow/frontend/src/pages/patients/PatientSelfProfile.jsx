import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Card from '../../components/common/Card.jsx'
import EmptyState from '../../components/common/EmptyState.jsx'
import ErrorState from '../../components/common/ErrorState.jsx'
import LoadingState from '../../components/common/LoadingState.jsx'
import { fetchPatients } from '../../store/slices/patientSlice.js'
import PatientDetails from './PatientDetails.jsx'

export default function PatientSelfProfile() {
  const dispatch = useDispatch()
  const { patients, isLoading, error } = useSelector((state) => state.patients)

  useEffect(() => { dispatch(fetchPatients({ page: 1, limit: 1 })) }, [dispatch])

  if (isLoading && !patients.length) return <LoadingState rows={4} />
  if (error && !patients.length) return <ErrorState message={error} onRetry={() => dispatch(fetchPatients({ page: 1, limit: 1 }))} />
  if (!patients.length) return <Card><EmptyState title="Patient profile not found" description="Your clinic has not linked a patient record to this account yet." /></Card>
  return <PatientDetails patientId={patients[0]._id} />
}