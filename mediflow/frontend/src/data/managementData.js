export const managementPatients = [
  { id: 'PT-2048', name: 'Olivia Rhye', initials: 'OR', tone: 'rose', age: 32, gender: 'Female', phone: '+1 (555) 010-2841', lastVisit: 'Oct 24, 2026', status: 'Active' },
  { id: 'PT-2047', name: 'Phoenix Baker', initials: 'PB', tone: 'blue', age: 28, gender: 'Male', phone: '+1 (555) 010-1948', lastVisit: 'Oct 24, 2026', status: 'Active' },
  { id: 'PT-2046', name: 'Lana Steiner', initials: 'LS', tone: 'amber', age: 41, gender: 'Female', phone: '+1 (555) 010-3950', lastVisit: 'Oct 23, 2026', status: 'Active' },
  { id: 'PT-2045', name: 'Demi Wilkinson', initials: 'DW', tone: 'violet', age: 36, gender: 'Female', phone: '+1 (555) 010-4462', lastVisit: 'Oct 22, 2026', status: 'Active' },
  { id: 'PT-2044', name: 'Candice Wu', initials: 'CW', tone: 'blue', age: 52, gender: 'Female', phone: '+1 (555) 010-5893', lastVisit: 'Oct 21, 2026', status: 'Inactive' },
  { id: 'PT-2043', name: 'Natali Craig', initials: 'NC', tone: 'rose', age: 23, gender: 'Female', phone: '+1 (555) 010-6684', lastVisit: 'Oct 19, 2026', status: 'Active' },
  { id: 'PT-2042', name: 'Drew Cano', initials: 'DC', tone: 'amber', age: 47, gender: 'Male', phone: '+1 (555) 010-7012', lastVisit: 'Oct 18, 2026', status: 'Active' },
]

export const managementDoctors = [
  { id: 'DR-018', name: 'James Cooper', initials: 'JC', tone: 'blue', specialty: 'Cardiology', experience: '12 years experience', availability: 'Available today', appointments: 6, status: 'Available' },
  { id: 'DR-017', name: 'Sarah Chen', initials: 'SC', tone: 'rose', specialty: 'Dermatology', experience: '8 years experience', availability: 'Available today', appointments: 4, status: 'Available' },
  { id: 'DR-016', name: 'Michael Torres', initials: 'MT', tone: 'amber', specialty: 'Neurology', experience: '15 years experience', availability: 'In consultation', appointments: 5, status: 'Busy' },
  { id: 'DR-015', name: 'Aisha Patel', initials: 'AP', tone: 'violet', specialty: 'Pediatrics', experience: '9 years experience', availability: 'Available today', appointments: 7, status: 'Available' },
  { id: 'DR-014', name: 'Robert Kim', initials: 'RK', tone: 'green', specialty: 'Orthopedics', experience: '11 years experience', availability: 'On leave today', appointments: 0, status: 'On leave' },
  { id: 'DR-013', name: 'Elena Fischer', initials: 'EF', tone: 'rose', specialty: 'Family medicine', experience: '6 years experience', availability: 'Available today', appointments: 3, status: 'Available' },
]
const formatDate = (date) => new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).format(date)
const today = new Date()
const tomorrow = new Date(today)
tomorrow.setDate(today.getDate() + 1)

export const managementAppointmentDates = {
  today: formatDate(today),
  tomorrow: formatDate(tomorrow),
  todayInput: `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`,
}

export const managementAppointments = [
  { id: 'APT-3842', patient: 'Olivia Rhye', initials: 'OR', tone: 'rose', doctor: 'Dr. James Cooper', specialty: 'Cardiology', date: managementAppointmentDates.today, time: '09:00 AM', type: 'Consultation', status: 'Confirmed' },
  { id: 'APT-3841', patient: 'Phoenix Baker', initials: 'PB', tone: 'blue', doctor: 'Dr. Sarah Chen', specialty: 'Dermatology', date: managementAppointmentDates.today, time: '09:30 AM', type: 'Follow-up', status: 'Waiting' },
  { id: 'APT-3840', patient: 'Lana Steiner', initials: 'LS', tone: 'amber', doctor: 'Dr. Michael Torres', specialty: 'Neurology', date: managementAppointmentDates.today, time: '10:15 AM', type: 'Consultation', status: 'Completed' },
  { id: 'APT-3839', patient: 'Demi Wilkinson', initials: 'DW', tone: 'violet', doctor: 'Dr. Aisha Patel', specialty: 'Pediatrics', date: managementAppointmentDates.today, time: '11:00 AM', type: 'Check-up', status: 'Confirmed' },
  { id: 'APT-3838', patient: 'Candice Wu', initials: 'CW', tone: 'blue', doctor: 'Dr. Elena Fischer', specialty: 'Family medicine', date: managementAppointmentDates.today, time: '11:45 AM', type: 'Consultation', status: 'Cancelled' },
  { id: 'APT-3837', patient: 'Natali Craig', initials: 'NC', tone: 'rose', doctor: 'Dr. James Cooper', specialty: 'Cardiology', date: managementAppointmentDates.tomorrow, time: '08:30 AM', type: 'Follow-up', status: 'Scheduled' },
]

export const managementPrescriptions = [
  { id: 'RX-0984', patient: 'Olivia Rhye', doctor: 'Dr. James Cooper', date: 'Oct 24, 2026', diagnosis: 'Seasonal allergies', status: 'Active' },
  { id: 'RX-0983', patient: 'Phoenix Baker', doctor: 'Dr. Sarah Chen', date: 'Oct 23, 2026', diagnosis: 'Contact dermatitis', status: 'Active' },
  { id: 'RX-0982', patient: 'Lana Steiner', doctor: 'Dr. Michael Torres', date: 'Oct 22, 2026', diagnosis: 'Migraine', status: 'Completed' },
  { id: 'RX-0981', patient: 'Demi Wilkinson', doctor: 'Dr. Aisha Patel', date: 'Oct 21, 2026', diagnosis: 'Routine wellness', status: 'Active' },
  { id: 'RX-0980', patient: 'Candice Wu', doctor: 'Dr. Elena Fischer', date: 'Oct 20, 2026', diagnosis: 'Hypertension', status: 'Draft' },
]

export const managementInvoices = [
  { id: 'INV-2026-148', patient: 'Olivia Rhye', date: 'Oct 24, 2026', amount: '$240.00', status: 'Paid' },
  { id: 'INV-2026-147', patient: 'Phoenix Baker', date: 'Oct 24, 2026', amount: '$185.00', status: 'Pending' },
  { id: 'INV-2026-146', patient: 'Lana Steiner', date: 'Oct 23, 2026', amount: '$320.00', status: 'Paid' },
  { id: 'INV-2026-145', patient: 'Demi Wilkinson', date: 'Oct 22, 2026', amount: '$125.00', status: 'Overdue' },
  { id: 'INV-2026-144', patient: 'Candice Wu', date: 'Oct 21, 2026', amount: '$410.00', status: 'Paid' },
]