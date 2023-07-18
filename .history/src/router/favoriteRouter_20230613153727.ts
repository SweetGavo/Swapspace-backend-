import express from 'express';
import { favoriteController} from '../controllers/favoriteController';

const router = express.Router();


router.route("/favorites").get(favoriteController.getAllfavourites)

router.route("/favorites:id").get(favoriteController.getFavoriteById)

router.route("/favortiePropertyId").delete(favoriteController.deleteFavortie);

router.route("/favortiePropertyId").patch(favoriteController.updateFavorite)