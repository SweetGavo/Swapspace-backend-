"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const offerController_1 = __importDefault(require("../controllers/offerController"));
router
    .route('/')
    .post(offerController_1.default.addOffers)
    .get(offerController_1.default.getAllOffers);
router
    .route('/:id')
    .get(offerController_1.default.getAllOffersByUser)
    .get(offerController_1.default.acceptOffersByRealtor);
router
    .route('/:offerId/accept')
    .patch(offerController_1.default.acceptOffersByRealtor);
exports.default = router;
