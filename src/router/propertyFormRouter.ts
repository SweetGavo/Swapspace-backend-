import express, { Request, Response } from 'express';
import multer from 'multer';
const router = express.Router();

import propertyFormController from '../controllers/propertyFormController';

// Set up multer storage and file filter
const storage = multer.diskStorage({});
const fileFilter = (
  req: express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedMimeTypes = [
    'image/jpg',
    'image/gif',
    'image/jpeg',
    'image/png',
    'application/pdf',
  ];

  if (!allowedMimeTypes.includes(file.mimetype)) {
    const error: any = new Error('Please provide a valid image file');
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
  .post(upload.single('property_document'), propertyFormController.addProperty);

router
  .route('/:propertyId/images')
  .post(upload.array('image', 50), propertyFormController.uploadImages);

router.route('/:propertyId').patch(propertyFormController.pairRealtorByAdmin);

router.route('/:realtorId/listings').get(propertyFormController.getListings);

export default router;
