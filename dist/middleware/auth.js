"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.softVerifyToken = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_status_codes_1 = require("http-status-codes");
const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.substring(7);
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'zackzack', (err, decoded) => {
            if (err) {
                return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({ message: 'Invalid token' });
            }
            else {
                req.user = decoded;
                next();
            }
        });
    }
    else {
        return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({ message: 'Token not provided' });
    }
};
//
const softVerifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.substring(7);
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'zackzack', (err, decoded) => {
            req.user = decoded;
            next();
        });
    }
    else {
        next();
    }
};
exports.softVerifyToken = softVerifyToken;
exports.default = verifyToken;
