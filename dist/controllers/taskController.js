"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../DB/prisma"));
const http_status_codes_1 = require("http-status-codes");
const taskController = {
    createTask: async (req, res) => {
        const { title, action, assignee, collaborator, number_of_deals, contact, description, start_date, due_date, due_time, closing_date, closing_time, realtorId, } = req.body;
        // Check if the specified realtor exists
        const existingRealtor = await prisma_1.default.realtor.findUnique({
            where: {
                id: realtorId,
            },
        });
        if (!existingRealtor) {
            return res
                .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                .json({ message: `Realtor with id ${realtorId} not found` });
        }
        const task = await prisma_1.default.task.create({
            data: {
                title,
                action,
                number_of_deals,
                contact,
                description,
                start_date,
                due_date,
                due_time,
                closing_date,
                closing_time,
                realtor: {
                    connect: {
                        id: realtorId,
                    },
                },
                assignee: {
                    connect: {
                        id: assignee,
                    },
                },
                collaborator: {
                    connect: {
                        id: collaborator,
                    },
                },
            },
        });
        // TODO: Send notification or email to assignee & collaborator
        return res.status(http_status_codes_1.StatusCodes.CREATED).json({
            message: 'Task created',
            task,
        });
    },
};
exports.default = taskController;
