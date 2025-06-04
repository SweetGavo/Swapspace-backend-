import express, { Request, Response } from 'express';
import multer from 'multer';
const router = express.Router();

import propertyController from '../controllers/propertyController';

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

/**
 * @swagger
 * /api/v1/properties/{agentId}/add:
 *   post:
 *     tags: [Properties]
 *     summary: Add a new property
 *     parameters:
 *       - in: path
 *         name: agentId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the agent adding the property
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Property'
 *     responses:
 *       201:
 *         description: Property created successfully
 *       400:
 *         description: Invalid input
 */
router.route('/:agentId/add').post(propertyController.addProperty);

/**
 * @swagger
 * /api/v1/properties/{propertyId}/images:
 *   post:
 *     tags: [Properties]
 *     summary: Upload property images
 *     parameters:
 *       - in: path
 *         name: propertyId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Images uploaded successfully
 */
router
  .route('/:propertyId/images')
  .post(upload.array('image', 20), propertyController.uploadImages);

/**
 * @swagger
 * /api/v1/properties:
 *   get:
 *     tags: [Properties]
 *     summary: Get all properties
 *     responses:
 *       200:
 *         description: List of properties
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Property'
 */
router.route('/').get(propertyController.getAllProperty);

/**
 * @swagger
 * /api/v1/properties/{id}:
 *   patch:
 *     tags: [Properties]
 *     summary: Update a property
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Property'
 *     responses:
 *       200:
 *         description: Property updated successfully
 *   get:
 *     tags: [Properties]
 *     summary: Get a single property
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Property details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Property'
 */
router.route('/:id').patch(propertyController.updateProperty);
router.route('/:id').get(propertyController.getOneProperty);

/**
 * @swagger
 * /api/v1/properties/updateleads:
 *   post:
 *     tags: [Properties]
 *     summary: Update property leads
 *     responses:
 *       200:
 *         description: Leads updated successfully
 */
router.route('/updateleads').post(propertyController.updateLeads);

/**
 * @swagger
 * /api/v1/properties/filters/find:
 *   get:
 *     tags: [Properties]
 *     summary: Filter properties
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *       - in: query
 *         name: price
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Filtered list of properties
 */
router.route('/filters/find').get(propertyController.filterProperties);

/**
 * @swagger
 * /api/v1/properties/leads/{realtorId}:
 *   get:
 *     tags: [Properties]
 *     summary: Get realtor leads
 *     parameters:
 *       - in: path
 *         name: realtorId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of leads for the realtor
 */
router.route('/leads/:realtorId').get(propertyController.leads);

export default router;
