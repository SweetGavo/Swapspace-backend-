"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma_1 = __importDefault(require("../DB/prisma"));
const http_status_codes_1 = require("http-status-codes");
const otpGenerator_1 = __importDefault(require("../utils/otpGenerator"));
const timeGenerator_1 = __importDefault(require("../utils/timeGenerator"));
const sendEmail_1 = __importDefault(require("../utils/sendEmail"));
const passwordController = {
    forgetPassword: async (req, res) => {
        try {
            const { email } = req.body;
            const user = await prisma_1.default.user.findUnique({
                where: {
                    email: email,
                },
            });
            if (!user) {
                return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                    message: "User not found",
                });
            }
            const otp = otpGenerator_1.default;
            const otp_expiry = timeGenerator_1.default;
            let createdOtp;
            const existingOtp = await prisma_1.default.otp.findFirst({
                where: {
                    userId: user.id,
                },
            });
            if (existingOtp) {
                createdOtp = await prisma_1.default.otp.update({
                    where: {
                        id: existingOtp.id,
                    },
                    data: {
                        otp: otp,
                        otp_expiry,
                    },
                });
            }
            else {
                createdOtp = await prisma_1.default.otp.create({
                    data: {
                        userId: user.id,
                        otp: otp,
                        otp_expiry,
                    },
                });
            }
            console.log(createdOtp, otp);
            const emailOptions = {
                email: user.email,
                subject: "Reset your password",
                html: `<p>Enter <b>${otp}</b> in the app to reset your password.</p>
                 <p>This code <b>expires in 5 minutes</b>.</p>`,
            };
            // Send the OTP to the user's email using the sendEmail function
            await (0, sendEmail_1.default)(emailOptions);
            return res.status(http_status_codes_1.StatusCodes.OK).json({
                message: "OTP sent to your email",
            });
        }
        catch (error) {
            return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Something Went wrong",
                error: error,
            });
        }
    },
    restPassword: async (req, res) => {
        try {
            const { userId, otp, newpassword } = req.body;
            if (!userId || !otp || !newpassword) {
                return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                    message: "Empty OTP details are not allowed",
                });
            }
            const user = await prisma_1.default.user.findUnique({
                where: { id: userId },
            });
            if (!user) {
                return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                    message: "User not found",
                });
            }
            const salt = await bcryptjs_1.default.genSalt(16);
            const hashedpw = await bcryptjs_1.default.hash(newpassword, salt);
            const otpInstance = await prisma_1.default.otp.findFirst({
                where: {
                    otp,
                    userId,
                },
            });
            if (!otpInstance) {
                return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
                    message: "Invalid OTP",
                });
            }
            const currentTime = Date.now();
            const expiryTime = otpInstance.otp_expiry.getTime();
            if (currentTime > expiryTime) {
                await prisma_1.default.$transaction([
                    prisma_1.default.otp.delete({ where: { id: otpInstance.id } }),
                    prisma_1.default.user.update({
                        where: { id: userId },
                        data: { password: hashedpw },
                    }),
                ]);
                return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                    message: "OTP has expired",
                });
            }
            await prisma_1.default.$transaction([
                prisma_1.default.otp.delete({ where: { id: otpInstance.id } }),
                prisma_1.default.user.update({
                    where: { id: userId },
                    data: { password: hashedpw },
                }),
            ]);
            return res.status(http_status_codes_1.StatusCodes.OK).json({
                message: "Password reset successful",
            });
        }
        catch (error) {
            console.error(error);
            return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Something went wrong",
                error: error,
            });
        }
    },
};
exports.default = passwordController;
