import express from 'express';
import {
  googleOauthUrl,
  googleOauthCallback
} from '../controllers/googleController.js'
const router = express.Router();

router.route('/auth/url').get(googleOauthUrl)
router.route('/auth/callback').post(googleOauthCallback)

export default router;