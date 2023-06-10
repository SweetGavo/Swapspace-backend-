import express from 'express';
const router = express.Router();

import offersControllers from '../controllers/offerController';

router
  .route('/')
  .post(offersControllers.addOffer)
  .get(offersControllers.getAllOffers);

router
  .route('/:id')
  .get(offersControllers.getOneRealtorsOffers)
  .patch(offersControllers.updateOffer);

export default router;
