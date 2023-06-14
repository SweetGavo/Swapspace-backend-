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
        const meetings = await prisma.info.findMany({})
         
        if (!meetings) {
          return  res.status(StatusCodes.NOT_FOUND).json({
            message:"Meetings not found"
          })
        }

        return  res.status(StatusCodes.OK).json(meetings)

      } catch (error) {
         return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: 'Failed to fetch all groups', error: error })
      }

  },
   
  
  updateMeeting: async (req: Request, res: Response) => {
   try {
     const { meetingId } = req.params
    const { title, event, event_link, date, time } = req.body;
    const newMeeting = await prisma.info.update({
      where: {
        id: meetingId
      },
      data: {
        title: title,
        time: time,
        event: event,
        event_link: event_link,
        date:date,
           }
    })
    return res.status(StatusCodes.OK).json({ message: "Meeting updated successfully",newMeeting })

   } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Failed to update meeting.",
      });
   }
  },

  deleteMeeting: async (req: Request, res: Response) => {
    try {
      const meetingId = req.params.meetingId
      const deleteMeeting = await prisma.info.delete({
        wh
      })
    } catch (error) {
      
    }
  }
};

export default infoController;
