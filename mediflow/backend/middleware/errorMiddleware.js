export function notFound(req, res, next) {
  const error = new Error(`Not found: ${req.originalUrl}`)
  error.statusCode = 404
  next(error)
}

export function errorHandler(error, req, res, next) {
  let statusCode = error.statusCode || error.status || 500
  let message = error.message || 'Something went wrong'
  let details

  if (error.name === 'CastError') {
    statusCode = 400
    message = 'Invalid resource identifier'
  } else if (error.name === 'ValidationError') {
    statusCode = 400
    message = 'Validation failed'
    details = Object.values(error.errors).map(({ path, message: detail }) => ({ path, message: detail }))
  } else if (error.code === 11000) {
    statusCode = 409
    message = error.keyPattern?.email
      ? 'An account with this email already exists'
      : 'A record with this value already exists'
  } else if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
    statusCode = 400
    message = 'Invalid JSON payload'
  }

  if (statusCode >= 500) {
    console.error({ name: error.name, code: error.code || null, statusCode })
    message = 'Something went wrong'
  }

  const response = { success: false, message }
  if (details) response.details = details

  res.status(statusCode).json(response)
}
