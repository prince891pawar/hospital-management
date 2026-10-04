export const dashboardStats = [
  { label: 'Total patients', value: '2,840', change: '+12.8%', note: 'vs. last month', icon: 'patients', tone: 'teal' },
  { label: "Today's appointments", value: '24', change: '+4.3%', note: 'vs. last Tuesday', icon: 'appointments', tone: 'blue' },
  { label: 'Available doctors', value: '18', change: 'On schedule', note: '2 on leave today', icon: 'doctors', tone: 'amber' },
  { label: "Today's revenue", value: '$8,420', change: '+8.2%', note: 'vs. daily average', icon: 'revenue', tone: 'green' },
]

export const appointmentRows = [
  { id: 'apt-1', patient: 'Olivia Rhye', initials: 'OR', patientTone: 'rose', doctor: 'Dr. James Cooper', specialty: 'Cardiology', time: '09:00 AM', type: 'Consultation', status: 'Confirmed' },
  { id: 'apt-2', patient: 'Phoenix Baker', initials: 'PB', patientTone: 'blue', doctor: 'Dr. Sarah Chen', specialty: 'Dermatology', time: '09:30 AM', type: 'Follow-up', status: 'Waiting' },
  { id: 'apt-3', patient: 'Lana Steiner', initials: 'LS', patientTone: 'amber', doctor: 'Dr. Michael Torres', specialty: 'Neurology', time: '10:15 AM', type: 'Consultation', status: 'Completed' },
  { id: 'apt-4', patient: 'Demi Wilkinson', initials: 'DW', patientTone: 'violet', doctor: 'Dr. Aisha Patel', specialty: 'Pediatrics', time: '11:00 AM', type: 'Check-up', status: 'Confirmed' },
]

export const patientRows = [
  { id: 'PT-2048', name: 'Olivia Rhye', initials: 'OR', tone: 'rose', age: 32, gender: 'Female', lastVisit: 'Today, 09:00', status: 'Active' },
  { id: 'PT-2047', name: 'Phoenix Baker', initials: 'PB', tone: 'blue', age: 28, gender: 'Male', lastVisit: 'Today, 08:45', status: 'Active' },
  { id: 'PT-2046', name: 'Lana Steiner', initials: 'LS', tone: 'amber', age: 41, gender: 'Female', lastVisit: 'Yesterday', status: 'Active' },
]

export const appointmentTrend = [42, 57, 48, 69, 61, 78, 67, 88, 76, 95, 82, 100]
export const revenueTrend = [28, 45, 37, 58, 48, 72, 63, 82, 70, 93, 78, 100]
export const chartLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']