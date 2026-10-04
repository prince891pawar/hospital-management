import api from './api.js'

export async function getDoctors(params = {}) {
  const { availability, ...filters } = params
  const response = await api.get('/doctors', { params: { ...filters, ...(availability ? { availableOn: availability } : {}) } })
  return { doctors: response.data.data || [], pagination: response.data.pagination || null }
}

export async function getDoctor(id) {
  const response = await api.get(`/doctors/${encodeURIComponent(id)}`)
  return response.data.data.doctor
}

export async function createDoctor(data) {
  const response = await api.post('/doctors', data)
  return response.data.data.doctor
}

export async function updateDoctor(id, data) {
  const response = await api.put(`/doctors/${encodeURIComponent(id)}`, data)
  return response.data.data.doctor
}

export async function deleteDoctor(id) {
  const response = await api.delete(`/doctors/${encodeURIComponent(id)}`)
  return response.data.data
}

export async function updateAvailability(id, availability) {
  const response = await api.patch(`/doctors/${encodeURIComponent(id)}/availability`, { availability })
  return response.data.data.doctor
}