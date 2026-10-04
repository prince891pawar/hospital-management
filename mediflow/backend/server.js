import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import { connectDB } from './config/db.js'
import { assertJwtConfiguration } from './utils/generateToken.js'
import apiRoutes from './routes/index.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'

const app = express()
const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173'

function startupFailureCategory(error) {
  const nested = error.reason?.servers ? [...error.reason.servers.values()].map((server) => server.error?.message || '').join(' ') : ''
  const details = `${error.name} ${error.message} ${nested}`.toLowerCase()
  if (/authentication failed|bad auth|code 18/.test(details)) return 'Invalid database credentials'
  if (/ip whitelist|ip access list|network access|not in the access list/.test(details)) return 'MongoDB Atlas network/IP access restriction'
  if (/querysrv|enotfound|eai_again/.test(details)) return 'Database DNS/connection problem'
  if (/mongoparseerror|invalid scheme|must begin with/.test(details)) return 'Invalid database connection string'
  if (/etimedout|econnrefused|server selection timed out/.test(details)) return 'Database unavailable or network access restricted'
  if (error.message?.includes('JWT_SECRET')) return 'JWT configuration error'
  if (error.message?.includes('MONGODB_URI')) return 'Database configuration error'
  return 'Server configuration or database startup error'
}

app.use(cors({ origin: clientUrl, credentials: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', apiRoutes)
app.use(notFound)
app.use(errorHandler)

const port = Number(process.env.PORT) || 5000

if (process.env.NODE_ENV !== 'test') {
  const startServer = async () => {
    if (process.env.NODE_ENV === 'production') {
      assertJwtConfiguration()
    }

    if (process.env.MONGODB_URI) {
      await connectDB()
      console.log('MongoDB connected successfully')
    } else if (process.env.NODE_ENV === 'production') {
      throw new Error('MONGODB_URI is required in production')
    } else {
      console.warn('MONGODB_URI is not configured; authentication endpoints will return 503')
    }

    app.listen(port, () => console.log(`MediFlow API listening on port ${port}`))
  }

  startServer().catch((error) => {
    console.error(`MediFlow API could not start: ${startupFailureCategory(error)}`)
    process.exitCode = 1
  })
}

export default app