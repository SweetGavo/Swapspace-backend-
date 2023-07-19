import express from "express";
import {declinedController} from '../controllers/declinedController'
const router = express.Router();

router.route("/").get(declinedController.getAlldeclinedProperties);
router.route("/:id").get(declinedController.g);