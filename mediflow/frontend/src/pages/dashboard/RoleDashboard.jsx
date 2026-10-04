import { useSelector } from 'react-redux'
import Dashboard from './Dashboard.jsx'
import PatientDashboard from './PatientDashboard.jsx'

export default function RoleDashboard() {
  const role = useSelector((state) => state.auth.user?.role)
  return role === 'patient' ? <PatientDashboard /> : <Dashboard />
}