import { Request, Response } from 'express';
import prisma from '../DB/prisma';
import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';
import { hashPassword, comparePassword } from '../utils/password';
import validatePasswordString from '../utils/passwordValidator';
import jwt from 'jsonwebtoken';

const createCoRealtorSchema = Joi.object({
  full_name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(20).required(),
  number: Joi.number().required(),
  token: Joi.string().token().required(),
});

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const coRealtorController = {
  createCoRealtor: async (req: Request, res: Response): Promise<Response> => {
    const { error } = createCoRealtorSchema.validate(req.body);

    if (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Invalid request body',
        error: error.details[0].message,
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const { full_name, email, password, token, number } = req.body;
    const file = req.file; // Assuming the image file is uploaded as 'file' in the request

    if (!email.match(emailRegex)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Invalid email address',
      });
    }

    // Check for token
    const checkTokenExists = await prisma.invitation.findUnique({
      where: {
        token: token,
      },
    });

    if (!checkTokenExists) {
      return res.status(StatusCodes.FORBIDDEN).json({
        message: 'You have not been invited by a realtor to join',
      });
    }

    const passwordValidationResult = validatePasswordString(password);
    if (typeof passwordValidationResult !== 'boolean') {
      return res.status(StatusCodes.BAD_REQUEST).json(passwordValidationResult);
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    try {
      if (!file) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: 'Image file is required',
        });
      }

      // Upload image to Cloudinary
      const uploadedImage = await cloudinary.uploader.upload(file.path);

      const newAccount = await prisma.coRealtor.create({
        data: {
          full_name,
          email,
          password: hashedPassword,
          number,
          token,
          image: uploadedImage.secure_url,
        },
      });

      return res
        .status(StatusCodes.CREATED)
        .json({ message: 'Created successfully', data: newAccount });
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: 'Error uploading image' });
    }
  },

  coRelatorLogin: async (req: Request, res: Response): Promise<Response> => {
    try {
      const { email, password } = req.body;

      const co_Realtor = await prisma.coRealtor.findUnique({
        where: email,
      });

      if (!co_Realtor) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          message: 'Invalid email or password',
        });
      }

      const isPasswordValid = await comparePassword(
        password,
        co_Realtor.password
      );

      if (!isPasswordValid) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          message: 'Invalid email or password',
        });
      }

      //Generate a JWT token

      const token = jwt.sign(
        { userId: co_Realtor.id, type: co_Realtor.type },
        process.env.JWT_SECRET || '',
        { expiresIn: '1h' }
      );

      return res.status(StatusCodes.OK).json({
        message: 'Login successful',
        co_Realtor: {
          email: co_Realtor.email,
          number: co_Realtor.number,
          type: co_Realtor.type,
        },
        token,
      });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Failed to login',
      });
    }
  },
};

export default coRealtorController;
