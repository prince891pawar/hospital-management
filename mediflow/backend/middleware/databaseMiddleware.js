import mongoose from 'mongoose'

export function requireDatabase(req, res, next) {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      success: false,
      message: 'Authentication is temporarily unavailable because the database is disconnected',
    })
  }
  return next()
}