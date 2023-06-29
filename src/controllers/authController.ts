import { Request, Response } from 'express';
import prisma from '../DB/prisma';

import { StatusCodes } from 'http-status-codes';
import { hashPassword, comparePassword } from '../utils/password';
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import validatePasswordString from '../utils/passwordValidator';

const createUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  number: Joi.string().required(),
});

const authController = {
  createUser: async (req: Request, res: Response): Promise<Response> => {
    try {
      const { error } = createUserSchema.validate(req.body);

      if (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: 'Invalid request body',
          error: error.details[0].message,
        });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      const { email, password, number, image } = req.body;

      if (!email && !password && !number) {
        res.status(StatusCodes.BAD_REQUEST).json({
          message: 'Provide all required fields',
        });
      }
      // Check if email is valid
      if (!email.match(emailRegex)) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: 'Invalid email address',
        });
      }

      const emailAlreadyExists = await prisma.user.findUnique({
        where: { email },
      });
      if (emailAlreadyExists) {
        return res.status(StatusCodes.CONFLICT).json({
          message: 'Email already exists',
        });
      }
      // Check if number is unique
      const numberAlreadyExists = await prisma.user.findFirst({
        where: { number },
      });

      if (numberAlreadyExists) {
        return res.status(StatusCodes.CONFLICT).json({
          message: 'Number already exists',
        });
      }

      const passwordValidationResult = validatePasswordString(password);
      if (typeof passwordValidationResult !== 'boolean') {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json(passwordValidationResult);
      }

      // Hash the password
      const hashedPassword = await hashPassword(password);

      // Create the user if password validation passes
      if (passwordValidationResult) {
        const createdUser = await prisma.user.create({
          data: {
            email,
            password: hashedPassword,
            number,
          },
        });

        return res.status(StatusCodes.CREATED).json({
          message: 'User created successfully',
          user: {
            id: createdUser.id,
            email: createdUser.email,
            number: createdUser.number,
            type: createdUser.type,
            createdAt: createdUser.createdAt,
          },
        });
      } else {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: 'Invalid password',
        });
      }
    } catch (error) {
      console.log(error);

      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Failed to create user',
      });
    }
  },
  //Regulare users Login Function
  loginUser: async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;

    try {
      const user = await prisma.user.findUnique({ where: { email } });

      if (user && user.type != 'USER') {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: 'Buyers and Landlord Logins' });
      }

      if (!user) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          message: 'Invalid email or password',
        });
      }

      const isPasswordValid = await comparePassword(password, user.password);

      if (!isPasswordValid) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          message: 'Invalid email or password',
        });
      }

      // Generate a JWT token

      console.log(process.env.JWT_SECRET);

      const token = jwt.sign(
        { userId: user.id, type: user.type },
        process.env.JWT_SECRET || '', // Provide a default value if process.env.JWT_SECRET is undefined
        { expiresIn: '1h' }
      );

      return res.status(StatusCodes.OK).json({
        message: 'Login successful',
        user: {
          id: user.id,
          email: user.email,
          number: user.number,
          type: user.type,
        },
        token: token,
      });
    } catch (error) {
      console.log(error);

      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Failed to login',
      });
    }
  },

  logoutUser: async (req: Request, res: Response): Promise<Response> => {
    try {
      res.clearCookie('token');

      return res.status(StatusCodes.OK).json({
        message: 'Logout successful',
      });
    } catch (error) {
      console.log(error);

      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Failed to logout',
      });
    }
  },
  createAgent: async (req: Request, res: Response): Promise<Response> => {
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      const { email, password, number, type } = req.body;
      // Check if email is valid
      if (!email.match(emailRegex)) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: 'Invalid email address',
        });
      }

      const emailAlreadyExists = await prisma.user.findUnique({
        where: { email },
      });
      if (emailAlreadyExists) {
        return res.status(StatusCodes.CONFLICT).json({
          message: 'Email already exists',
        });
      }
      // Check if number is unique
      const numberAlreadyExists = await prisma.user.findFirst({
        where: { number },
      });

      if (numberAlreadyExists) {
        return res.status(StatusCodes.CONFLICT).json({
          message: 'Number already exists',
        });
      }

      validatePasswordString(password);

      // Hash the password
      const hashedPassword = await hashPassword(password);

      // Create the user
      const createdUser = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          number,
          type: 'AGENT',
        },
      });

      return res.status(StatusCodes.CREATED).json({
        message: 'Agent created successfully',
        user: {
          id: createdUser.id,
          email: createdUser.email,
          number: createdUser.number,
          type: createdUser.type,
          createdAt: createdUser.createdAt,
        },
      });
    } catch (error) {
      console.log(error);

      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Failed to create agent',
      });
    }
  },

  //Realtor  Login Function
  loginRealtor: async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;

    try {
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user || user.type !== 'AGENT') {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: 'Invalid user type' });
      }

      if (!user.realtorId) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: 'Realtor not found' });
      }

      const realtor = await prisma.realtor.findFirst({
        where: { id: user.realtorId },
      });

      if (!realtor) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: 'Realtor not found' });
      }

      if (!user) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          message: 'Invalid email or password',
        });
      }

      const isPasswordValid = await comparePassword(password, user.password);

      if (!isPasswordValid) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          message: 'Invalid email or password',
        });
      }

      // Generate a JWT token

      console.log(process.env.JWT_SECRET);

      const token = jwt.sign(
        { userId: realtor.id, type: user.type },
        process.env.JWT_SECRET || '', // Provide a default value if process.env.JWT_SECRET is undefined
        { expiresIn: '1h' }
      );

      return res.status(StatusCodes.OK).json({
        message: 'Login successful',
        user: {
          id: user.id,
          email: user.email,
          number: user.number,
          type: user.type,
        },
        token: token,
      });
    } catch (error) {
      console.log(error);

      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Failed to login',
      });
    }
  },

  // updateProfileImage: async (req: Request, res: Response) => {
  //      try {
  //           const file = req.file;

  //           if (!file) {
  //                return res.status(StatusCodes.NOT_FOUND).json("Please upload an image");
  //           }

  //           const { id: userId } = req.body;

  //           // Upload the image to Cloudinary
  //           const result = await cloudinary.uploader.upload(file.path);
  //           const existingProfile = await prisma.user.findUnique({
  //                where: {
  //                  id: userId, // Replace `userId` with the actual user ID
  //                },
  //              });

  //           if (!existingProfile) {
  //                return res.status(StatusCodes.NOT_FOUND).json({
  //                     error: 'Profile not found',
  //                });
  //           }

  //           const updatedProfile = await prisma.user.update({
  //                where: { id: userId },
  //                data: { image: result.secure_url },
  //           });

  //           console.log(req);
  //           return res.status(StatusCodes.OK).json(updatedProfile);
  //      } catch (error) {
  //           console.error('Error updating profile image:', error);
  //           return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to update profile image' });
  //      }
  // },
};

export default authController;
