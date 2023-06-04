"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../DB/prisma"));
const http_status_codes_1 = require("http-status-codes");
const groupMembersController = {
    createGroup: async (req, res) => {
        try {
            const { name, realtorId, status } = req.body;
            const checkCrator = await prisma_1.default.realtor.findUnique({
                where: {
                    id: realtorId,
                },
            });
            if (!checkCrator) {
                return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                    message: `Realtor ${realtorId} not found`,
                });
            }
            const newGroup = await prisma_1.default.group.create({
                data: {
                    name: name,
                    realtorId: realtorId,
                    status: "CREATOR",
                },
            });
            return res.status(http_status_codes_1.StatusCodes.CREATED).json({
                message: `Group ${name} created`,
                data: newGroup,
            });
        }
        catch (error) {
            return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Failed to create group",
                error: error,
            });
        }
    },
    getAllGroups: async (req, res) => {
        try {
            const groups = await prisma_1.default.group.findMany({
                include: {
                    members: true,
                },
            });
            res.status(http_status_codes_1.StatusCodes.OK).json({
                data: groups,
            });
        }
        catch (error) {
            return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Failed to fetch all groups",
                error: error,
            });
        }
    },
    addMembersToGroup: async (req, res) => {
        try {
            const { groupId, memberId } = req.body;
            const group = await prisma_1.default.group.findUnique({
                where: {
                    id: groupId,
                },
                include: {
                    members: true,
                },
            });
            if (!group) {
                return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                    message: "Group not found",
                });
            }
            const isCreator = group.status === "CREATOR";
            if (!isCreator) {
                return res.status(http_status_codes_1.StatusCodes.FORBIDDEN).json({
                    message: "Only the group creator can add members",
                });
            }
            const memberExists = group.members.some((member) => member.id === memberId);
            if (memberExists) {
                return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                    message: "Member is already added to the group",
                });
            }
            const member = await prisma_1.default.realtor.findUnique({
                where: {
                    id: memberId,
                },
            });
            if (!member) {
                return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                    message: "Realtor not found",
                });
            }
            // Add the member to the group
            await prisma_1.default.group.update({
                where: {
                    id: groupId,
                },
                data: {
                    members: {
                        connect: {
                            id: memberId,
                        },
                    },
                },
            });
            return res.status(http_status_codes_1.StatusCodes.OK).json({
                message: "Member added to the group successfully",
            });
        }
        catch (error) {
            console.error("Failed to add member to group:", error);
            return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Failed to add member to group",
                error: error,
            });
        }
    },
};
exports.default = groupMembersController;
