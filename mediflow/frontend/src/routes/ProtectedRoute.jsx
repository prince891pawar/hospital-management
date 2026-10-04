import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import AuthLoadingScreen from '../components/auth/AuthLoadingScreen.jsx'

export default function ProtectedRoute() {
  const { user, isAuthenticated, isLoading } = useSelector((state) => state.auth)
  const location = useLocation()

  if (isLoading) return <AuthLoadingScreen />
  if (!isAuthenticated || !user) return <Navigate to="/login" replace state={{ from: location }} />
  return <Outlet />
}