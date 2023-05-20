import { Request, Response } from 'express';
import prisma from '../DB/prisma';
import { StatusCodes } from 'http-status-codes';
import { v2 as cloudinary } from 'cloudinary';


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});




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

     updateProfileImage: async (req: Request, res: Response) => {
      try {
        const { profileId } = req.params;
        const { image } = req.body;
  
        if (!profileId) {
          return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Profile ID is required' });
        }

        // Upload the image to Cloudinary
        const result = await cloudinary.uploader.upload(image);
  
        // Update the profile image URL in the database
        const updatedProfile = await prisma.profile.update({
          where: { id: profileId },
          data: { image: result.secure_url },
        });
  
        res.status(StatusCodes.OK).json(updatedProfile);
      } catch (error) {
        console.error('Error updating profile image:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to update profile image' });
      }
    }
  

     
   };
   
   export default profileController;
   
   




     