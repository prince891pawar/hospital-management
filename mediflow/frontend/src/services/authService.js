import api from './api.js'

function authPayload(response) {
  const payload = response.data?.data || response.data
  if (!payload?.user) throw new Error('The server returned an invalid authentication response')
  return payload
}

export async function registerUser(userData) {
  const response = await api.post('/auth/register', userData, { skipAuthRedirect: true })
  return authPayload(response)
}

export async function loginUser(credentials) {
  const response = await api.post('/auth/login', credentials, { skipAuthRedirect: true })
  return authPayload(response)
}

export async function getCurrentUser() {
  const response = await api.get('/auth/me', { skipAuthRedirect: true })
  const user = response.data?.data?.user || response.data?.user
  if (!user) throw new Error('The server returned an invalid user profile')
  return user
}