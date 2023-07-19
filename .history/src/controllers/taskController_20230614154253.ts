import { Request, Response } from 'express';
import prisma from '../DB/prisma';
import { StatusCodes } from 'http-status-codes';

const taskController = {
  createTask: async (req: Request, res: Response): Promise<Response> => {
    const {
      title,
      action,
      assignee,
      collaborator,
      number_of_deals,
      contact,
      description,
      start_date,
      due_date,
      due_time,
      closing_date,
      closing_time,
      realtorId,
    } = req.body;

    // Check if the specified realtor exists
    const existingRealtor = await prisma.realtor.findUnique({
      where: {
        id: realtorId,
      },
    });

    if (!existingRealtor) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: `Realtor with id ${realtorId} not found` });
    }
  

    
    

    const task = await prisma.task.create({
      data: {
        
        title,
        action,
        number_of_deals,
        contact,
        description,
        start_date,
        due_date,
        due_time,
        closing_date,
        closing_time,
        realtor: {
          connect: {
            id: realtorId,
          },
        },
        assignee: {
          connect: {
            id: assignee,
          },
        },
        collaborator: {
          connect: {
            id: collaborator,
          },
        },
      },
    });

    // TODO: Send notification or email to assignee & collaborator

    return res.status(StatusCodes.CREATED).json({
      message: 'Task created',
      task,
    });
  },
};

export default taskController;
