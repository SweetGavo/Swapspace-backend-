import express from 'express';
import favoriteController, { favouriteController} from '../controllers/favoriteController';

const router = express.Router();


router.route("/favorites").get(favoriteController.getAllFavourites);

router.route("/favorites:id").get(favoriteController.getFavouriteById);

router.route("/favortiePropertyId").delete(favoriteController.deleteFavourite);

router.route("/favortiePropertyId").patch(favoriteController.updateFavourite);