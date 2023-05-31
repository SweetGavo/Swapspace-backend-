"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const otpController_1 = __importDefault(require("../controllers/otpController"));
router
    .route('/email')
    .post(otpController_1.default.sendOtpToMail);
router
    .route('/verify-email')
    .patch(otpController_1.default.verifyOtpEmail);
router
    .route('/phone')
    .post(otpController_1.default.sendOtpToPhone);
router
    .route('/verify-phone')
    .post(otpController_1.default.verifyOtpPhone);
exports.default = router;
