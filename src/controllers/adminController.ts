import { Request, Response } from 'express';
import prisma from '../DB/prisma';
import { StatusCodes } from 'http-status-codes';
import { hashPassword, comparePassword } from '../utils/password';
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import validatePasswordString from '../utils/passwordValidator';

const adminSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const adminController = {
  createAdmin: async (req: Request, res: Response): Promise<Response> => {
    const { error } = adminSchema.validate(req.body);

    if (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Invalid request body',
        error: error.details[0].message,
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const { email, password } = req.body;

    // Check if email is valid
    if (!email.match(emailRegex)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Invalid email address',
      });
    }

    const emailAlreadyExists = await prisma.admin.findFirst({
      where: { email },
    });
    if (emailAlreadyExists) {
      return res.status(StatusCodes.CONFLICT).json({
        message: 'Email already exists',
      });
    }

    const passwordValidationResult = validatePasswordString(password);
    if (typeof passwordValidationResult !== 'boolean') {
      return res.status(StatusCodes.BAD_REQUEST).json(passwordValidationResult);
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    if (passwordValidationResult) {
      const admin = await prisma.admin.create({
        data: {
          email,
          password: hashedPassword,
        },
      });

      return res.status(StatusCodes.OK).json({
        message: `Admin created successfully`,
        admin: {
          id: admin.id,
          email: admin.email,
          type: admin.type,
        },
      });
    } else {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Invalid password',
      });
    }
  },

  logInAdmin: async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;

    const admin = await prisma.admin.findFirst({ where: { email: email } });

    if (!admin) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: 'Invalid email or password',
      });
    }

    const isPasswordValid = await comparePassword(password, admin.password);

    if (!isPasswordValid) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: 'Invalid email or password',
      });
    }

    // Generate a JWT token

    console.log(process.env.JWT_SECRET);

    const token = jwt.sign(
      { userId: admin.id, type: admin.type },
      process.env.JWT_SECRET || '', // Provide a default value if process.env.JWT_SECRET is undefined
      { expiresIn: '1h' }
    );

    return res.status(StatusCodes.OK).json({
      message: 'Login successful',
      admin: {
        id: admin.id,
        email: admin.email,
        type: admin.type,
      },
      token: token,
    });
  },
};

export default adminController;
