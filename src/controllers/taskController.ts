import { Request, Response } from 'express';
import prisma from '../DB/prisma';
import { StatusCodes } from 'http-status-codes';

const taskController = {
  createTask: async (req: Request, res: Response): Promise<Response> => {
    const {
      title,
      action,
      assigneeId,
      collaboratorId,
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
  

    const data = {
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
      realtorId: realtorId,
      assigneeId: assigneeId || undefined,
      collaboratorId: collaboratorId || undefined
    };

    if (assigneeId) {
      data.assigneeId = assigneeId;
    }
  
    if (collaboratorId) {
      data.collaboratorId = collaboratorId;
    }
    

    const task = await prisma.task.create({
      data
    });

    // TODO: Send notification or email to assignee & collaborator

    return res.status(StatusCodes.CREATED).json({
      message: 'Task created',
      task,
    });
  },
  getAllTasks: async (req: Request, res: Response): Promise<Response> => {
    try {
      const tasks = await prisma.task.findMany();
      return res.status(StatusCodes.OK).json(tasks);
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Error retrieving tasks',
        error: error,
      });
    }
  },


  getAllTasksByREaltor: async (req: Request, res: Response): Promise<Response> => {
    try {
      const { realtorId } = req.params;
      
      const tasks = await prisma.task.findMany({
        where: {
          realtorId: realtorId,
        },
        include: {
          coRealtor: true,
          realtor: true,
          assignee: true,
          collaborator: true,
          responses: true,
        },
      });
      
      return res.status(StatusCodes.OK).json(tasks);
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Error retrieving tasks',
        error: error,
      });
    }
  },
  
  


};

export default taskController;
