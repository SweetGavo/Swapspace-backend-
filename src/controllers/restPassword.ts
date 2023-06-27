import bcrypt from 'bcryptjs';
import prisma from '../DB/prisma';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import generateOTP from '../utils/otpGenerator';
import getOtpExpiryTime from '../utils/timeGenerator';
import { prepareMail } from '../utils/sendEmail';
import { passwordTem } from '../mailer/resetpasswordtemplate';
import { configs } from '../config';

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
          message: 'User not found',
        });
      }

      const otp = generateOTP();
      const otp_expiry = getOtpExpiryTime();

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
            otp: otp,
            otp_expiry: otp_expiry,
          },
        });
      } else {
        createdOtp = await prisma.otp.create({
          data: {
            userId: user.id,
            otp: otp,
            otp_expiry: otp_expiry,
          },
        });
      }

      console.log(createdOtp, otp);
      

      const mailSubject = 'PASSWORD RESET';
      const mailBody1 = `${otp}`;
      const mailBodyPromise = passwordTem({
        subject: mailSubject,
        otp: mailBody1,
      });
      const mailBody = await mailBodyPromise;
      
      await prepareMail({
        mailRecipients: user.email,
        mailSubject: mailSubject,
        mailBody: mailBody,
        senderName: configs.SENDERS_NAME,
        senderEmail: configs.SENDERS_EMAIL,
      });
     
      return res.status(StatusCodes.OK).json({
        message: 'OTP sent to your email',
      });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Something Went wrong',
        error: error,
      });
    }
  },

  restPassword: async (req: Request, res: Response): Promise<Response> => {
    try {
      const { userId, otp, newpassword } = req.body;

      if (!userId || !otp || !newpassword) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: 'Empty OTP details are not allowed',
        });
      }

      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: 'User not found',
        });
      }

      const salt = await bcrypt.genSalt(16);
      const hashedpw = await bcrypt.hash(newpassword, salt);

      const otpInstance = await prisma.otp.findFirst({
        where: {
          otp,
          userId,
        },
      });

      if (!otpInstance) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          message: 'Invalid OTP',
        });
      }

      const currentTime = Date.now();
      const expiryTime = otpInstance.otp_expiry.getTime();

      if (currentTime > expiryTime) {
        await prisma.$transaction([
          prisma.otp.delete({ where: { id: otpInstance.id } }),
          prisma.user.update({
            where: { id: userId },
            data: { password: hashedpw },
          }),
        ]);

        return res.status(StatusCodes.BAD_REQUEST).json({
          message: 'OTP has expired',
        });
      }

      await prisma.$transaction([
        prisma.otp.delete({ where: { id: otpInstance.id } }),
        prisma.user.update({
          where: { id: userId },
          data: { password: hashedpw },
        }),
      ]);

      //TODO: send mail

      return res.status(StatusCodes.OK).json({
        message: 'Password reset successful',
      });
    } catch (error) {
      console.error(error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Something went wrong',
        error: error,
      });
    }
  },
};

export default passwordController;
