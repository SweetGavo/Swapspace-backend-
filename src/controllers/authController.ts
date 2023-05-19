import { Request, Response } from 'express';
import prisma from '../DB/prisma';
import { PrismaClient, List_Types } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import { hashPassword, comparePassword } from '../utils/password';
import jwt from 'jsonwebtoken';
import Joi from 'joi';


const createUserSchema = Joi.object({
     email: Joi.string().email().required(),
     password: Joi.string().required(),
     number: Joi.string().required(),
});


const validatePasswordString = (password: string): any | Response => {
     const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;

     if (!password.match(regex)) {
          return {
               status: StatusCodes.BAD_REQUEST,
               message: 'Password must contain a capital letter, number, special character, and be between 8 and 20 characters long.',
          };
     }
     return true;
};


const authController = {
     createUser: async (req: Request, res: Response): Promise<Response> => {



          try {


               const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

               const { email, password, number, } = req.body;

               if (!email && !password && !number) {
                    res.status(StatusCodes.BAD_REQUEST).json({ 
                         message: "Provied all required fields"
                    });
               }
               // Check if email is valid
               if (!email.match(emailRegex)) {
                    return res.status(StatusCodes.BAD_REQUEST).json({
                         message: 'Invalid email address',
                    });
               }

               const emailAlreadyExists = await prisma.user.findUnique({ where: { email } });
               if (emailAlreadyExists) {
                    return res.status(StatusCodes.CONFLICT).json({
                         message: 'Email already exists',
                    });
               }
               // Check if number is unique
               const numberAlreadyExists = await prisma.user.findUnique({
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
          } catch (error) {
               console.log(error);

               return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                    message: 'Failed to create user',
               });
          }
     },



     loginUser: async (req: Request, res: Response): Promise<Response> => {
          const { email, password } = req.body;

          try {
               const user = await prisma.user.findUnique({ where: { email } });

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
                         email: user.email,
                         number: user.number,
                         type: user.type
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

               const emailAlreadyExists = await prisma.user.findUnique({ where: { email } });
               if (emailAlreadyExists) {
                    return res.status(StatusCodes.CONFLICT).json({
                         message: 'Email already exists',
                    });
               }
               // Check if number is unique
               const numberAlreadyExists = await prisma.user.findUnique({
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
                         type: List_Types.AGENT
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


};

export default authController;

