import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import userRepository from '../respository/userRepository';

const userController = {
  getAllUsers: async (req: Request, res: Response) => {
    const users = await userRepository.getAllUsers();

    if (!users || users.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'No users found' });
    }

    res.status(StatusCodes.OK).json({
      count: users.length,
      users,
    });
  },
  



  getUsersWhichAreUsers: async (req: Request, res: Response) => {
    try {
      const users = await userRepository.getUsersWhichAreUsers();

      res.status(StatusCodes.OK).json({
        count: users.length,
        users,
      });
    } catch (error) {
      console.error('Error retrieving users:', error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to retrieve users' });
    }
  },

  getOneUser: async (req: Request, res: Response): Promise<Response> => {
    try {
      const  id  = parseInt(req.params.id);

      const oneUser = await userRepository.getOneUser(id);

      if (!oneUser) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: 'User not found',
        });
      }
      return res.status(StatusCodes.OK).json({
        user: oneUser,
      });
    } catch (error) {
      console.error('Error retrieving user:', error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to retrieve user' });
    }
  },


 
  getUsertAggregate: async (req: Request, res: Response) => {
    try {
      const userCount = await userRepository.getUserCount();

      res.status(StatusCodes.OK).json({
        message: 'User count retrieved successfully',
        count: userCount,
      });
    } catch (error) {
      console.error('Error retrieving users:', error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Failed to retrieve user count',
      });
    }
  },

  blockUser: async (req: Request, res: Response): Promise<Response> => {
    const { userId } = req.body;
    try {
      await userRepository.blockUser(userId);

      return res.status(StatusCodes.OK).json({ message: 'User blocked successfully' });
    } catch (error) {
      console.error(error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Failed to block user' });
    }
  },

  unBlockUser: async (req: Request, res: Response): Promise<Response> => {
    const { userId } = req.body;
    try {
      await userRepository.unBlockUser(userId);

      return res.status(StatusCodes.OK).json({ message: 'User unblocked successfully' });
    } catch (error) {
      console.error(error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Failed to unblock user' });
    }
  },
};

export default userController;
