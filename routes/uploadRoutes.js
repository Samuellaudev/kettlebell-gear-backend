import express from 'express';
import { multerConfig } from '../config/multerConfig.js';
import { uploadImage, retrieveImage } from '../controllers/awsS3Controller.js';

const router = express.Router();

router.route('/:imgName')
  .get(retrieveImage)
router.route('/upload')
  .post(multerConfig.single('image'), uploadImage)

export default router;