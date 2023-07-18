import expressfrom 'express';
import { favoriteController} from '../controllers/favoriteController';

const router = express.Router();


router.route("/favorites").get(favoriteController.getALLfavorites)
router.route("/favorites:id").get(favoriteController.getsinglefavoriteproperty)
