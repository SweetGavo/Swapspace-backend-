import prisma from '../DB/prisma';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';

const WaitlistController = {
  createList: async (req: Request, res: Response) => {
    const { full_name, email } = req.body;

    const waitlist = await prisma.waitlist.create({
      data: {
        full_name,
        email,
      },
    });

    res.status(StatusCodes.CREATED).json({
      message: `Thank you for joining the waitlist`,
      waitlist,
    });
  },

  getAllList: async (req: Request, res: Response): Promise<Response> => {
    const waitlists = await prisma.waitlist.findMany();

    if (waitlists.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json(`No waitlists found`);
    }

    return res.status(StatusCodes.OK).json(waitlists);
  },
};

export default WaitlistController;
