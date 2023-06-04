"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const authController_1 = __importDefault(require("../controllers/authController"));
router
    .route('/signup')
    .post(authController_1.default.createUser);
router
    .route('/login')
    .post(authController_1.default.loginUser);
router
    .route('/logout')
    .get(authController_1.default.logoutUser);
router
    .route('/signup/agent')
    .post(authController_1.default.createAgent);
exports.default = router;
