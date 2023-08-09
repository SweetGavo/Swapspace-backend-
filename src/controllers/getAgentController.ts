import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';


import agentRepository from '../respository/agentRepository';




const getAgentController = {
     getAllAgent: async (req: Request, res: Response) => {
          try {
            const agents = await agentRepository.getAgents();

            if (!agents || agents.length === 0) {
               return res.status(StatusCodes.NOT_FOUND).json({ message: 'No agent found' });
             }
      
            res.status(StatusCodes.OK).json({
              count: agents.length,
              user: agents,
            });
          } catch (error) {
            console.error('Error retrieving agents:', error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to retrieve agents' });
          }
        }, 
        
        getOneAgent: async (req: Request, res: Response): Promise<Response> => {
          try {
            const  id  = parseInt(req.params.id);
      
            const oneAgent = await agentRepository.getAgentId(id);
      
            if (!oneAgent) {
              return res.status(StatusCodes.NOT_FOUND).json({
                message: 'Agent not found',
              });
            }
            return res.status(StatusCodes.OK).json({
              user: oneAgent,
            });
          } catch (error) {
            console.error('Error retrieving agent:', error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to retrieve agent' });
          }
        },
        getAgentAggregate: async (req: Request, res: Response) => {
          try {
            const agentCount = await agentRepository.getAgentCount();
      
            res.status(StatusCodes.OK).json({
              message: 'Agent users retrieved successfully',
              count: agentCount,
            });
          } catch (error) {
            console.error('Error retrieving agents:', error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
              message: 'Failed to retrieve agent users',
            });
          }
        },
      
      
        blockAgent: async (req: Request, res: Response): Promise<Response> => {
          const { userId } = req.body;
          try {
            await agentRepository.blockUser(userId);
      
            return res.status(StatusCodes.OK).json({ message: 'User blocked successfully' });
          } catch (error) {
            console.error(error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Failed to block user' });
          }
        },
      
        unBlockAgent: async (req: Request, res: Response): Promise<Response> => {
          const { userId } = req.body;
          try {
            await agentRepository.unBlockUser(userId);
      
            return res.status(StatusCodes.OK).json({ message: 'User unblocked successfully' });
          } catch (error) {
            console.error(error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Failed to unblock user' });
          }
        },
        
}


export default getAgentController;