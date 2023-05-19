import { Request, Response } from 'express';
import prisma from '../DB/prisma';
import { StatusCodes } from 'http-status-codes';




const profileController = {
     createProfile: async (req: Request, res: Response): Promise<Response> => {
       try {
         const { fullname,  address, userId } = req.body;
   
         if (!fullname || !address || !userId) {
           return res.status(StatusCodes.BAD_REQUEST).json({
             message: 'Please provide all the required details.',
           });
         }
   
         // Check if the user with the provided userId exists
         const user = await prisma.user.findUnique({
           where: {
             id: userId,
           },
         });
   
         if (!user) {
           return res.status(StatusCodes.NOT_FOUND).json({
             message: 'User not found.',
           });
         }
   
         const profile = await prisma.profile.create({
           data: {
             fullname,
             
             address,
             image: '', // Provide a default value for the 'image' field if needed
             user: {
               connect: {
                 id: userId,
               },
             },
           },
         });
   
         return res.status(StatusCodes.CREATED).json({
           message: 'Profile created successfully.',
           profile,
         });
       } catch (error) {
         console.log(error);
   
         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
           message: 'Failed to create profile.',
         });
       }
     },
   };
   
   export default profileController;
   
   




     