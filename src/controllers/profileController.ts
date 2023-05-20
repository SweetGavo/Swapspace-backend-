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
      const { fullname, address, userId } = req.body;
      const file = req.file; // Assuming the image file is uploaded as 'file' in the request

      if (!fullname || !address || !userId || !file) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: 'Please provide all the required details and upload an image.',
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

      // Upload image to Cloudinary
      const uploadedImage = await cloudinary.uploader.upload(file.path);

      const profile = await prisma.profile.create({
        data: {
          fullname,
          address,
          image: uploadedImage.secure_url, // Store the secure URL of the uploaded image
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