import jwt from 'jsonwebtoken'

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1d'})

  // Set JWT as HTTP-Only cookie
  res.cookie('jwt', token, {
    httpOnly: true,
    // secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
    secure: true, // Use secure cookies in production
    sameSite: 'none', // Prevent CSRF attacks
    maxAge: 24 * 60 * 60 * 1000, // 1 Day
    partitioned: true
  })
}

export default generateToken