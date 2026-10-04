import { randomBytes } from 'node:crypto'
import mongoose from 'mongoose'

export function createRecordId(prefix) {
  return `${prefix}-${randomBytes(4).toString('hex').toUpperCase()}`
}

export function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export function parsePagination(query) {
  const page = Number.parseInt(query.page || '1', 10)
  const limit = Number.parseInt(query.limit || '10', 10)
  if (!Number.isInteger(page) || page < 1 || !Number.isInteger(limit) || limit < 1 || limit > 100) {
    return { error: 'Page must be positive and limit must be between 1 and 100' }
  }
  return { page, limit, skip: (page - 1) * limit }
}

export function validObjectId(value) {
  return mongoose.isValidObjectId(value)
}

export function sendPaginated(res, records, page, limit, total, message) {
  return res.json({
    success: true,
    message,
    data: records,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  })
}