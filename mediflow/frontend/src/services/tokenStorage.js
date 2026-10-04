const TOKEN_KEY = 'mediflow_token'

export function getToken() {
  try {
    return window.localStorage.getItem(TOKEN_KEY)
  } catch {
    return null
  }
}

export function setToken(token) {
  try {
    window.localStorage.setItem(TOKEN_KEY, token)
    return true
  } catch {
    return false
  }
}

export function clearToken() {
  try {
    window.localStorage.removeItem(TOKEN_KEY)
  } catch {
    return undefined
  }
  return undefined
}