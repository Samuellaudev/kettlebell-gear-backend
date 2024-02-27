import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js';
import sendEmail from '../utils/sendEmail.js';
import { v4 as uuid } from 'uuid';
import dotenv from 'dotenv';
dotenv.config();

const recipient = process.env.RECIPIENT_EMAIL
const senderName = process.env.SENDER_NAME
const forwardEmail = process.env.FORWARDEMAIL_EMAIL

// @desc   Test sending email
// @route  POST /api/emails/test-email
// @access Private
const testEmailRoute = asyncHandler(async (req, res) => {
  const sentEmail = await sendEmail({
    to: `${recipient}`,
    from: `${senderName} <${forwardEmail}>`,
    subject: 'Does this work?',
    text: 'If you\'re reading this... yes!',
  });

  if (sentEmail) {
    res.sendStatus(200);
  } else {
    console.log(e);
    res.sendStatus(500);
    throw new Error('Email not sent');
  }	
})

// @desc   Verify email from new registered user
// @route  PUT /api/emails/verify-email
// @access Private
const verifyEmail = asyncHandler(async (req, res) => {
  const { verificationString } = req.body;
console.log('req.body', req.body);
  const user = await User.findOne({ verificationString });

  if (!user) {
    return res.status(401).json({
      message: 'The email verification code is incorrect.'
    });
  }

  user.isVerified = true;
  user.verificationString = '';

  const updatedUser = await user.save();

  generateToken(res, updatedUser._id, updatedUser.isVerified)

  res.json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    isVerified: updatedUser.isVerified,
    isAdmin: updatedUser.isAdmin,
  })
})

export {
  testEmailRoute,
  verifyEmail
}