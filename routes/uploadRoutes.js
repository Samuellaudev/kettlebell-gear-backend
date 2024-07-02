import express from 'express';
import { multerConfig } from '../config/multerConfig.js';
import { uploadImage } from '../controllers/imageController.js';
// import { uploadImage, retrieveImage } from '../controllers/awsS3Controller.js';

const router = express.Router();

// router.route('/aws-s3/:imgName')
//   .get(retrieveImage)
// router.route('/upload/aws-s3')
//   .post(multerConfig.single('image'), uploadImage)

router.route('/upload/cloudinary')
  .post(multerConfig.single('image'), uploadImage)

export default router;