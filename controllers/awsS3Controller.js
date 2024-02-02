import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import asyncHandler from '../middleware/asyncHandler.js';
import dotenv from 'dotenv';
dotenv.config();

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    sessionToken: process.env.AWS_SESSION_TOKEN,
  },
});

// @desc    Retrieve image file from AWS S3 bucket (Cyclic)
// @route   GET /api/aws-s3/:imgName
// @access  Private
const retrieveImage = asyncHandler(async (req, res) => {
  const { imgName } = req.params;

  const getFileFromS3 = async (fileName) => {
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: `${fileName}`,
      ContentType: 'image/jpg',
    };
  
    const command = new GetObjectCommand(params);
  
    const signedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 900,
    });
  
    return signedUrl;
  }

  const response = await getFileFromS3(imgName);

  res.json({
    message: 'Retrieve image successfully',
    url: response
  })
})

// @desc    Upload image file to AWS S3 bucket (Cyclic)
// @route   POST /api/aws-s3/upload
// @access  Private
const uploadImage = async (req, res) => { 
  const uploadFileToS3 = async (fileBuffer, fileName) => {  
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: `${fileName}`,
      Body: fileBuffer,
      ContentType: 'image/jpg',
    };
  
    const command = new PutObjectCommand(params);
    await s3Client.send(command);

    return fileName;
  };

  try {
    const multerObject = req.file

    if (!multerObject) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }
    
    const fileBuffer = Buffer.from(multerObject.buffer);
    const fileName = await uploadFileToS3(fileBuffer, multerObject.originalname);
  
    res.json({
      message: 'Upload image successfully',
      url: fileName
    })
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export {
  retrieveImage,
  uploadImage
}