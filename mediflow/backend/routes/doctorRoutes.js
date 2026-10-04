import { Router } from 'express'
import { createDoctor, deleteDoctor, getDoctorById, getDoctors, updateDoctor, updateDoctorAvailability } from '../controllers/doctorController.js'
import { protect } from '../middleware/authMiddleware.js'
import { authorize } from '../middleware/roleMiddleware.js'

const doctorRoutes = Router()
doctorRoutes.use(protect)
doctorRoutes.route('/')
  .post(authorize('admin'), createDoctor)
  .get(authorize('admin', 'doctor', 'receptionist', 'patient'), getDoctors)
doctorRoutes.patch('/:id/availability', authorize('admin', 'doctor'), updateDoctorAvailability)
doctorRoutes.route('/:id')
  .get(authorize('admin', 'doctor', 'receptionist', 'patient'), getDoctorById)
  .put(authorize('admin', 'doctor'), updateDoctor)
  .delete(authorize('admin'), deleteDoctor)

export default doctorRoutes