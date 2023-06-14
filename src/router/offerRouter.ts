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


  router
  .route('/checkoff')
  .get(offersControllers.getCheckoff)

  router
  .route('/closed')
  .get(offersControllers.getClosed)



  router
  .route('/connected')
  .get(offersControllers.getConnected)

export default router;
