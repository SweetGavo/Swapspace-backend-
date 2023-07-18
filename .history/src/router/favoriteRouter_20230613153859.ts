import express from 'express';
import { favoriteController} from '../controllers/favoriteController';

const router = express.Router();


router.route("/favorites").get(favoriteController.)

router.route("/favorites:id").get(favoriteController.getFavouriteById)

router.route("/favortiePropertyId").delete(favoriteController.deleteFavourtie);

router.route("/favortiePropertyId").patch(favoriteController.updateFavourite)