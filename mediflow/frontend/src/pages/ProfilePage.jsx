import { useSelector } from 'react-redux'
import Settings from './settings/Settings.jsx'
import PatientSelfProfile from './patients/PatientSelfProfile.jsx'

export default function ProfilePage() {
  const role = useSelector((state) => state.auth.user?.role)
  return role === 'patient' ? <PatientSelfProfile /> : <Settings />
}