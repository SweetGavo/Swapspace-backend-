import express from 'express';
import favouriteController from '../controllers/favoriteController';

const router = express.Router();

router.post('/', favouriteController.createFavourite);
router.get('/', favouriteController.getAllFavourites);
router.get('/:id', favouriteController.getFavouriteById);
router.put('/:id', favouriteController.updateFavourite);
router.delete('/:id', favouriteController.deleteFavourite);

export default router;
