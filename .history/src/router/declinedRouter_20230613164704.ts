import express from "express";
import {declinedController} from '../controllers/declinedController'
import { ro } from "date-fns/locale";
const router = express.Router();

router.route("/").post(declinedController.createDeclined);
router.route("/declined").get();

router.route("/declined/:id").get();

router.route('/:declinedId').patch()

router.route('/:declinedId').delete();