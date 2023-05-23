import bcrypt from "bcryptjs";
import prisma from "../DB/prisma";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import randaomGeneratorId from "../utils/otpGenerator";
import getOtpExpiryTime from "../utils/timeGenerator";
import sendEmail from "../utils/sendEmail";

// const checkIfOtpHasExpired = (otp_expiry: Date): boolean => {
//   const currentTime = new Date().getTime();
//   const expiryTimeFullFormat = new Date(otp_expiry).getTime();

//   if (currentTime > expiryTimeFullFormat) return true; // OTP has expired
//   return false; // OTP has not expired
// };

const passwordController = {
  forgetPassword: async (req: Request, res: Response): Promise<Response> => {
    try {
      const { email } = req.body;

      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: "User not found",
        });
      }

      const otp = randaomGeneratorId;
      const otp_expiry = getOtpExpiryTime;

      const salt = await bcrypt.genSalt(16);
      const hashedOtp = await bcrypt.hash(otp, salt);
      let createdOtp;

      const existingOtp = await prisma.otp.findFirst({
        where: {
          userId: user.id,
        },
      });

      if (existingOtp) {
        createdOtp = await prisma.otp.update({
          where: {
            id: existingOtp.id,
          },
          data: {
            otp: hashedOtp,
            otp_expiry,
          },
        });
      } else {
        createdOtp = await prisma.otp.create({
          data: {
            userId: user.id,
            otp: hashedOtp,
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
      await sendEmail(emailOptions);
      return res.status(StatusCodes.OK).json({
        message: "OTP sent to your email",
      });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Something Went wrong",
        error: error,
      });
    }
  },

  restPassword: async (req: Request, res: Response): Promise<Response> => {
    try {
      const { userId, otp, newpassword } = req.body;

      if (!userId || !otp || !newpassword) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "Empty OTP details are not allowed",
        });
      }

      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: "User not found",
        });
      }

      const salt = await bcrypt.genSalt(16);
      const hashedpw = await bcrypt.hash(newpassword, salt);

      const otpInstance = await prisma.otp.findFirst({
          where: {
            otp: otp,
          },
        });

      if (!otpInstance) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          message: "Invalid OTP",
        });
      }

      const currentTime = Date.now();
      const expiryTime = otpInstance.otp_expiry.getTime(); // Convert to number

      // Check if OTP has expired
      if (currentTime > expiryTime) {
        // Delete the expired OTP
        await prisma.otp.delete({
          where: {
            id: otpInstance.id,
          },
        });

        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "OTP has expired",
        });
      }

      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          password: hashedpw,
        },
      });

      // Delete the used OTP
      await prisma.otp.delete({
        where: {
          id: otpInstance.id,
        },
      });

      return res.status(StatusCodes.OK).json({
        message: "Password reset successful",
      });
    } catch (error) {
      console.error(error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Something went wrong",
        error: error,
      });
    }
  },
};

export default passwordController;
