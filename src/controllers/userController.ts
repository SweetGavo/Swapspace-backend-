import prisma from '../DB/prisma';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';


   const userController = {
     getAllUsers: async (req: Request, res: Response) => {
          try {
               const users = await prisma.user.findMany({
                       select: {
                              id: true,
                              number: true,
                              email: true,
                              type: true,
                              
                            },
               }); // Fetch all users from the database using Prisma
               
               res.status(StatusCodes.OK).json({
                    count: users.length,
                    users
               }); // Send the users as a JSON response
             } catch (error) {
               console.error('Error retrieving users:', error);
               res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to retrieve users' });
             }
           } ,

           getAgentUsers: async (req: Request, res: Response) => {
               try {
                    const agents = await prisma.user.findMany({
                         where:{
                              type: 'AGENT'
                         },
                         select: {
                              id: true,
                              number: true,
                              email: true,
                              type: true,
                              
                            },
                    }); 
                    
                    res.status(StatusCodes.OK).json({
                         count: agents.length,
                         user: agents
                    }); // Send the users as a JSON response
                  } catch (error) {
                    console.error('Error retrieving users:', error);
                    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to retrieve users' });
                  }
                } 
     }
   

     export default userController;