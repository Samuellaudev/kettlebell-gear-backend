import express from 'express';
import {
  testEmailRoute,
  verifyEmail
} from '../controllers/emailController.js'

const router = express.Router();

router.route('/test-email').post(testEmailRoute);
router.route('/verify-email').put(verifyEmail)

export default router;