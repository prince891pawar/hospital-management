import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function RoleRoute({ allowedRoles }) {
  const user = useSelector((state) => state.auth.user)
  const location = useLocation()

  if (!user) return <Navigate to="/login" replace state={{ from: location }} />
  if (!allowedRoles.includes(user.role)) return <Navigate to="/unauthorized" replace />
  return <Outlet />
}