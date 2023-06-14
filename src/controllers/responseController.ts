import { Request, Response } from 'express';
import prisma from '../DB/prisma';
import { StatusCodes } from 'http-status-codes';

const responseController = {
  addResponse: async (req: Request, res: Response): Promise<Response> => {
    const { taskId, contacts, note, outcome, amount } = req.body;

    const checktaskId = await prisma.task.findFirst({
      where: {
        id: taskId,
      },
    });

    if (!checktaskId) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: 'Task not found',
      });
    }

    const response = await prisma.response.create({
      data: {
        taskId,
        contacts,
        note,
        outcome,
        amount
      },
    });
    
    return res.status(StatusCodes.CREATED).json(response);
  },
};

export default responseController;
