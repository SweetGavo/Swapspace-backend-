import { Request, Response } from 'express';
import prisma from '../DB/prisma';
import { StatusCodes } from 'http-status-codes';

const taskConroller = {
  createTask: async (req: Request, res: Response): Promise<Response> => {
    const {
      title,
      action,
      assignee,
      collaborator,
      contact,
      description,
      start_date,
      due_date_and_time,
      closing_date_and_time,
    } = req.body;

    //checks or assign & collaborator
    const checkAssignee = await prisma.group.findFirst({
      where: {
        members: assignee,
      },
    });
    if (!checkAssignee)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: ` ${assignee} is not your member ` });

    const checkCollaborator = await prisma.group.findFirst({
      where: {
        members: collaborator,
      },
    });

    if (!checkCollaborator)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: ` ${checkCollaborator} is not your member ` });

    const task = await prisma.task.create({
      data: {
        title,
        action,
        assignee,
        collaborator,
        contact,
        description,
        start_date,
        due_date_and_time,
        closing_date_and_time,
      },
    });

    //  Notification or MAIL to assignee & collaborator

    TODO: return res.status(StatusCodes.CREATED).json({
      message: `Tasks created`,
      task: task,
    });
  },
};

export default taskConroller;
