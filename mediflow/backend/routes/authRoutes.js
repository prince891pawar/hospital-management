import { Router } from 'express'
import { getCurrentUser, login, register } from '../controllers/authController.js'
import { protect } from '../middleware/authMiddleware.js'
import { requireDatabase } from '../middleware/databaseMiddleware.js'
import { validateLogin, validateRegistration } from '../validators/authValidators.js'

const authRoutes = Router()

authRoutes.post('/register', validateRegistration, requireDatabase, register)
authRoutes.post('/login', validateLogin, requireDatabase, login)
authRoutes.get('/me', protect, getCurrentUser)

export default authRoutes