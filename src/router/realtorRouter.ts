import express, { Request, Response } from 'express';
import multer from 'multer';
const router = express.Router();

import rectorController from '../controllers/realtorController';

//Set up multer storage and file filter
const storage = multer.diskStorage({});
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedMimeTypes = [
    'image/jpg',
    'image/gif',
    'image/jpeg',
    'image/png',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ];
  if (!allowedMimeTypes.includes(file.mimetype)) {
    const error: any = new Error(
      'Please provide a valid image, PDF, or document file'
    );
    error.code = 'LIMIT_UNEXPECTED_FILE';
    return cb(error, false);
  }
  cb(null, true);
};

// Create a multer upload instance
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 },
});

router
  .route('/')
  .post(
    upload.array('broker_card_image', 2),
    rectorController.createAgentProfile
  );

router
  .route('/image-upload')
  .post(upload.single('image'), rectorController.updateAgentProfileImage);

router.route('/').get(rectorController.getAllRealtor);

router.route('/:id').get(rectorController.getOneRealtor);

export default router;
