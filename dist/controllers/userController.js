"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../DB/prisma"));
const http_status_codes_1 = require("http-status-codes");
const userController = {
    getAllUsers: async (req, res) => {
        try {
            const users = await prisma_1.default.user.findMany({
                select: {
                    id: true,
                    number: true,
                    email: true,
                    type: true,
                    profile: true,
                    realtor: true,
                },
            });
            res.status(http_status_codes_1.StatusCodes.OK).json({
                count: users.length,
                users,
            });
        }
        catch (error) {
            console.error('Error retrieving users:', error);
            res
                .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ error: 'Failed to retrieve users' });
        }
    },
    getAgentUsers: async (req, res) => {
        try {
            const agents = await prisma_1.default.user.findMany({
                where: {
                    type: 'AGENT',
                },
                select: {
                    id: true,
                    number: true,
                    email: true,
                    type: true,
                    realtor: {
                        select: {
                            id: true,
                            company_name: true,
                            address: true,
                            broker_BRN: true,
                            agent_ORN: true,
                            years_of_experience: true,
                            specialty: true,
                            role: true,
                            language: true,
                            description: true,
                            license_number: true,
                            broker_card_image: true,
                            image: true,
                            status: true,
                        },
                    },
                },
            });
            res.status(http_status_codes_1.StatusCodes.OK).json({
                count: agents.length,
                user: agents,
            }); // Send the users as a JSON response
        }
        catch (error) {
            console.error('Error retrieving users:', error);
            res
                .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ error: 'Failed to retrieve users' });
        }
    },
    getUsersWhichAreUsers: async (req, res) => {
        try {
            const users = await prisma_1.default.user.findMany({
                where: {
                    type: 'USER',
                },
                select: {
                    id: true,
                    number: true,
                    email: true,
                    type: true,
                    profile: {
                        select: {
                            fullname: true,
                            address: true,
                            image: true,
                        },
                    },
                },
            });
            const sanitizedUsers = users.map((user) => ({
                ...user,
                profile: user.profile ?? {
                    fullname: null,
                    address: null,
                    image: null,
                },
            }));
            res.status(http_status_codes_1.StatusCodes.OK).json({
                count: sanitizedUsers.length,
                users: sanitizedUsers,
            });
        }
        catch (error) {
            console.error('Error retrieving users:', error);
            res
                .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ error: 'Failed to retrieve users' });
        }
    },
    getOneUser: async (req, res) => {
        try {
            const { id } = req.params;
            const oneUser = await prisma_1.default.user.findFirst({
                where: {
                    id: id,
                    type: 'USER',
                },
                select: {
                    id: true,
                    email: true,
                    number: true,
                    type: true,
                    profile: true,
                },
            });
            if (!oneUser) {
                return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                    message: 'User not found',
                });
            }
            return res.status(http_status_codes_1.StatusCodes.OK).json({
                user: oneUser,
            });
        }
        catch (error) {
            console.error('Error retrieving users:', error);
            return res
                .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ error: 'Failed to retrieve user' });
        }
    },
    getOneAgent: async (req, res) => {
        try {
            const { id } = req.params;
            const oneAgent = await prisma_1.default.user.findFirst({
                where: {
                    id: id,
                    type: 'AGENT',
                },
                select: {
                    id: true,
                    email: true,
                    number: true,
                    type: true,
                    realtor: true,
                },
            });
            if (!oneAgent) {
                return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                    message: 'User not found',
                });
            }
            return res.status(http_status_codes_1.StatusCodes.OK).json({
                user: oneAgent,
            });
        }
        catch (error) {
            console.error('Error retrieving users:', error);
            return res
                .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ error: 'Failed to retrieve user' });
        }
    },
};
exports.default = userController;
