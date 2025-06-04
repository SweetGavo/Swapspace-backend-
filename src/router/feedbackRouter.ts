import express, { RequestHandler } from 'express';
import feedbackController from '../controllers/feedbackController';
import { softVerifyToken, SoftAuthenticatedRequest } from '../middleware/auth';

const router = express.Router();

/**
 * @swagger
 * /api/v1/feedbacks/add:
 *   post:
 *     summary: Add a new feedback
 *     tags: [Feedback]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - contact_email
 *               - contact_phone
 *               - feedback
 *             properties:
 *               contact_email:
 *                 type: string
 *                 format: email
 *               contact_phone:
 *                 type: string
 *               feedback:
 *                 type: string
 *               nature:
 *                 type: string
 *                 enum: [SUGGESTION, COMPLAINT, OTHER]
 *     responses:
 *       201:
 *         description: Feedback created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router
  .route('/add')
  .post(softVerifyToken as RequestHandler, feedbackController.addFeedback as RequestHandler);

/**
 * @swagger
 * /api/v1/feedbacks:
 *   get:
 *     summary: Get all feedback
 *     tags: [Feedback]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all feedback
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 feedback:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       contact_email:
 *                         type: string
 *                       contact_phone:
 *                         type: string
 *                       feedback:
 *                         type: string
 *                       nature:
 *                         type: string
 *       500:
 *         description: Server error
 */
router
  .route('/')
  .get(softVerifyToken as RequestHandler, feedbackController.getFeedback as RequestHandler);

export default router;



