"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../DB/prisma"));
const joi_1 = __importDefault(require("joi"));
const http_status_codes_1 = require("http-status-codes");
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});
const createAgentProfileSchema = joi_1.default.object({
    company_name: joi_1.default.string().required(),
    address: joi_1.default.string().required(),
    broker_BRN: joi_1.default.string().required(),
    agent_ORN: joi_1.default.string().required(),
    years_of_experience: joi_1.default.string().required(),
    specialty: joi_1.default.string().required(),
    role: joi_1.default.string().required(),
    language: joi_1.default.array().items(joi_1.default.string()).required(),
    description: joi_1.default.string().required(),
    license_number: joi_1.default.string().required(),
    userId: joi_1.default.string().required(),
    addProperty: joi_1.default.array().items(joi_1.default.string()),
    status: joi_1.default.string(),
    image: joi_1.default.string(),
});
const rectorController = {
    createAgentProfile: async (req, res) => {
        try {
            const { error } = createAgentProfileSchema.validate(req.body);
            if (error) {
                return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                    message: 'Invalid request body',
                    error: error.details[0].message,
                });
            }
            const { userId, company_name, address, broker_BRN, agent_ORN, years_of_experience, specialty, role, language, description, license_number, } = req.body;
            // Check if user exists
            const userExists = await prisma_1.default.user.findUnique({
                where: { id: userId },
            });
            if (!userExists) {
                return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                    message: 'User does not exist',
                });
            }
            if (userExists.type != 'AGENT') {
                return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
                    message: 'You are not allowed to Create AN AGENT Profile',
                });
            }
            // Upload broker card images to Cloudinary
            const brokerCardImages = [];
            if (req.files && Array.isArray(req.files) && req.files.length > 0) {
                const uploadPromises = req.files.map((file) => cloudinary_1.v2.uploader.upload(file.path));
                const uploadedImages = await Promise.all(uploadPromises);
                brokerCardImages.push(...uploadedImages.map((image) => image.secure_url));
            }
            // Create agent profile
            const agent = await prisma_1.default.realtor.create({
                data: {
                    company_name,
                    address,
                    broker_BRN,
                    agent_ORN,
                    years_of_experience,
                    specialty,
                    role,
                    language,
                    description,
                    license_number,
                    broker_card_image: brokerCardImages,
                    userId,
                    status: 'PENDING',
                    image: '',
                },
            });
            return res.status(http_status_codes_1.StatusCodes.CREATED).json({
                message: 'Agent profile created successfully',
                agent,
            });
        }
        catch (error) {
            console.log(error);
            console.error('Error creating agent profile:', error);
            return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: 'Failed to create agent profile',
            });
        }
    },
    updateAgentProfileImage: async (req, res) => {
        try {
            const { userId } = req.body;
            const imageFile = req.file; // Assuming the image file is uploaded as 'file' in the request
            if (!imageFile) {
                return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                    message: 'Image file is missing',
                });
            }
            // Check if user exists
            const userExists = await prisma_1.default.user.findUnique({
                where: { id: userId },
            });
            if (!userExists) {
                return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                    message: 'User does not exist',
                });
            }
            // Upload the image file to Cloudinary
            const result = await cloudinary_1.v2.uploader.upload(imageFile.path);
            // Update agent profile image with the Cloudinary URL
            const updatedAgent = await prisma_1.default.realtor.update({
                where: { userId },
                data: { image: result.secure_url },
            });
            return res.status(http_status_codes_1.StatusCodes.OK).json({
                message: 'Agent profile image updated successfully',
                agent: updatedAgent.image,
            });
        }
        catch (error) {
            console.error('Error updating agent profile image:', error);
            return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: 'Failed to update agent profile image',
            });
        }
    },
    getAllRealtor: async (req, res) => {
        try {
            const realtors = await prisma_1.default.realtor.findMany({});
            return res.status(http_status_codes_1.StatusCodes.OK).json({
                count: realtors.length,
                message: 'Fetched ',
                realtors,
            });
        }
        catch (error) {
            return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: 'Failed to fetch all agents profile ',
            });
        }
    },
    getOneRealtor: async (req, res) => {
        try {
            const { id } = req.params;
            const realtor = await prisma_1.default.realtor.findFirst({
                where: {
                    id: id,
                },
                include: {
                    user: true,
                },
            });
            // Exclude password and broker id
            if (!realtor) {
                return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                    message: 'Realtor not found ',
                });
            }
            return res.status(http_status_codes_1.StatusCodes.OK).json({
                message: 'Fatched',
                realtor,
            });
        }
        catch (error) {
            return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: 'Failed to fetch  agent profile ',
            });
        }
    },
    //todo  DELETE AND UPDATE, PAGENATING
};
exports.default = rectorController;
