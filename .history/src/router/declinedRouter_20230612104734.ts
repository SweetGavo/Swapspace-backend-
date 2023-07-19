import express from "express";
import {declinedController} from '../controllers/declinedController'
const router = express.Router();

router.route("/declined").get(declinedController.getAlldeclinedProperties);
router.route("/:id").get(declinedController.getSingledeclinedProperty);