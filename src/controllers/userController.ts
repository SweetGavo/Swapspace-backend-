import prisma from '../DB/prisma';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';

const userController = {
  getAllUsers: async (req: Request, res: Response) => {
<<<<<<< HEAD
    const users = await prisma.user.findMany({
      select: {
        id: true,
        number: true,
        email: true,
        type: true,
        profile: true,
        realtor: true,
      },
    });
=======
    try {
       
      const users = await prisma.user.findMany({
        select: {
          id: true,
          number: true,
          email: true,
          type: true,
          profile: true,
          realtor: true,
        },
      });
>>>>>>> 16df60584bcabcb4966e89d4a168459efc5b942b

    if (!users || users.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'No users found' });
    }

    res.status(StatusCodes.OK).json({
      count: users.length,
      users,
    });
  },


  getAgentUsers: async (req: Request, res: Response) => {
    try {
      const agents = await prisma.user.findMany({
        where: {
          type: 'AGENT',
        },
        select: {
          id: true,
          number: true,
          email: true,
          type: true,
          realtor: {
            select: {
              id: true,
              company_name: true,
              address: true,
              broker_BRN: true,
              agent_ORN: true,
              years_of_experience: true,
              specialty: true,
              role: true,
              language: true,
              description: true,
              license_number: true,
              broker_card_image: true,
              image: true,
              status: true,
            },
          },
        },
      });

      res.status(StatusCodes.OK).json({
        count: agents.length,
        user: agents,
      }); // Send the users as a JSON response
    } catch (error) {
      console.error('Error retrieving users:', error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: 'Failed to retrieve users' });
    }
  },

  getUsersWhichAreUsers: async (req: Request, res: Response) => {
    try {
      const users = await prisma.user.findMany({
        where: {
          type: 'USER',
        },
        select: {
          id: true,
          number: true,
          email: true,
          type: true,
          profile: {
            select: {
              fullname: true,
              address: true,
              image: true,
            },
          },
        },
      });

      const sanitizedUsers = users.map((user: any) => ({
        ...user,
        profile: user.profile ?? {
          fullname: null,
          address: null,
          image: null,
        },
      }));

      res.status(StatusCodes.OK).json({
        count: sanitizedUsers.length,
        users: sanitizedUsers,
      });
    } catch (error) {
      console.error('Error retrieving users:', error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: 'Failed to retrieve users' });
    }
  },

  getOneUser: async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;

      const oneUser = await prisma.user.findFirst({
        where: {
          id: id,
          type: 'USER',
        },
        select: {
          id: true,
          email: true,
          number: true,
          type: true,
          profile: true,
        },
      });

      if (!oneUser) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: 'User not found',
        });
      }
      return res.status(StatusCodes.OK).json({
        user: oneUser,
      });
    } catch (error) {
      console.error('Error retrieving users:', error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: 'Failed to retrieve user' });
    }
  },
  getOneAgent: async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;

      const oneAgent = await prisma.user.findFirst({
        where: {
          id: id,
          type: 'AGENT',
        },
        select: {
          id: true,
          email: true,
          number: true,
          type: true,
          realtor: true,
        },
      });

      if (!oneAgent) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: 'User not found',
        });
      }
      return res.status(StatusCodes.OK).json({
        user: oneAgent,
      });
    } catch (error) {
      console.error('Error retrieving users:', error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: 'Failed to retrieve user' });
    }
  },

  getAgentAggregate: async (req: Request, res: Response) => {
    try {
      const agentCount = await prisma.user.aggregate({
        where: {
          type: 'AGENT',
        },
        _count: true,
      });

      res.status(StatusCodes.OK).json({
        message: 'Agent users retrieved successfully',
        count: agentCount._count,
      });
    } catch (error) {
      console.error('Error retrieving agent :', error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Failed to retrieve agent users',
      });
    } finally {
      await prisma.$disconnect();
    }
  },
  getUsertAggregate: async (req: Request, res: Response) => {
    try {
      const agentCount = await prisma.user.aggregate({
        where: {
          type: 'USER',
        },
        _count: true,
      });

      res.status(StatusCodes.OK).json({
        message: 'Agent users retrieved successfully',
        count: agentCount._count,
      });
    } catch (error) {
      console.error('Error retrieving agent :', error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Failed to retrieve agent users',
      });
    } finally {
      await prisma.$disconnect();
    }
  },

  blockUser: async (req: Request, res: Response): Promise<Response> => {
    const { userId } = req.body;
    try {
      // Update the user's data and set blocked status
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { block: true },
      });

      return res
        .status(StatusCodes.OK)
        .json({ message: 'User blocked successfully', user: updatedUser });
    } catch (error) {
      console.error(error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: 'Failed to block user' });
    }
  },

  unBlockUser: async (req: Request, res: Response): Promise<Response> => {
    const { userId } = req.body;
    try {
      // Update the user's data and set blocked status
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { block: false },
      });

      return res
        .status(StatusCodes.OK)
        .json({ message: 'User unblocked successfully', user: updatedUser });
    } catch (error) {
      console.error(error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: 'Failed to unblock user' });
    }
  },
};

export default userController;
