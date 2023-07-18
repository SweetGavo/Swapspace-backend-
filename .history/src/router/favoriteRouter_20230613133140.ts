import express from 'express';
import { favoriteController} from '../controllers/favoriteController';

const router = express.Router();


router.route("/favorites").get(favoriteController.getALLfavorites)
router.route("/favorites:id").get(favoriteController.getsinglefavoriteproperty)
router.route("/favortiePropertyId").delete(favoriteController.deletefavortieProperty);
router.route("/favortiePropertyId").patch(favoriteController.updateFavoriteProperty)