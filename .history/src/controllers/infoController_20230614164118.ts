import { Request, Response } from 'express';
import prisma from '../DB/prisma';
import { OK, StatusCodes } from 'http-status-codes';
import { STATUS_CODES } from 'http';

const infoController = {
  createMeeting: async (req: Request, res: Response): Promise<Response> => {
    const { title, event, event_link, date, time, teamId, realtorId } =
      req.body;

    try {
      const info = await prisma.info.create({
        data: {
          title,
          event,
          event_link,
          date,
          time,
          teamId,
          realtorId,
        },
      });

      return res
        .status(StatusCodes.CREATED)
        .json({ message: 'Task created successfully', info });
    } catch (error) {
      console.error('Error creating team task:', error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: 'Failed to create team task' });
    }
  },

  getallMeetings: async (req: Request, res: Response) => {
      try {
        const meetings = await prisma.info.findMany({
          
        })

        res.status(St)
      } catch (error) {
        
      }

  }
};

export default infoController;
