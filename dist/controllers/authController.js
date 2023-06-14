"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../DB/prisma"));
const http_status_codes_1 = require("http-status-codes");
const password_1 = require("../utils/password");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const joi_1 = __importDefault(require("joi"));
const passwordValidator_1 = __importDefault(require("../utils/passwordValidator"));
const createUserSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required(),
    number: joi_1.default.string().required(),
});
const authController = {
    createUser: async (req, res) => {
        try {
            const { error } = createUserSchema.validate(req.body);
            if (error) {
                return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                    message: 'Invalid request body',
                    error: error.details[0].message,
                });
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const { email, password, number, image } = req.body;
            if (!email && !password && !number) {
                res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                    message: 'Provide all required fields',
                });
            }
            // Check if email is valid
            if (!email.match(emailRegex)) {
                return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                    message: 'Invalid email address',
                });
            }
            const emailAlreadyExists = await prisma_1.default.user.findUnique({
                where: { email },
            });
            if (emailAlreadyExists) {
                return res.status(http_status_codes_1.StatusCodes.CONFLICT).json({
                    message: 'Email already exists',
                });
            }
            // Check if number is unique
            const numberAlreadyExists = await prisma_1.default.user.findUnique({
                where: { number },
            });
            if (numberAlreadyExists) {
                return res.status(http_status_codes_1.StatusCodes.CONFLICT).json({
                    message: 'Number already exists',
                });
            }
            const passwordValidationResult = (0, passwordValidator_1.default)(password);
            if (typeof passwordValidationResult !== 'boolean') {
                return res
                    .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                    .json(passwordValidationResult);
            }
            // Hash the password
            const hashedPassword = await (0, password_1.hashPassword)(password);
            // Create the user if password validation passes
            if (passwordValidationResult) {
                const createdUser = await prisma_1.default.user.create({
                    data: {
                        email,
                        password: hashedPassword,
                        number,
                    },
                });
                return res.status(http_status_codes_1.StatusCodes.CREATED).json({
                    message: 'User created successfully',
                    user: {
                        id: createdUser.id,
                        email: createdUser.email,
                        number: createdUser.number,
                        type: createdUser.type,
                        createdAt: createdUser.createdAt,
                    },
                });
            }
            else {
                return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                    message: 'Invalid password',
                });
            }
        }
        catch (error) {
            console.log(error);
            return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: 'Failed to create user',
            });
        }
    },
    loginUser: async (req, res) => {
        const { email, password } = req.body;
        try {
            const user = await prisma_1.default.user.findUnique({ where: { email } });
            if (!user) {
                return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
                    message: 'Invalid email or password',
                });
            }
            const isPasswordValid = await (0, password_1.comparePassword)(password, user.password);
            if (!isPasswordValid) {
                return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
                    message: 'Invalid email or password',
                });
            }
            // Generate a JWT token
            console.log(process.env.JWT_SECRET);
            const token = jsonwebtoken_1.default.sign({ userId: user.id, type: user.type }, process.env.JWT_SECRET || '', // Provide a default value if process.env.JWT_SECRET is undefined
            { expiresIn: '1h' });
            return res.status(http_status_codes_1.StatusCodes.OK).json({
                message: 'Login successful',
                user: {
                    id: user.id,
                    email: user.email,
                    number: user.number,
                    type: user.type,
                },
                token: token,
            });
        }
        catch (error) {
            console.log(error);
            return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: 'Failed to login',
            });
        }
    },
    logoutUser: async (req, res) => {
        try {
            res.clearCookie('token');
            return res.status(http_status_codes_1.StatusCodes.OK).json({
                message: 'Logout successful',
            });
        }
        catch (error) {
            console.log(error);
            return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: 'Failed to logout',
            });
        }
    },
    createAgent: async (req, res) => {
        try {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const { email, password, number, type } = req.body;
            // Check if email is valid
            if (!email.match(emailRegex)) {
                return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                    message: 'Invalid email address',
                });
            }
            const emailAlreadyExists = await prisma_1.default.user.findUnique({
                where: { email },
            });
            if (emailAlreadyExists) {
                return res.status(http_status_codes_1.StatusCodes.CONFLICT).json({
                    message: 'Email already exists',
                });
            }
            // Check if number is unique
            const numberAlreadyExists = await prisma_1.default.user.findUnique({
                where: { number },
            });
            if (numberAlreadyExists) {
                return res.status(http_status_codes_1.StatusCodes.CONFLICT).json({
                    message: 'Number already exists',
                });
            }
            (0, passwordValidator_1.default)(password);
            // Hash the password
            const hashedPassword = await (0, password_1.hashPassword)(password);
            // Create the user
            const createdUser = await prisma_1.default.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    number,
                    type: 'AGENT',
                },
            });
            return res.status(http_status_codes_1.StatusCodes.CREATED).json({
                message: 'Agent created successfully',
                user: {
                    id: createdUser.id,
                    email: createdUser.email,
                    number: createdUser.number,
                    type: createdUser.type,
                    createdAt: createdUser.createdAt,
                },
            });
        }
        catch (error) {
            console.log(error);
            return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: 'Failed to create agent',
            });
        }
    },
    // updateProfileImage: async (req: Request, res: Response) => {
    //      try {
    //           const file = req.file;
    //           if (!file) {
    //                return res.status(StatusCodes.NOT_FOUND).json("Please upload an image");
    //           }
    //           const { id: userId } = req.body;
    //           // Upload the image to Cloudinary
    //           const result = await cloudinary.uploader.upload(file.path);
    //           const existingProfile = await prisma.user.findUnique({
    //                where: {
    //                  id: userId, // Replace `userId` with the actual user ID
    //                },
    //              });
    //           if (!existingProfile) {
    //                return res.status(StatusCodes.NOT_FOUND).json({
    //                     error: 'Profile not found',
    //                });
    //           }
    //           const updatedProfile = await prisma.user.update({
    //                where: { id: userId },
    //                data: { image: result.secure_url },
    //           });
    //           console.log(req);
    //           return res.status(StatusCodes.OK).json(updatedProfile);
    //      } catch (error) {
    //           console.error('Error updating profile image:', error);
    //           return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to update profile image' });
    //      }
    // },
};
exports.default = authController;
