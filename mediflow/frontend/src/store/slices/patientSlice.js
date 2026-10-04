import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getApiError } from '../../services/apiError.js'
import * as patientService from '../../services/patientService.js'
import { clearAuth, login, logout, register } from './authSlice.js'

export const fetchPatients = createAsyncThunk('patients/fetchAll', async (params, { rejectWithValue }) => {
  try { return await patientService.getPatients(params) } catch (error) { return rejectWithValue(getApiError(error).message) }
})

export const fetchPatient = createAsyncThunk('patients/fetchOne', async (id, { rejectWithValue }) => {
  try { return await patientService.getPatient(id) } catch (error) { return rejectWithValue(getApiError(error).message) }
})

export const addPatient = createAsyncThunk('patients/create', async (data, { rejectWithValue }) => {
  try { return await patientService.createPatient(data) } catch (error) { return rejectWithValue(getApiError(error).message) }
})

export const savePatient = createAsyncThunk('patients/update', async ({ id, data }, { rejectWithValue }) => {
  try { return await patientService.updatePatient(id, data) } catch (error) { return rejectWithValue(getApiError(error).message) }
})

export const removePatient = createAsyncThunk('patients/delete', async (id, { rejectWithValue }) => {
  try { await patientService.deletePatient(id); return id } catch (error) { return rejectWithValue(getApiError(error).message) }
})

const initialState = { patients: [], selectedPatient: null, isLoading: false, isSaving: false, error: null, pagination: { page: 1, limit: 10, total: 0, totalPages: 0 }, filters: { search: '', status: '', gender: '', sort: 'newest' } }

const patientSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {
    setPatientFilters(state, action) {
      const { page, ...filters } = action.payload
      if (page !== undefined) state.pagination.page = page
      if (Object.keys(filters).length) {
        state.filters = { ...state.filters, ...filters }
        state.pagination.page = 1
      }
    },
    clearSelectedPatient(state) { state.selectedPatient = null },
  },
  extraReducers(builder) {
    builder
      .addCase(login.fulfilled, () => initialState)
      .addCase(register.fulfilled, () => initialState)
      .addCase(logout.fulfilled, () => initialState)
      .addCase(clearAuth, () => initialState)
      .addCase(fetchPatients.pending, (state) => { state.isLoading = true; state.error = null })
      .addCase(fetchPatients.fulfilled, (state, action) => { state.isLoading = false; state.patients = action.payload.patients; if (action.payload.pagination) state.pagination = action.payload.pagination })
      .addCase(fetchPatients.rejected, (state, action) => { state.isLoading = false; state.error = action.payload || action.error.message })
      .addCase(fetchPatient.pending, (state) => { state.isLoading = true; state.error = null })
      .addCase(fetchPatient.fulfilled, (state, action) => { state.isLoading = false; state.selectedPatient = action.payload })
      .addCase(fetchPatient.rejected, (state, action) => { state.isLoading = false; state.error = action.payload || action.error.message })
      .addCase(addPatient.pending, (state) => { state.isSaving = true; state.error = null })
      .addCase(addPatient.fulfilled, (state, action) => { state.isSaving = false; state.patients.unshift(action.payload); state.selectedPatient = action.payload })
      .addCase(addPatient.rejected, (state, action) => { state.isSaving = false; state.error = action.payload || action.error.message })
      .addCase(savePatient.pending, (state) => { state.isSaving = true; state.error = null })
      .addCase(savePatient.fulfilled, (state, action) => { state.isSaving = false; state.selectedPatient = action.payload; state.patients = state.patients.map((patient) => patient._id === action.payload._id ? action.payload : patient) })
      .addCase(savePatient.rejected, (state, action) => { state.isSaving = false; state.error = action.payload || action.error.message })
      .addCase(removePatient.pending, (state) => { state.isSaving = true; state.error = null })
      .addCase(removePatient.fulfilled, (state, action) => { state.isSaving = false; state.patients = state.patients.filter((patient) => patient._id !== action.payload); if (state.selectedPatient?._id === action.payload) state.selectedPatient = null })
      .addCase(removePatient.rejected, (state, action) => { state.isSaving = false; state.error = action.payload || action.error.message })
  },
})

export const { setPatientFilters, clearSelectedPatient } = patientSlice.actions
export default patientSlice.reducer