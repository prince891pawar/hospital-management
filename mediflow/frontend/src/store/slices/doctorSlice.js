import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getApiError } from '../../services/apiError.js'
import * as doctorService from '../../services/doctorService.js'
import { clearAuth, login, logout, register } from './authSlice.js'

export const fetchDoctors = createAsyncThunk('doctors/fetchAll', async (params, { rejectWithValue }) => {
  try { return await doctorService.getDoctors(params) } catch (error) { return rejectWithValue(getApiError(error).message) }
})

export const fetchDoctor = createAsyncThunk('doctors/fetchOne', async (id, { rejectWithValue }) => {
  try { return await doctorService.getDoctor(id) } catch (error) { return rejectWithValue(getApiError(error).message) }
})

export const addDoctor = createAsyncThunk('doctors/create', async (data, { rejectWithValue }) => {
  try { return await doctorService.createDoctor(data) } catch (error) { return rejectWithValue(getApiError(error).message) }
})

export const saveDoctor = createAsyncThunk('doctors/update', async ({ id, data }, { rejectWithValue }) => {
  try { return await doctorService.updateDoctor(id, data) } catch (error) { return rejectWithValue(getApiError(error).message) }
})

export const removeDoctor = createAsyncThunk('doctors/delete', async (id, { rejectWithValue }) => {
  try { await doctorService.deleteDoctor(id); return id } catch (error) { return rejectWithValue(getApiError(error).message) }
})

export const saveDoctorAvailability = createAsyncThunk('doctors/updateAvailability', async ({ id, availability }, { rejectWithValue }) => {
  try { return await doctorService.updateAvailability(id, availability) } catch (error) { return rejectWithValue(getApiError(error).message) }
})

const initialState = { doctors: [], selectedDoctor: null, isLoading: false, isSaving: false, error: null, pagination: { page: 1, limit: 10, total: 0, totalPages: 0 }, filters: { search: '', specialty: '', availability: '', status: '', sort: 'newest' } }

const doctorSlice = createSlice({
  name: 'doctors',
  initialState,
  reducers: {
    setDoctorFilters(state, action) {
      const { page, ...filters } = action.payload
      if (page !== undefined) state.pagination.page = page
      if (Object.keys(filters).length) {
        state.filters = { ...state.filters, ...filters }
        state.pagination.page = 1
      }
    },
    clearSelectedDoctor(state) { state.selectedDoctor = null },
  },
  extraReducers(builder) {
    builder
      .addCase(login.fulfilled, () => initialState)
      .addCase(register.fulfilled, () => initialState)
      .addCase(logout.fulfilled, () => initialState)
      .addCase(clearAuth, () => initialState)
      .addCase(fetchDoctors.pending, (state) => { state.isLoading = true; state.error = null })
      .addCase(fetchDoctors.fulfilled, (state, action) => { state.isLoading = false; state.doctors = action.payload.doctors; if (action.payload.pagination) state.pagination = action.payload.pagination })
      .addCase(fetchDoctors.rejected, (state, action) => { state.isLoading = false; state.error = action.payload || action.error.message })
      .addCase(fetchDoctor.pending, (state) => { state.isLoading = true; state.error = null })
      .addCase(fetchDoctor.fulfilled, (state, action) => { state.isLoading = false; state.selectedDoctor = action.payload })
      .addCase(fetchDoctor.rejected, (state, action) => { state.isLoading = false; state.error = action.payload || action.error.message })
      .addCase(addDoctor.pending, (state) => { state.isSaving = true; state.error = null })
      .addCase(addDoctor.fulfilled, (state, action) => { state.isSaving = false; state.doctors.unshift(action.payload); state.selectedDoctor = action.payload })
      .addCase(addDoctor.rejected, (state, action) => { state.isSaving = false; state.error = action.payload || action.error.message })
      .addCase(saveDoctor.pending, (state) => { state.isSaving = true; state.error = null })
      .addCase(saveDoctor.fulfilled, (state, action) => { state.isSaving = false; state.selectedDoctor = action.payload; state.doctors = state.doctors.map((doctor) => doctor._id === action.payload._id ? action.payload : doctor) })
      .addCase(saveDoctorAvailability.fulfilled, (state, action) => { state.selectedDoctor = action.payload; state.doctors = state.doctors.map((doctor) => doctor._id === action.payload._id ? action.payload : doctor) })
      .addCase(saveDoctor.rejected, (state, action) => { state.isSaving = false; state.error = action.payload || action.error.message })
      .addCase(removeDoctor.pending, (state) => { state.isSaving = true; state.error = null })
      .addCase(removeDoctor.fulfilled, (state, action) => { state.isSaving = false; state.doctors = state.doctors.filter((doctor) => doctor._id !== action.payload); if (state.selectedDoctor?._id === action.payload) state.selectedDoctor = null })
      .addCase(removeDoctor.rejected, (state, action) => { state.isSaving = false; state.error = action.payload || action.error.message })
  },
})

export const { setDoctorFilters, clearSelectedDoctor } = doctorSlice.actions
export default doctorSlice.reducer