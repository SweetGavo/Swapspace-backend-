import express, { Request, Response } from 'express';
import { getALLfavorites } from '../controllers/favoriteController';

const router = express.Router();


router.route("/favorites").get()
