import express from "express";
import {declinedController} from '../controllers/declinedController'
import { ro } from "date-fns/locale";
const router = express.Router();

router.route("/").post(declinedController.createDeclined);
router.route("/declined").get(declinedController.getAlldeclined);

router.route("/declined/:id").get(de);

router.route('/:declinedId').patch()

router.route('/:declinedId').delete();