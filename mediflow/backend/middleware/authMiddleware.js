import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import User from '../models/User.js'

function unauthorized(res, message = 'Authentication is required') {
  return res.status(401).json({ success: false, message })
}

export async function protect(req, res, next) {
  const authorization = req.get('Authorization') || ''
  const [scheme, token] = authorization.split(' ')

  if (scheme !== 'Bearer' || !token) return unauthorized(res)

  const secret = process.env.JWT_SECRET
  if (!secret || secret === 'replace_with_secure_secret') {
    return res.status(503).json({ success: false, message: 'Authentication is not configured' })
  }

  try {
    const payload = jwt.verify(token, secret, { issuer: 'mediflow-api', audience: 'mediflow-client' })
    if (!payload.sub) return unauthorized(res, 'Invalid authentication token')
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ success: false, message: 'Authentication is temporarily unavailable' })
    }

    const user = await User.findById(payload.sub)
    if (!user) return unauthorized(res, 'Invalid authentication token')
    if (!user.isActive) return res.status(403).json({ success: false, message: 'This account is inactive' })

    req.user = user
    return next()
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) return unauthorized(res, 'Authentication token has expired')
    if (error instanceof jwt.JsonWebTokenError) return unauthorized(res, 'Invalid authentication token')
    return next(error)
  }
}