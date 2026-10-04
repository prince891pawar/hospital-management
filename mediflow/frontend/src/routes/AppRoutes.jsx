import { Route, Routes } from 'react-router-dom'
import AuthLayout from '../components/auth/AuthLayout.jsx'
import AppLayout from '../layouts/AppLayout.jsx'
import Appointments from '../pages/appointments/Appointments.jsx'
import Login from '../pages/auth/Login.jsx'
import Register from '../pages/auth/Register.jsx'
import Billing from '../pages/billing/Billing.jsx'
import RoleDashboard from '../pages/dashboard/RoleDashboard.jsx'
import Doctors from '../pages/doctors/Doctors.jsx'
import LandingPage from '../pages/HomePage.jsx'
import NotFound from '../pages/NotFound.jsx'
import DoctorDetails from '../pages/doctors/DoctorDetails.jsx'
import PatientPortalPage from '../pages/patients/PatientPortalPage.jsx'
import PatientDetails from '../pages/patients/PatientDetails.jsx'
import Patients from '../pages/patients/Patients.jsx'
import ProfilePage from '../pages/ProfilePage.jsx'
import Prescriptions from '../pages/prescriptions/Prescriptions.jsx'
import Reports from '../pages/reports/Reports.jsx'
import Settings from '../pages/settings/Settings.jsx'
import Unauthorized from '../pages/Unauthorized.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'
import RoleRoute from './RoleRoute.jsx'

const allRoles = ['admin', 'doctor', 'receptionist', 'patient']

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route element={<RoleRoute allowedRoles={allRoles} />}>
            <Route path="/dashboard" element={<RoleDashboard />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/patients/:id" element={<PatientDetails />} />
            <Route path="/doctors/:id" element={<DoctorDetails />} />
          </Route>
          <Route element={<RoleRoute allowedRoles={['admin', 'doctor', 'receptionist']} />}>
            <Route path="/patients" element={<Patients />} />
            <Route path="/appointments" element={<Appointments />} />
          </Route>
          <Route element={<RoleRoute allowedRoles={['admin']} />}>
            <Route path="/doctors" element={<Doctors />} />
          </Route>
          <Route element={<RoleRoute allowedRoles={['admin', 'doctor']} />}>
            <Route path="/prescriptions" element={<Prescriptions />} />
            <Route path="/reports" element={<Reports />} />
          </Route>
          <Route element={<RoleRoute allowedRoles={['admin', 'receptionist']} />}>
            <Route path="/billing" element={<Billing />} />
          </Route>
          <Route element={<RoleRoute allowedRoles={['patient']} />}>
            <Route path="/my-appointments" element={<PatientPortalPage section="appointments" />} />
            <Route path="/my-prescriptions" element={<PatientPortalPage section="prescriptions" />} />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}