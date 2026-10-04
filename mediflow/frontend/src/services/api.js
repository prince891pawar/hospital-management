import axios from 'axios'
import { clearToken, getToken } from './tokenStorage.js'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

api.interceptors.request.use((config) => {
  const token = getToken()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const config = error.config || {}
    const isAuthEndpoint = /\/auth\/(login|register|me)(?:\?|$)/.test(config.url || '')

    if (error.response?.status === 401 && !config.skipAuthRedirect && !isAuthEndpoint) {
      clearToken()
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('mediflow:unauthorized'))
        if (window.location.pathname !== '/login') window.location.replace('/login')
      }
    }

    return Promise.reject(error)
  },
)

export default api