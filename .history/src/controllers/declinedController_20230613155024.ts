import { Request, Response } from 'express';
import prisma from '../DB/prisma';
import { StatusCodes } from 'http-status-codes';



export const declinedController = {
 
    
    createDeclined: async (req: Request, res: Response) => {
        
        const { propertyId, userId } = req.body;
      
        try {
            const declined = await prisma.favorite.create({
                data: {
              
          }
      })      
        } catch (error) {
            
        }

     
    
    }




}

