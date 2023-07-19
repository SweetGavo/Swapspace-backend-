import express from "express";
import {declinedController} from '../controllers/declinedController'
import { ro } from "date-fns/locale";
const router = express.Router();

router.route("/").post();
router.route("/declined").get();

router.route("/declined/:id").get(declinedController.getSingledeclinedProperty);

router.route('/:declinedId').patch(declinedController.updateDeclinedProperty)

router.route('/:declinedId').delete(declinedController.deletedeclinedProperty);