import bcrypt from 'bcryptjs';
import prisma from '../DB/prisma';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import randaomGeneratorId from '../utils/otpGenerator';
import getOtpExpiryTime from '../utils/timeGenerator';
import sendEmail from '../utils/sendEmail';



const checkIfOtpHasExpired = (otp_expiry: Date): boolean => {
     const currentTime = new Date().getTime();
     const expiryTimeFullFormat = new Date(otp_expiry).getTime();
   
     if (currentTime > expiryTimeFullFormat) return true; // OTP has expired
     return false; // OTP has not expired
   };

const passwordController = {
     forgetPassword: async (req: Request, res: Response): Promise<Response> => {
       try {
        const { email} = req.body;

        const user = await prisma.user.findUnique({
          where: {
               email: email,
          },
        });

        if(!user) {
          return res.status(StatusCodes.NOT_FOUND).json({
               message: 'User not found',
             });
           }
         
           const otp = randaomGeneratorId;
           const otp_expiry = getOtpExpiryTime;
            
           const salt = await bcrypt.genSalt(16)
           const hashedOtp = await bcrypt.hash(otp, salt)
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
                   otp:hashedOtp ,
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
               message: 'OTP sent to your email',
             });

       } catch (error) {
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
               message: 'Something Went wrong',
               error: error
             });
       }
     },

     restPassword: async (req: Request, res: Response): Promise<Response> => {
          try {
            const { userId, otp, newpassword } = req.body;

            if(!userId || !otp) {
               return res.status(StatusCodes.BAD_REQUEST).json({
                    message: `Empty otp details are not allowed`
               })
            } else {
               const salt = await bcrypt.genSalt(16)
      const hashedpw = await bcrypt.hash(newpassword, salt)


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
  
         // Check if OTP has expired
         if (checkIfOtpHasExpired(otpInstance.otp_expiry)) {
          return res.status(StatusCodes.BAD_REQUEST).json({
            message: 'OTP has expired',
          });
        }
    

            await prisma.user.update({
               where: {
                    id: userId,
               },
               data: {
                    password: hashedpw
               },
            })
            await prisma.otp.delete({
               where: {
                 id: otpInstance.id,
               },
             });


            }

            return res.status(StatusCodes.OK).json({
               message: " password reset  successful"
             });


          } catch (error) {
               return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                    message: 'Something Went wrong',
                    error: error
                  });  
          }
     }
}


export default passwordController