"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../DB/prisma"));
const http_status_codes_1 = require("http-status-codes");
const taskConroller = {
    createTask: async (req, res) => {
        const { title, action, assignee, collaborator, contact, description, start_date, due_date_and_time, closing_date_and_time, } = req.body;
        //checks or assign & collaborator
        const checkAssignee = await prisma_1.default.group.findFirst({
            where: {
                members: assignee,
            },
        });
        if (!checkAssignee)
            return res
                .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                .json({ message: ` ${assignee} is not your member ` });
        const checkCollaborator = await prisma_1.default.group.findFirst({
            where: {
                members: collaborator,
            },
        });
        if (!checkCollaborator)
            return res
                .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                .json({ message: ` ${checkCollaborator} is not your member ` });
        const task = await prisma_1.default.task.create({
            data: {
                title,
                action,
                assignee,
                collaborator,
                contact,
                description,
                start_date,
                due_date_and_time,
                closing_date_and_time,
            },
        });
        TODO: //  Notification or MAIL to assignee & collaborator
         return res.status(http_status_codes_1.StatusCodes.CREATED).json({
            message: `Tasks created`,
            task: task,
        });
    },
};
exports.default = taskConroller;
