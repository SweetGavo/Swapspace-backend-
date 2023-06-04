"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const userController_1 = __importDefault(require("../controllers/userController"));
router
    .route('/')
    .get(userController_1.default.getAllUsers);
router
    .route('/agents')
    .get(userController_1.default.getAgentUsers);
router
    .route('/find/users')
    .get(userController_1.default.getUsersWhichAreUsers);
router
    .route('/:id')
    .get(userController_1.default.getOneUser);
router
    .route('/agents/:id')
    .get(userController_1.default.getOneAgent);
exports.default = router;
