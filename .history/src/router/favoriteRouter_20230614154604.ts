import express from 'express';
import favoriteController, { favouriteController} from '../controllers/favoriteController';

const router = express.Router();


router.route("/favorites").get(favoriteController.getAllfavorites);

router.route("/favorites:id").get(favoriteController.getFavoriteById);

router.route("/favortiePropertyId").delete(favoriteController.deleteFavortie);

router.route("/favortiePropertyId").patch(favoriteController.updateFavorite);