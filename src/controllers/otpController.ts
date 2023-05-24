import bcrypt from "bcryptjs";
import prisma from "../DB/prisma";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import randaomGeneratorId from "../utils/otpGenerator";
import getOtpExpiryTime from "../utils/timeGenerator";
import sendEmail from "../utils/sendEmail";
import request from "request";
import cron from 'node-cron';

const checkIfOtpHasExpired = (otp_expiry: Date): boolean => {
  const currentTime = new Date().getTime();
  const expiryTimeFullFormat = new Date(otp_expiry).getTime();

  if (currentTime > expiryTimeFullFormat) return true; // OTP has expired
  return false; // OTP has not expired
};

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
          message: "User not found",
        });
      }

      const otp = randaomGeneratorId;
      const otp_expiry = getOtpExpiryTime;

      // const salt = await bcrypt.genSalt(16);
      // const hashedOtp = await bcrypt.hash(otp, salt);
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
            otp_expiry,
          },
        });
      } else {
        createdOtp = await prisma.otp.create({
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
        subject: "Verify Your Email with your OTP",
        html: `<p>Enter <b>${otp}</b> in the app to verify your email address and complete your registration.</p>
          <p>This code <b>expires in 5 minutes</b>.</p>`,
      };

      // Send the OTP to the user's email using the sendEmail function
      await sendEmail(emailOptions);

      return res.status(StatusCodes.OK).json({
        message: "OTP sent to your email",
      });
    } catch (error) {
      console.error(error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Failed to send OTP",
        error: error,
      });
    }
  },

  verifyOtpEmail: async (req: Request, res: Response): Promise<Response> => {
    try {
      const { userId, otp } = req.body;
  
      if (!userId || !otp) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "Empty OTP details are not allowed",
        });
      }
  
      const otpInstance = await prisma.otp.findFirst({
        where: {
          userId,
          otp,
        },
        include: {
          user: true,
        },
      });
  if(otpInstance == null) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: "Invalid OTP",
    });
  }
     
  
      await prisma.$transaction([
        prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            verifiedEmail: true,
          },
        }),
        prisma.otp.deleteMany({
          where: {
            userId,
          },
        }),
      ]);
  
      return res.status(StatusCodes.OK).json({
        status: "VERIFIED",
        message: "Email verified successfully",
      });
    } catch (error) {
      console.error(error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Failed to verify OTP",
        error: error,
      });
    }
  },
  
  
  

  sendOtpToPhone: async (
    req: Request,
    res: Response
  ): Promise<Response | void> => {
    try {
      const { number } = req.body;

      const user = await prisma.user.findUnique({
        where: {
          number: number,
        },
      });

      if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: "User not found",
        });
      }

      const otp = randaomGeneratorId;
      const otpExpiry = getOtpExpiryTime;

      
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
            otp_expiry: otpExpiry,
          },
        });
      } else {
        createdOtp = await prisma.otp.create({
          data: {
            userId: user.id,
            otp: otp,
            otp_expiry: otpExpiry,
          },
        });
      }

      console.log("Phone OTP:", createdOtp);
      console.log(otp);
      // Send the OTP to PHONE NUMBER (implementation not included).

      var options = {
        method: "POST",
        url: "https://api.sendchamp.com/api/v1/sms/send",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${process.env.ACCESS_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: [user.number],
          message: `Hi this is your OTP it expires in 5 Minutes ${otp}`,
          sender_name: "Sendchamp",
          route: "non_dnd",
        }),
      };

      request(options, function (error, response) {
        if (error) {
          console.error(error);
          return res.status(StatusCodes.BAD_REQUEST).json({
            message: `check your config`,
            error: error,
          });
        }
        console.log(response.body);
      });

      return res.status(StatusCodes.OK).json({
        message: "OTP sent to your phone number",
      });
    } catch (error) {
      console.error(error);

      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Failed to send OTP",
        error: error,
      });
    }
  },

  verifyOtpPhone: async (req: Request, res: Response): Promise<Response> => {
    try {
      const { userId, otp } = req.body;

      if (!userId || !otp) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "Empty OTP details are not allowed",
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
          message: "Invalid OTP",
        });
      }

      /// Check if OTP has expired
      if (checkIfOtpHasExpired(otpInstance.otp_expiry)) {
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
          verifiedNumber: true,
        },
      });

      await prisma.otp.delete({
        where: {
          id: otpInstance.id,
        },
      });

      return res.status(StatusCodes.OK).json({
        status: "VERIFIED",
        message: "Phone Number verified successfully",
      });
    } catch (error) {
      console.error(error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Failed to verify OTP",
        error: error,
      });
    }
  },
   removeExpiredOtps:  async () => {
    try {
      // Find expired OTPs and delete them
      const expiredOtps = await prisma.otp.findMany({
        where: {
          otp_expiry: {
            lte: new Date(), // Find OTPs that have expired
          },
        },
      });
  
      await prisma.otp.deleteMany({
        where: {
          id: {
            in: expiredOtps.map((otp) => otp.id),
          },
        },
      });
  
      console.log('Expired OTPs removed successfully.');
    } catch (error) {
      console.error('Failed to remove expired OTPs:', error);
    }

  }

  

};


cron.schedule('59 23 * * *', () => {
  OtpController.removeExpiredOtps();
});

export default OtpController;

// var options = {
//   method: "POST",
//   url: "https://api.sendchamp.com/api/v1/verification/create",
//   headers: {
//     Accept: "application/json",
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${process.env.ACCESS_KEY}`,
//   },
//   body: JSON.stringify({
//     channel: "sms",
//     token_type: "numeric",
//     sender: "DAlert",
//     token_length: "5",
//     expiration_time: 10,
//     to: [user.number],

//     customer_mobile_number: user.number,
//     meta_data: { email: "user.email", name: "user.name" },
//   }),
// };
// console.log(options);
