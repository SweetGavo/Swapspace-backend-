"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../DB/prisma"));
const http_status_codes_1 = require("http-status-codes");
const ratingController = {
    createRating: async (req, res) => {
        try {
            const { value, comment, userId, realtorId } = req.body;
            // Check if the user with the provided userId exists
            const user = await prisma_1.default.user.findUnique({
                where: {
                    id: userId,
                },
            });
            if (!user) {
                return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                    message: "User not found.",
                });
            }
            // Check if the realtor with the provided realtorId exists
            const realtor = await prisma_1.default.realtor.findUnique({
                where: {
                    id: realtorId,
                },
            });
            if (!realtor) {
                return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                    message: "Realtor not found.",
                });
            }
            const alreadySubmitted = await prisma_1.default.rating.findFirst({
                where: {
                    realtorId: realtorId,
                    userId: userId,
                },
            });
            if (alreadySubmitted) {
                return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                    message: "Rating has already been submitted for this realtor.",
                });
            }
            const createdRating = await prisma_1.default.rating.create({
                data: {
                    value,
                    comment,
                    userId,
                    realtorId
                },
            });
            return res.status(http_status_codes_1.StatusCodes.CREATED).json({
                message: "Rating created successfully.",
                rating: createdRating,
            });
        }
        catch (error) {
            console.log(error);
            return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Failed to add rating.",
            });
        }
    },
    getAllRating: async (req, res) => {
        try {
            const ratings = await prisma_1.default.rating.findMany({});
            res.status(http_status_codes_1.StatusCodes.OK).json({
                count: ratings.length,
                ratings,
            });
        }
        catch (error) {
            return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Failed to create profile.",
            });
        }
    },
    updateRating: async (req, res) => {
        try {
            const { id: ratingId } = req.params;
            const { value, comment } = req.body;
            const newRating = await prisma_1.default.rating.update({
                where: {
                    id: ratingId,
                },
                data: {
                    comment,
                    value,
                },
            });
            if (!newRating)
                return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                    message: ` Rating not found`,
                });
            return res.status(http_status_codes_1.StatusCodes.OK).json({
                message: `Rating updated successfully`,
                newRating,
            });
        }
        catch (error) {
            return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Failed to update rating.",
            });
        }
    },
    deleteRating: async (req, res) => {
        try {
            const ratingId = req.params.ratingId;
            const deleteRating = await prisma_1.default.rating.delete({
                where: {
                    id: ratingId,
                },
            });
            return res.status(http_status_codes_1.StatusCodes.OK).json({
                message: "Profile and associated properties deleted successfully.",
                deleteRating,
            });
        }
        catch (error) {
            return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Failed to delete rating   .",
            });
        }
    },
    averageRating: async (req, res) => {
        try {
            const { realtorId } = req.params;
            const ratings = await prisma_1.default.rating.findMany({
                where: {
                    realtorId: realtorId,
                },
            });
            if (!ratings || ratings.length === 0) {
                return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                    message: `No ratings found for realtor with ID: ${realtorId}`,
                });
            }
            const totalRating = ratings.reduce((sum, rating) => sum + rating.value, 0);
            const averageRating = totalRating / ratings.length;
            console.log(averageRating);
            return res.status(http_status_codes_1.StatusCodes.OK).json({
                message: "Average rating fetched.",
                data: averageRating,
            });
        }
        catch (error) {
            console.error(error);
            return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Failed to get average rating.",
            });
        }
    },
    getComment: async (req, res) => {
        try {
            const { id: realtorId } = req.params;
            const comments = await prisma_1.default.rating.findMany({
                where: {
                    realtorId: realtorId,
                },
                select: {
                    comment: true,
                },
            });
            if (comments.length === 0) {
                return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                    message: `No comments found for realtor with ID: ${realtorId}`,
                });
            }
            const commentTexts = comments.map((comment) => comment.comment);
            return res.status(http_status_codes_1.StatusCodes.OK).json({
                comments: commentTexts,
            });
        }
        catch (error) {
            return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Failed to get comments for realtor.",
            });
        }
    },
};
exports.default = ratingController;
