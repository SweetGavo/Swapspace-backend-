import express from "express";
const router = express.Router();

import offersControllers from "../controllers/offerController";



router
.route('/')
.post(offersControllers.addOffers)
.get(offersControllers.getAllOffers);



router
.route('/:id')
.get(offersControllers.getAllOffersByUser)
.get(offersControllers.acceptOffersByRealtor);



router
.route('/:offerId/accept')
.patch(offersControllers.acceptOffersByRealtor);

export default router;