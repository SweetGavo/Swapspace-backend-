import express, { Request, Response } from "express";
import multer from "multer";
const router = express.Router();

import propertyController from "../controllers/propertyController";

// Set up multer storage and file filter
const storage = multer.diskStorage({});
const fileFilter = (
  req: express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedMimeTypes = ["image/jpg", "image/gif", "image/jpeg", "image/png"];

  if (!allowedMimeTypes.includes(file.mimetype)) {
    const error: any = new Error("Please provide a valid image file");
    error.code = "LIMIT_UNEXPECTED_FILE";
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



router.route("/").post(propertyController.addProperty);

router
  .route("/:propertyId/images")
  .post(upload.array("image", 20), propertyController.uploadImages);

router.route("/prop").get(propertyController.getAllProperty);

export default router;
