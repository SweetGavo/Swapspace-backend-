"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../DB/prisma"));
const http_status_codes_1 = require("http-status-codes");
const responseController = {
    addResponse: async (req, res) => {
        const { taskId, comment, note, outcome } = req.body;
        const checktaskId = await prisma_1.default.task.findFirst({
            where: {
                id: taskId,
            },
        });
        if (!checktaskId) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                message: 'Task not found',
            });
        }
        const response = await prisma_1.default.response.create({
            data: {
                taskId,
                comment,
                note,
                outcome,
            },
        });
        return res.status(http_status_codes_1.StatusCodes.CREATED).json(response);
    },
};
exports.default = responseController;
