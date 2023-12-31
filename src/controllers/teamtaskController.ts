import { Request, Response } from 'express';
import prisma from '../DB/prisma';
import { StatusCodes } from 'http-status-codes';

const teamTaskController = {
  createTeamTask: async (req: Request, res: Response): Promise<Response> => {
    const {
      title,
      note,
      clue,
      break_down,
      contact,
      teamId,
      due_date,
      due_time,
      realtorId,
    } = req.body;

    try {
      const team = await prisma.team.findUnique({
        where: {
          id: teamId,
        },
      });

      if (!team) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: 'Team not found' });
      }

      const realtor = await prisma.realtor.findUnique({
        where: {
          id: realtorId,
        },
      });

      if (!realtor) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: 'Realtor not found' });
      }

      const teamTask = await prisma.teamTask.create({
        data: {
          title,
          note,
          clue,
          break_down,
          contact,
          teamId,
          due_date,
          due_time,
          realtorId,
        },
      });

      return res
        .status(StatusCodes.CREATED)
        .json({ message: 'Task created successfully', teamTask });
    } catch (error) {
      console.error('Error creating team task:', error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: 'Failed to create team task' });
    }
  },


  // Get all team tasks
 getAllTeamTasks: async (req: Request, res: Response): Promise<Response> => {
  try {
    const teamTasks = await prisma.teamTask.findMany();
    return res.status(StatusCodes.OK).json({ message: 'Team tasks found', teamTasks });
  } catch (error) {
    console.error('Error fetching team tasks:', error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Failed to fetch team tasks' });
  }
},

// Get all tasks by realtor
 getTasksByRealtor: async (req: Request, res: Response): Promise<Response> => {
  try {
    
    const  realtorId  = parseInt(req.params.realtorId);

    const tasks = await prisma.teamTask.findMany({
      where: {
        realtorId,
      },
    });

    if (!tasks || tasks.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'Tasks not found' });
    }

    return res.status(StatusCodes.OK).json({
      message: 'Tasks found',
      tasks,
    });
  } catch (error) {
    console.error('Error fetching tasks by realtor:', error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Failed to fetch tasks by realtor' });
  }
}

};

export default teamTaskController;
