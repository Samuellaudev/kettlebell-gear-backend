import asyncHandler from '../middleware/asyncHandler.js';
import cloudinary from '../config/cloudinary.js'
import dotenv from 'dotenv';
dotenv.config();

// @desc    Upload image file Cloudinary
// @route   POST /api/images/upload/cloudinary
// @access  Private
const uploadImage = asyncHandler(async (req, res) => {

  try {
    const multerObject = req.file
    if (!multerObject) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }
    
    const imageBuffer = Buffer.from(multerObject.buffer);
    const imageBase64 = imageBuffer.toString('base64');
    const result = await cloudinary.uploader.upload(
      `data:image/png;base64,${ imageBase64 }`,
      {
        folder: 'Kettlebell-Gear',
      }
    );

    const imageUrls = result.secure_url;

    res.json({
      message: 'Upload image successfully',
      url: imageUrls
    })
  } catch (error) {
    if (error.code === 'ENOENT') {
      res.status(404).json({ error: 'Image file not found' });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
})

export { uploadImage }