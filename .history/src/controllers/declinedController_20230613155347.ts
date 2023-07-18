import { Request, Response } from 'express';
import prisma from '../DB/prisma';
import { StatusCodes } from 'http-status-codes';



export const declinedController = {
 
    
    createDeclined: async (req: Request, res: Response) => {
        
        const { propertyId, userId } = req.body;
      
        try {
            const declined = await prisma.favorite.create({
                data: {
                    propertyId,
                    userId
          }
            })      
            res.status(200).json(declined)
        } catch (error) {
            res.send(500).json({message:"Failed to add favorite property"})
        }

     
    
    },

    getAlldeclined: async (req: Request, res: Response) => {
        




        
    }




}

