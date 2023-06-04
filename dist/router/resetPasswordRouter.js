"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const restPassword_1 = __importDefault(require("../controllers/restPassword"));
router
    .route('/forget')
    .post(restPassword_1.default.forgetPassword);
router
    .route('/reset')
    .post(restPassword_1.default.restPassword);
exports.default = router;
