import { Request, Response } from 'express';
import prisma from '../DB/prisma';
import { format, parseISO } from 'date-fns';

import { StatusCodes } from 'http-status-codes';
import { hashPassword, comparePassword } from '../utils/password';
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import validatePasswordString from '../utils/passwordValidator';
import userRepository from '../respository/userRepository';


const createUserSchema = Joi.object({
  email: Joi.string()
    .email()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    .required(),
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

      const { email, password, number } = req.body;

      const emailAlreadyExists = await userRepository.getUserByEmail(email);
      if (emailAlreadyExists) {
        return res.status(StatusCodes.CONFLICT).json({
          message: 'Email already exists',
        });
      }

      const numberAlreadyExists = await userRepository.getUserByNumber(number);
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

      const hashedPassword = await hashPassword(password);

      if (passwordValidationResult) {
        const createdUser = await userRepository.createUser(
          email,
          hashedPassword,
          number
        );

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
      console.error('Error creating user:', error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Failed to create user',
      });
    }
  },
  //Regulare users Login Function
  loginUser: async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;

    try {
      const user = await userRepository.getUserByEmail(email);

      if (user && user.type !== 'USER') {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: 'Buyers and Landlord Logins',
        });
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
      const token = jwt.sign(
        { userId: user.id, type: user.type },
        process.env.JWT_SECRET || '', // Provide a default value if process.env.JWT_SECRET is undefined
        { expiresIn: '1h' }
      );

      // Format the lastLogin value
      const formattedLastLogin = format(new Date(), 'yyyy-MM-dd HH:mm:ss');

      await userRepository.updateUserLastLogin(user.id, formattedLastLogin);

      return res.status(StatusCodes.OK).json({
        message: 'Login successful',
        user: {
          id: user.id,
          email: user.email,
          number: user.number,
          type: user.type,
          lastLogin: formattedLastLogin,
        },
        token: token,
      });
    } catch (error) {
      console.error('Error logging in:', error);
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


  

};

export default authController;
