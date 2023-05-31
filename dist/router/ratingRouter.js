"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const ratingController_1 = __importDefault(require("../controllers/ratingController"));
router
    .route('/')
    .post(ratingController_1.default.createRating)
    .get(ratingController_1.default.getAllRating);
router
    .route('/:ratingId')
    .delete(ratingController_1.default.deleteRating)
    .patch(ratingController_1.default.updateRating);
router
    .route('/:realtorId/avg-rating')
    .get(ratingController_1.default.averageRating);
router
    .route('/:realtorId/comments')
    .get(ratingController_1.default.getComment);
exports.default = router;
