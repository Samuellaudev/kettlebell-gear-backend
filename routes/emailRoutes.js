import express from 'express';
import {
  testEmailRoute
} from '../controllers/emailController.js'

const router = express.Router();

router.route('/test-email').post(testEmailRoute);

export default router;