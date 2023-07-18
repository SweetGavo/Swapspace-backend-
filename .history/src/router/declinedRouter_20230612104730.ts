import express from "express";
import {declinedController} from '../controllers/declinedController'
const router = express.Router();

router.route("/decli").get(declinedController.getAlldeclinedProperties);
router.route("/:id").get(declinedController.getSingledeclinedProperty);