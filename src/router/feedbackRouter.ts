import express, { Request, Response } from 'express';
const router = express.Router();
import feedbackController from '../controllers/feedbackController';

router
.route('/add')
.post(feedbackController.addFeedback)


router
.route('/')
.get(feedbackController.getFeedback)



export default router;

