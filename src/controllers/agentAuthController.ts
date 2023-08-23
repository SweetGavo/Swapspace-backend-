import { Request, Response } from 'express';
import { format, parseISO } from 'date-fns';

import { StatusCodes } from 'http-status-codes';
import { hashPassword, comparePassword } from '../utils/password';
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import validatePasswordString from '../utils/passwordValidator';

import agentRepository from '../respository/agentRepository';
import { Agent } from '@prisma/client';
import prisma from '../DB/prisma';

const createAgentSchema = Joi.object({
  email: Joi.string()
    .email()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    .required(),
  password: Joi.string().required(),
  number: Joi.string().required(),
});

interface CreateAgentRequestBody {
  email: string;
  password: string;
  number: string;
}

const agentController = {
  createAgent: async (req: Request, res: Response): Promise<Response> => {
    try {
      const { error } = createAgentSchema.validate(req.body);

      if (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: 'Invalid request body',
          error: error.details[0].message,
        });
      }

      const { email, password, number } = req.body as CreateAgentRequestBody;

      const checkAgent : Agent | null = await agentRepository.getAgentByEmail(email);

      if (checkAgent) {
        return res.status(StatusCodes.CONFLICT).json({
          message: 'Email already exists',
        });
      }

      if (checkAgent && checkAgent[number]) {
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
        const createdGent = await agentRepository.createAgent(
          email,
          hashedPassword,
          number
        );

        return res.status(StatusCodes.CREATED).json({
          message: 'User created successfully',
          user: {
            id: createdGent.id,
            email: createdGent.email,
            number: createdGent.number,
            type: createdGent.type,
            createdAt: createdGent.createdAt,
          },
        });
      } else {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: 'Invalid password',
        });
      }
    } catch (error) {
      console.error('Error creating agent:', error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Failed to create user',
      });
    }
  },

   //Realtor  Login Function
  loginRealtor: async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;

    try {
      const realtor = await agentRepository.getAgentByEmail(email);

      if (realtor && realtor.type !== 'AGENT' ) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: 'Realtors Login',
        });
      }
      
      if (!realtor) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          message: 'Invalid email or password',
        });
      }


      const isPasswordValid = await comparePassword(password, realtor.password);

      if (!isPasswordValid) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          message: 'Invalid email or password',
        });
      }

      // Generate a JWT token
      const token = jwt.sign(
        {
         
          type: realtor.type,
          agentId: realtor.id,
        },
        process.env.JWT_SECRET || '', // Provide a default value if process.env.JWT_SECRET is undefined
        { expiresIn: '1h' }
      );

      // Format the lastLogin value
      const formattedLastLogin = format(new Date(), 'yyyy-MM-dd HH:mm:ss');

      await agentRepository.updateAgentLastLogin(realtor.id, formattedLastLogin)

      return res.status(StatusCodes.OK).json({
        message: 'Login successfully',
        user: {
          id: realtor.id,
          email: realtor.email,
          number: realtor.number,
          type: realtor.type,
          lastLogin: realtor.lastLogin,
        },
        token: token,
      });
    } catch (error) {
      console.error('Error during login:', error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Failed to login',
      });
    }
  },
};

export default agentController;
