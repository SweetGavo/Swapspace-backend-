import express from 'express'
const router = express.Router()




import ratingController from '../controllers/ratingController';




router
.route('/')
.post(ratingController.createRating)
.get(ratingController.getAllRating);




router
.route('/:ratingId')
.delete(ratingController.deleteRating)
.patch(ratingController.updateRating);



router
.route('/:realtorId/avg-rating')
.get(ratingController.averageRating);


router
.route('/:realtorId/comments')
.get(ratingController.getComment);



export default router;