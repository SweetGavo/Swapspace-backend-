import { Request, Response } from 'express';
import prisma from '../DB/prisma';
import Joi from 'joi';
import { StatusCodes } from 'http-status-codes';
import { v2 as cloudinary } from 'cloudinary';
import realtorRepository from '../respository/realtorRepository';
import userRepository from '../respository/userRepository';
import { RealtorDataType } from '../helpers/types';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const createAgentProfileSchema = Joi.object({
  company_name: Joi.string().required(),
  address: Joi.string().required(),
  broker_BRN: Joi.string().required(),
  agent_ORN: Joi.string().required(),
  years_of_experience: Joi.string().required(),
  specialty: Joi.string().required(),
  role: Joi.string().required(),
  language: Joi.array().items(Joi.string()).required(),
  description: Joi.string().required(),
  license_number: Joi.string().required(),
  userId: Joi.string().required(),
  addProperty: Joi.array().items(Joi.string()),
  status: Joi.string(),
  image: Joi.string(),
});

const rectorController = {
  createAgentProfile: async (req: Request, res: Response): Promise<Response> => {
    try {
      const { error } = createAgentProfileSchema.validate(req.body);

      if (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: 'Invalid request body',
          error: error.details[0].message,
        });
      }

      const {
        userId,
        company_name,
        address,
        broker_BRN,
        agent_ORN,
        years_of_experience,
        specialty,
        role,
        language,
        description,
        license_number,
      } = req.body;

      // Check if user exists
      const userExists = await userRepository.getUserId(userId);

      if (!userExists) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: 'User does not exist',
        });
      }

      if (userExists.type !== 'AGENT') {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          message: 'You are not allowed to create an agent profile',
        });
      }

      // Upload broker card images to Cloudinary
      const brokerCardImages = [];
      if (req.files && Array.isArray(req.files) && req.files.length > 0) {
        const uploadPromises = req.files.map((file) =>
          cloudinary.uploader.upload(file.path)
        );
        const uploadedImages = await Promise.all(uploadPromises);
        brokerCardImages.push(...uploadedImages.map((image) => image.secure_url));
      }

      const agentData: RealtorDataType = {
        company_name,
        address,
        broker_BRN,
        agent_ORN,
        years_of_experience,
        specialty,
        role,
        language,
        description,
        license_number,
        broker_card_image: brokerCardImages,
        userId,
        status: 'PENDING',
        image: '',
      };

      const agent = await realtorRepository.createAgentProfile(agentData);

      await realtorRepository.updateUserWithRealtorId(userId, agent.id);

      //Send Notification

      return res.status(StatusCodes.CREATED).json({
        message: 'Agent profile created successfully',
        agent,
      });
    } catch (error) {
      console.error('Error creating agent profile:', error);

      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Failed to create agent profile',
      });
    }
  },
    
  

  updateAgentProfileImage: async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { userId } = req.body;
      const imageFile = req.file;

      if (!imageFile) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: 'Image file is missing',
        });
      }

      // Check if user exists
      const userExists = await realtorRepository.getOneRealtor(userId);

      if (!userExists) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: 'User does not exist',
        });
      }

      // Upload the image file to Cloudinary
      const result = await cloudinary.uploader.upload(imageFile.path);

      // Update agent profile image with the Cloudinary URL
      const updatedAgent = await realtorRepository.updateAgentProfileImage(
        userId,
        result.secure_url
      );

      return res.status(StatusCodes.OK).json({
        message: 'Agent profile image updated successfully',
        agent: updatedAgent.image,
      });
    } catch (error) {
      console.error('Error updating agent profile image:', error);

      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Failed to update agent profile image',
      });
    }
  
  },

  getAllRealtor: async (req: Request, res: Response) => {
    
      try {
        const ITEMS_PER_PAGE = 10;
        const page = parseInt(req.query.page as string) || 1;
  
        const { realtors, totalPages } = await realtorRepository.getAllRealtors(
          page,
          ITEMS_PER_PAGE
        );
  
        return res.status(StatusCodes.OK).json({
          count: realtors.length,
          message: 'Fetched ',
          currentPage: page,
          totalPages: totalPages,
          realtors,
        });
      } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          message: 'Failed to fetch all agents profile ',
        });
      }
    
  },
  getOneRealtor: async (req: Request, res: Response) => {
    try {
      const id  = parseInt(req.params.id);

      const realtor = await realtorRepository.getOneRealtor(id);

      if (!realtor) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: 'Realtor not found ',
        });
      }

     
      return res.status(StatusCodes.OK).json({
        message: 'Fetched',
        realtor,
      });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Failed to fetch agent profile ',
      });
    }
  },
  

  deleteRealtor: async (req: Request, res: Response): Promise<Response> => {
    try {
      const id  = parseInt(req.params.id);

      const deleteRealtor = await realtorRepository.deleteRealtor(id);

      if (!deleteRealtor) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: `Realtor not found` });
      }

      return res.status(StatusCodes.OK).json({ message: `Profile deleted` });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Failed to delete agent profile',
      });
    }
  },



 



  //TODO:  DELETE AND UPDATE,
};

export default rectorController;
