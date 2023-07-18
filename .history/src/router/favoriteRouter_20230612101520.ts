import express, { Request, Response } from 'express';
import { favoriteController, getALLfavorites,getsinglefavoriteproperty } from '../controllers/favoriteController';

const router = express.Router();


router.route("/favorites").get(favoriteController.)
router.route("/favorites:id").get(getsinglefavoriteproperty)
