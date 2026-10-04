import jwt from 'jsonwebtoken'

export function assertJwtConfiguration() {
  const secret = process.env.JWT_SECRET

  if (!secret || secret === 'replace_with_secure_secret') {
    throw new Error('JWT_SECRET is not configured with a secure value')
  }
  if (process.env.NODE_ENV === 'production' && Buffer.byteLength(secret) < 32) {
    throw new Error('JWT_SECRET must be at least 32 bytes in production')
  }
  const expiresIn = process.env.JWT_EXPIRES_IN || '7d'
  if (!/^\d+(s|m|h|d|w|y)$/i.test(expiresIn)) {
    throw new Error('JWT_EXPIRES_IN must use a duration such as 15m or 7d')
  }
}

export default function generateToken(user) {
  assertJwtConfiguration()
  const secret = process.env.JWT_SECRET

  return jwt.sign(
    { role: user.role },
    secret,
    {
      subject: user._id.toString(),
      expiresIn: process.env.JWT_EXPIRES_IN || '7d',
      issuer: 'mediflow-api',
      audience: 'mediflow-client',
    },
  )
}