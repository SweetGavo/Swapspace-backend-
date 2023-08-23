import express from 'express';
const router = express.Router();

import WaitlistController from '../controllers/waitlistController';

router
  .route('/')
  .post(WaitlistController.createList)
  .get(WaitlistController.getAllList);

export default router;
