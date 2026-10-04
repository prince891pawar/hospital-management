import { configureStore } from '@reduxjs/toolkit'
import authReducer, { clearAuth } from './slices/authSlice.js'
import patientReducer from './slices/patientSlice.js'
import doctorReducer from './slices/doctorSlice.js'

export const store = configureStore({
  reducer: { auth: authReducer, patients: patientReducer, doctors: doctorReducer },
})

if (typeof window !== 'undefined') {
  window.addEventListener('mediflow:unauthorized', () => store.dispatch(clearAuth()))
}