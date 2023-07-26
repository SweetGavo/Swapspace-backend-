import { Request, Response } from 'express';
import prisma from '../DB/prisma';
import { StatusCodes } from 'http-status-codes';
import { v2 as cloudinary } from 'cloudinary';
import profileRepository from '../respository/profileRepository';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const profileController = {
  createProfile: async (req: Request, res: Response): Promise<Response> => {
    try {
      const { fullname, address, userId } = req.body;
      const file = req.file; // Assuming the image file is uploaded as 'file' in the request

      if (!fullname || !address || !userId || !file) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message:
            'Please provide all the required details and upload an image.',
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

      const profile = await profileRepository.createProfile(
        fullname,
        address,
        userId,
        uploadedImage.secure_url
      );

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

  getOneProfile: async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);

      const profile = await profileRepository.getOneProfile(id);

      if (!profile) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: 'User not found',
        });
      }

      res.status(StatusCodes.OK).json({
        user: profile,
      });
    } catch (error) {
      console.error('Error retrieving profiles:', error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: 'Failed to retrieve profile' });
    }
  },

  getAllProfile: async (req: Request, res: Response) => {
    try {
      const profiles = await profileRepository.getAllProfiles();

      res.status(StatusCodes.OK).json({
        count: profiles?.length ?? 0,
        profiles: profiles ?? [],
      });
    } catch (error) {
      console.error(error, 'error');
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: 'Failed to retrieve profiles' });
    }
  },

  deleteProfile: async (req: Request, res: Response) => {
    const profileId = parseInt(req.params.profileId);

    try {
      const deletedProfile =
        await profileRepository.deleteProfileAndRelatedProperties(profileId);

      return res.status(StatusCodes.OK).json({
        message: 'Profile and associated properties deleted successfully.',
        deletedProfile,
      });
    } catch (error) {
      console.error(error);

      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Failed to delete profile and associated properties.',
      });
    }
  },

  updateProfile: async (req: Request, res: Response) => {
    try {
      const profileId = parseInt(req.params.profileId);
      const { fullname, address } = req.body;

      const updatedProfile = await profileRepository.updateProfile(
        profileId,
        fullname,
        address
      );

      return res.status(StatusCodes.OK).json({
        message: 'Profile updated successfully.',
        updatedProfile,
      });
    } catch (error) {
      console.error(error);

      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Failed to update profile.',
      });
    }
  },
};

export default profileController;
