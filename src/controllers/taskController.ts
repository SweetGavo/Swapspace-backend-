import { Request, Response } from 'express';
import prisma from '../DB/prisma';
import { StatusCodes } from 'http-status-codes';
import createTaskSchema from '../utils/taskValidator'

const taskController = {
  createPersonalTask: async (req: Request, res: Response): Promise<Response> => {
      
    const { error, value } = createTaskSchema.validate(req.body);
  if (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: error.details[0].message });
  }


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


  getAllPersonalTasksByREaltor: async (req: Request, res: Response): Promise<Response> => {
    try {
      const  id  = parseInt(req.params.id);
      
      const tasks = await prisma.task.findMany({
        where: {
          realtorId: id,
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

  getTasksByAssigneeOrCollaborator: async (req: Request, res: Response): Promise<Response> => {
    try {
      //const  { assigneeId, collaboratorId } = req.query;
     const   id  = parseInt(req.params.id);

           
      
      const tasks = await prisma.task.findMany({
        where: {
          OR: [
            { assigneeId: id },
            { collaboratorId: id },
          ],
        },
      });

      let result = tasks.filter(t => t.assigneeId ===id || t.collaboratorId === id)
  
      if (!result || result.length === 0) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'Tasks not found' });
      }
  
      return res.status(StatusCodes.OK).json({
        message: 'Tasks found',
        result,
      });
    } catch (error) {
      console.error('Error fetching tasks:', error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Failed to fetch tasks' });
    }
  },
  
  
  


};

export default taskController;
