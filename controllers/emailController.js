import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js';
import sendEmail from '../utils/sendEmail.js';
import { v4 as uuid } from 'uuid';
import dotenv from 'dotenv';
dotenv.config();

const senderName = process.env.SENDER_NAME
const forwardEmail = process.env.FORWARDEMAIL_EMAIL

// @desc   Test sending email
// @route  POST /api/emails/test-email
// @access Private
const testEmailRoute = asyncHandler(async (req, res) => {
  const sentEmail = await sendEmail({
    to: 'YOUR_TEST_EMAIL',
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

export {
  testEmailRoute
}