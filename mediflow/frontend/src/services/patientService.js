import api from './api.js'

export async function getPatients(params = {}) {
  const response = await api.get('/patients', { params })
  return { patients: response.data.data || [], pagination: response.data.pagination || null }
}

export async function getPatient(id) {
  const response = await api.get(`/patients/${encodeURIComponent(id)}`)
  return response.data.data.patient
}

export async function createPatient(data) {
  const response = await api.post('/patients', data)
  return response.data.data.patient
}

export async function updatePatient(id, data) {
  const response = await api.put(`/patients/${encodeURIComponent(id)}`, data)
  return response.data.data.patient
}

export async function deletePatient(id) {
  const response = await api.delete(`/patients/${encodeURIComponent(id)}`)
  return response.data.data
}