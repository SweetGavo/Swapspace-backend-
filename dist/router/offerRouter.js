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
    .post(offerController_1.default.addOffer)
    .get(offerController_1.default.getAllOffers);
router
    .route('/:id')
    .get(offerController_1.default.getOneRealtorsOffers)
    .patch(offerController_1.default.updateOffer);
router
    .route('/checkoff')
    .get(offerController_1.default.getCheckoff);
router
    .route('/closed')
    .get(offerController_1.default.getClosed);
router
    .route('/connected')
    .get(offerController_1.default.getConnected);
exports.default = router;
