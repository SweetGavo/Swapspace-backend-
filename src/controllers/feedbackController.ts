import { Request, Response } from 'express';
import prisma from '../DB/prisma';
import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';


import { SoftAuthenticatedRequest } from '../middleware/auth';

const createFeedbackSchema = Joi.object({
  contact_email: Joi.string().email().required(),
  contact_phone: Joi.string().required(),
  feedback: Joi.string().required(),
  nature: Joi.string().valid('SUGGESTION', 'COMPLAINT', 'OTHER'),
});

const feedbackController = {
  addFeedback: async (
    req: SoftAuthenticatedRequest,
    res: Response
  ): Promise<Response> => {
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      let userId = req.user?.id || 'anonymous';
      const { error } = createFeedbackSchema.validate(req.body);

      if (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: 'Invalid Feedback format',
          error: error.details.map(item => item.message).join('.\n'),
        });
      }
      const {
        contact_email,
        contact_phone,
        feedback: feedback_string,
        nature,
      } = req.body;
      // Check if email is valid
      if (!contact_email.match(emailRegex)) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: 'Invalid email address',
        });
      }

      const feedback = await prisma.feedback.create({
        data: { contact_email, contact_phone, feedback_string, nature, userId },
      });

      return res.status(StatusCodes.CREATED).json({
        message: 'Feedback saved successfully',
        feedbackId: feedback.id,
      });
    } catch (error) {
      console.log(error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Failed to create agent',
      });
    }
  },

    getFeedback: async (
    req: SoftAuthenticatedRequest,
    res: Response
  ): Promise<Response> => {
    try {
      let userId = req.user?.id || 'anonymous';
      // Check if email is valid
      let filters = req.query;
      const feedback = await prisma.feedback.findMany({});

      return res.status(StatusCodes.CREATED).json({
        feedback,
      });
    } catch (error) {
      console.log(error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Failed to create agent',
      });
    }
  },
};

export default feedbackController;
