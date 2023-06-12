import express, { Request, Response } from 'express';
import { getALLfavorites,getsinglefavoriteproperty } from '../controllers/favoriteController';

const router = express.Router();


router.route("/favorites").get(getALLfavorites)
router.route("/favorites:id").get(getsinglefavoriteproperty)
