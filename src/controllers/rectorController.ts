import { Request, Response } from 'express';
import prisma from '../DB/prisma';
import Joi from 'joi';
import { StatusCodes } from 'http-status-codes';



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
     broker_card_image:  Joi.array().items(Joi.string()).default([]),
     status: Joi.string(),
     image: Joi.string().allow('')

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
   
         const { userId, compant_name, address, broker_BRN, agent_ORN, years_of_experience, specialty, role, language, description, license_number, image, broker_card_image } = req.body;
   
         // Check if user exists
         const userExists = await prisma.user.findUnique({
           where: { id: userId },
         });
   
         if (!userExists) {
           return res.status(StatusCodes.BAD_REQUEST).json({
             message: 'User does not exist',
           });
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
             broker_card_image: ['', ''],
             userId,
             status: 'PENDING',
             image: ''
           },
         });
   
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
   };
   
   export default rectorController;