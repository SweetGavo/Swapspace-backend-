"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../DB/prisma"));
const http_status_codes_1 = require("http-status-codes");
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});
const profileController = {
    createProfile: async (req, res) => {
        try {
            const { fullname, address, userId } = req.body;
            const file = req.file; // Assuming the image file is uploaded as 'file' in the request
            if (!fullname || !address || !userId || !file) {
                return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                    message: "Please provide all the required details and upload an image.",
                });
            }
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
            // Upload image to Cloudinary
            const uploadedImage = await cloudinary_1.v2.uploader.upload(file.path);
            const profile = await prisma_1.default.profile.create({
                data: {
                    fullname,
                    address,
                    image: uploadedImage.secure_url,
                    user: {
                        connect: {
                            id: userId,
                        },
                    },
                },
            });
            return res.status(http_status_codes_1.StatusCodes.CREATED).json({
                message: "Profile created successfully.",
                profile,
            });
        }
        catch (error) {
            console.log(error);
            return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Failed to create profile.",
            });
        }
    },
    getOneProfile: async (req, res) => {
        try {
            const { id } = req.params;
            const profile = await prisma_1.default.profile.findFirst({
                where: {
                    id: id,
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            email: true,
                            number: true,
                            type: true,
                            verifiedEmail: true,
                            verifiedNumber: true,
                        },
                    },
                },
            });
            if (!profile) {
                return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                    message: "user not found",
                });
            }
            res.status(http_status_codes_1.StatusCodes.OK).json({
                user: profile,
            });
        }
        catch (error) {
            console.error("Error retrieving users:", error);
            res
                .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ error: "Failed to retrieve profile" });
        }
    },
    getAllProfile: async (req, res) => {
        try {
            const profiles = await prisma_1.default.profile.findMany({
                include: {
                    user: {
                        select: {
                            id: true,
                            email: true,
                            number: true,
                            type: true,
                            verifiedEmail: true,
                            verifiedNumber: true,
                        },
                    },
                },
            });
            res.status(http_status_codes_1.StatusCodes.OK).json({
                count: profiles?.length ?? 0,
                profiles: profiles ?? [],
            });
        }
        catch (error) {
            res
                .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ error: "Failed to retrieve profiles" });
        }
    },
    deleteProfile: async (req, res) => {
        const profileId = req.params.profileId;
        //const userId = req.user.id; // Assuming the user ID is available in the request object (e.g., from authentication middleware)
        try {
            await prisma_1.default.$transaction(async (prisma) => {
                const deletedProfile = await prisma.profile.delete({
                    where: {
                        id: profileId,
                    },
                });
                // Delete other related properties associated with the user
                // await prisma.property.deleteMany({
                //   where: {
                //     userId: userId,
                //   },
                // });
                return res.status(http_status_codes_1.StatusCodes.OK).json({
                    message: "Profile and associated properties deleted successfully.",
                    deletedProfile,
                });
            });
        }
        catch (error) {
            console.error(error);
            return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Failed to delete profile and associated properties.",
            });
        }
    },
    updateProfile: async (req, res) => {
        try {
            const profileId = req.params.profileId;
            const { fullname, address } = req.body;
            const updatedProfile = await prisma_1.default.profile.update({
                where: {
                    id: profileId,
                },
                data: {
                    fullname: fullname,
                    address: address,
                },
            });
            return res.status(http_status_codes_1.StatusCodes.OK).json({
                message: "Profile updated successfully.",
                updatedProfile,
            });
        }
        catch (error) {
            console.error(error);
            return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Failed to update profile.",
            });
        }
    },
};
exports.default = profileController;
