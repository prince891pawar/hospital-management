const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phonePattern = /^[+()\d\s.-]{7,24}$/

function badRequest(res, message) {
  return res.status(400).json({ success: false, message })
}

export function validateRegistration(req, res, next) {
  const body = req.body || {}
  if (body.role !== undefined && body.role !== 'patient') {
    return res.status(403).json({ success: false, message: 'Public registration is only available for patients' })
  }
  const firstName = typeof body.firstName === 'string' ? body.firstName.trim() : ''
  const lastName = typeof body.lastName === 'string' ? body.lastName.trim() : ''
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
  const phone = typeof body.phone === 'string' ? body.phone.trim() : ''
  const password = typeof body.password === 'string' ? body.password : ''

  if (!firstName || !lastName || !email || !phone || !password) {
    return badRequest(res, 'First name, last name, email, phone, and password are required')
  }
  if (firstName.length > 80 || lastName.length > 80) return badRequest(res, 'Names must be 80 characters or fewer')
  if (email.length > 254 || !emailPattern.test(email)) return badRequest(res, 'Enter a valid email address')
  if (!phonePattern.test(phone)) return badRequest(res, 'Enter a valid phone number')
  if (password.length < 8 || Buffer.byteLength(password, 'utf8') > 72) {
    return badRequest(res, 'Password must be at least 8 characters and no more than 72 bytes')
  }

  req.body = { ...body, firstName, lastName, email, phone, password }
  return next()
}

export function validateLogin(req, res, next) {
  const body = req.body || {}
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
  const password = typeof body.password === 'string' ? body.password : ''

  if (!email || !password) return badRequest(res, 'Email and password are required')
  if (email.length > 254 || !emailPattern.test(email)) return badRequest(res, 'Enter a valid email address')
  if (Buffer.byteLength(password, 'utf8') > 72) return badRequest(res, 'Password must be no more than 72 bytes')

  req.body = { email, password }
  return next()
}
