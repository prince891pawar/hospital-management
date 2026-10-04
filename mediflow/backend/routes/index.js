import { Router } from 'express'
import authRoutes from './authRoutes.js'
import patientRoutes from './patientRoutes.js'
import doctorRoutes from './doctorRoutes.js'

const apiRoutes = Router()

apiRoutes.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'MediFlow API is running',
  })
})

apiRoutes.use('/auth', authRoutes)
apiRoutes.use('/patients', patientRoutes)
apiRoutes.use('/doctors', doctorRoutes)

export default apiRoutes