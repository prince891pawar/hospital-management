import {
  CalendarDays,
  ClipboardPlus,
  CircleUserRound,
  CreditCard,
  FileBarChart,
  FileText,
  LayoutDashboard,
  UsersRound,
  UserRoundCog,
} from 'lucide-react'

export const navigationItems = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Patients', path: '/patients', icon: UsersRound },
  { label: 'Doctors', path: '/doctors', icon: UserRoundCog },
  { label: 'Appointments', path: '/appointments', icon: CalendarDays },
  { label: 'Prescriptions', path: '/prescriptions', icon: ClipboardPlus },
  { label: 'Billing', path: '/billing', icon: CreditCard },
  { label: 'Reports', path: '/reports', icon: FileBarChart },
  { label: 'Settings', path: '/settings', icon: FileText },
]

const patientNavigationItems = [
  navigationItems[0],
  { label: 'My Appointments', path: '/my-appointments', icon: CalendarDays },
  { label: 'My Prescriptions', path: '/my-prescriptions', icon: ClipboardPlus },
  { label: 'My Profile', path: '/profile', icon: CircleUserRound },
  navigationItems[7],
]

const rolePaths = {
  admin: navigationItems.map(({ path }) => path),
  doctor: ['/dashboard', '/patients', '/appointments', '/prescriptions', '/reports', '/settings'],
  receptionist: ['/dashboard', '/patients', '/appointments', '/billing', '/settings'],
}

export function getNavigationForRole(role) {
  if (role === 'patient') return patientNavigationItems
  const paths = rolePaths[role] || rolePaths.admin
  return navigationItems.filter(({ path }) => paths.includes(path))
}