import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js';

const protect = asyncHandler(async (req, res, next) => {
  let token
  
  // Read JWT from the 'jwt' cookie
  token = req.cookies.jwt

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      const { userId, isVerified } = decoded

      if (!isVerified) {
        // return res.status(403).json({ message: 'Please verify your email.' });
        res.status(401)
        throw new Error('Please verify your email.')
      }

      req.user = await User.findById(userId).select('-password')
      
      next()
    } catch (error) {
      console.log(error);
      res.status(401)
      throw new Error('Not authorized, token failed')
    }
  } else {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as an admin')
  }
}

export { protect, admin}