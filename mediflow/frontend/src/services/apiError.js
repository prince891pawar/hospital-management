export function getApiError(error, fallback = 'Something went wrong. Please try again.') {
  const status = error.response?.status || null
  if (!error.response) {
    return {
      message: error.code === 'ECONNABORTED'
        ? 'The MediFlow server took too long to respond. Please try again.'
        : 'Cannot reach the MediFlow server. Check that the backend is running and try again.',
      status: null,
    }
  }
  if (status === 409) return { message: 'An account or record with this information already exists.', status }
  if (status === 503) {
    const details = String(error.response.data?.message || '').toLowerCase()
    return {
      message: details.includes('database')
        ? 'MediFlow cannot reach the clinic database right now. Please try again shortly.'
        : 'MediFlow services are temporarily unavailable. Please try again shortly.',
      status,
    }
  }
  if (status >= 500) return { message: 'The server could not complete your request. Please try again shortly.', status }
  return { message: error.response.data?.message || fallback, status }
}