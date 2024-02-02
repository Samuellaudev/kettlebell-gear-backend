import path from 'path';
import multer from 'multer';

// const storage = multer.diskStorage({
//   filename(req, file, cb) {
//     cb(
//       null,
//       `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
//     );
//   },
// });
const storage = multer.memoryStorage();

const fileFilter = (file) => {
  const allowedFiletypes = /jpe?g|png|webp/;
  const allowedMimetypes = /image\/jpe?g|image\/png|image\/webp/;
  const extname = allowedFiletypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedMimetypes.test(file.mimetype);
  return extname && mimetype;
};

const multerConfig = multer({
  storage,
  fileFilter: (req, file, cb) => cb(null, fileFilter(file)),
});

export { multerConfig };
