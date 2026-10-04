import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getCurrentUser, loginUser, registerUser } from '../../services/authService.js'
import { clearToken, getToken, setToken } from '../../services/tokenStorage.js'

function getError(error) {
  const status = error.response?.status || null
  if (!error.response) {
    return {
      message: error.code === 'ECONNABORTED'
        ? 'The MediFlow server took too long to respond. Please try again.'
        : 'Cannot reach the MediFlow server. Check that the backend is running and try again.',
      status: null,
    }
  }

  if (status === 409) return { message: 'An account with this email already exists.', status }
  if (status === 503) {
    const details = String(error.response.data?.message || '').toLowerCase()
    const message = details.includes('database')
      ? 'MediFlow cannot reach the clinic database right now. Please try again shortly.'
      : 'Account services are temporarily unavailable. Please try again shortly.'
    return { message, status }
  }
  if (status >= 500) return { message: 'The server could not complete your request. Please try again shortly.', status }

  return {
    message: error.response.data?.message || error.message || 'Something went wrong. Please try again.',
    status,
  }
}

function persistSession(payload) {
  if (!payload.token || !payload.user) throw new Error('The server returned an incomplete authentication response')
  if (!setToken(payload.token)) throw new Error('Your browser could not save the session. Check local storage permissions.')
  return payload
}

export const register = createAsyncThunk('auth/register', async (userData, { rejectWithValue }) => {
  try {
    return persistSession(await registerUser(userData))
  } catch (error) {
    return rejectWithValue(getError(error))
  }
})

export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    return persistSession(await loginUser(credentials))
  } catch (error) {
    return rejectWithValue(getError(error))
  }
})

export const restoreCurrentUser = createAsyncThunk('auth/restoreCurrentUser', async (_, { rejectWithValue }) => {
  try {
    return await getCurrentUser()
  } catch (error) {
    const result = getError(error)
    if ([401, 403].includes(result.status)) clearToken()
    return rejectWithValue(result)
  }
})

export const logout = createAsyncThunk('auth/logout', async () => {
  clearToken()
})

const initialState = {
  user: null,
  token: getToken(),
  isAuthenticated: false,
  isLoading: Boolean(getToken()),
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuth(state) {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.isLoading = false
      state.error = null
    },
  },
  extraReducers(builder) {
    builder
      .addCase(register.pending, (state) => { state.isLoading = true; state.error = null })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
        state.isLoading = false
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload?.message || action.error.message
      })
      .addCase(login.pending, (state) => { state.isLoading = true; state.error = null })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
        state.isLoading = false
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload?.message || action.error.message
      })
      .addCase(restoreCurrentUser.pending, (state) => { state.isLoading = true; state.error = null })
      .addCase(restoreCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload
        state.token = getToken()
        state.isAuthenticated = true
        state.isLoading = false
      })
      .addCase(restoreCurrentUser.rejected, (state, action) => {
        state.user = null
        state.isAuthenticated = false
        state.isLoading = false
        state.error = action.payload?.message || action.error.message
        if ([401, 403].includes(action.payload?.status)) state.token = null
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null
        state.token = null
        state.isAuthenticated = false
        state.isLoading = false
        state.error = null
      })
  },
})

export const { clearAuth } = authSlice.actions
export default authSlice.reducer