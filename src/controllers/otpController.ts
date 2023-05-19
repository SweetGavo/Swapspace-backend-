import bcrypt from 'bcryptjs';
import prisma from '../DB/prisma';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import randaomGeneratorId from '../utils/otpGenerator';
import getOtpExpiryTime from '../utils/timeGenerator';



const OtpController = {
  sendOtpToMail: async (req: Request, res: Response): Promise<Response> => {
    try {
      const { email } = req.body;


      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: 'User not found',
        });
      }

      const otp = randaomGeneratorId;
      const expiresAt = getOtpExpiryTime;

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
            otp,
            expiresAt,
          },
        });
      } else {
        createdOtp = await prisma.otp.create({
          data: {
            userId: user.id,
            otp,
            expiresAt,
          },
        });
      }

      console.log(createdOtp);

      // Send the OTP to the user's email (implementation not included).

      return res.status(StatusCodes.OK).json({
        message: 'OTP sent to your email',
      });
    } catch (error) {
      console.error(error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Failed to send OTP',
        error: error
      });
    }
  },

  verifyOtpEmail: async (req: Request, res: Response): Promise<Response> => {
    try {
      const { userId, otp } = req.body;
  
      if (!userId || !otp) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: 'Empty OTP details are not allowed',
        });
      }
  
      const otpInstance = await prisma.otp.findFirst({
        where: {
          userId: userId,
          otp: otp,
        },
      });
  
      if (!otpInstance) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: 'Invalid OTP',
        });
      }
  
      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          verifiedEmail: true,
        },
      });
  
      await prisma.otp.delete({
        where: {
          id: otpInstance.id,
        },
      });
  
      return res.status(StatusCodes.OK).json({
        status: 'VERIFIED',
        message: 'Email verified successfully',
      });
    } catch (error) {
      console.error(error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Failed to verify OTP',
        error: error,
      });
    }
  },
  
};

export default OtpController;