import express from "express";
import {declinedController} from '../controllers/declinedController'
import { ro } from "date-fns/locale";
const router = express.Router();

router.route
router.route("/declined").get(declinedController.getAlldeclinedProperties);

router.route("/declined/:id").get(declinedController.getSingledeclinedProperty);

router.route('/:declinedId').patch(declinedController.updateDeclinedProperty)

router.route('/:declinedId').delete(declinedController.deletedeclinedProperty);