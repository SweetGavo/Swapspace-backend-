import { Request, Response } from "express";
import prisma from "../DB/prisma";
import Joi from "joi";
import { StatusCodes } from "http-status-codes";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const createAgentProfileSchema = Joi.object({
  compant_name: Joi.string().required(),
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
  image: Joi.string().allow(""),
});

const rectorController = {
  createAgentProfile: async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { error } = createAgentProfileSchema.validate(req.body);

      if (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "Invalid request body",
          error: error.details[0].message,
        });
      }

      const {
        userId,
        compant_name,
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
      const userExists = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!userExists) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: "User does not exist",
        });
      }

      if (userExists.type != "AGENT") {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          message: "You are not allowed to Create AN AGENT Profile",
        });
      }

      // Upload broker card images to Cloudinary
      const brokerCardImages: string[] = [];
      if (req.files && Array.isArray(req.files) && req.files.length > 0) {
        const uploadPromises = req.files.map((file: Express.Multer.File) =>
          cloudinary.uploader.upload(file.path)
        );
        const uploadedImages = await Promise.all(uploadPromises);
        brokerCardImages.push(
          ...uploadedImages.map((image) => image.secure_url)
        );
      }

      // Create agent profile
      const agent = await prisma.realtor.create({
        data: {
          compant_name,
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
          status: "PENDING",
          image: "",
        },
      });

      return res.status(StatusCodes.CREATED).json({
        message: "Agent profile created successfully",
        agent,
      });
    } catch (error) {
      console.error("Error creating agent profile:", error);

      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Failed to create agent profile",
      });
    }
  },

  updateAgentProfileImage: async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { userId } = req.body;
      const imageFile = req.file; // Assuming the image file is uploaded as 'file' in the request

      if (!imageFile) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "Image file is missing",
        });
      }

      // Check if user exists
      const userExists = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!userExists) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "User does not exist",
        });
      }

      // Upload the image file to Cloudinary
      const result = await cloudinary.uploader.upload(imageFile.path);

      // Update agent profile image with the Cloudinary URL
      const updatedAgent = await prisma.realtor.update({
        where: { userId },
        data: { image: result.secure_url },
      });

      return res.status(StatusCodes.OK).json({
        message: "Agent profile image updated successfully",
        agent: updatedAgent.image,
      });
    } catch (error) {
      console.error("Error updating agent profile image:", error);

      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Failed to update agent profile image",
      });
    }
  },
};

export default rectorController;
