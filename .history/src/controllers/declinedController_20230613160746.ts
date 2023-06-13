import { Request, Response } from 'express';
import prisma from '../DB/prisma';
import { StatusCodes } from 'http-status-codes';



export const declinedController = {
 
    
    createDeclined: async (req: Request, res: Response) => {
        
        const { propertyId, userId } = req.body;
      
        try {
            const newdeclined = await prisma.declined.create({
                data: {
                    propertyId,
                    userId
                }
            })
            res.status(200).json(newdeclined)
        } catch (error) {
            res.send(500).json({message:"Failed to add favorite property"})
        }

     
    
    },

    getAlldeclined: async (req: Request, res: Response) => {
        try {
            const declined = await prisma.declined.findMany({});
            res.send(200).json(declined);

        } catch (error) {
            res.send(500).json({ error: "An error occured while retrieving declined" })

        }

    },


    getdeclinedById: async (req: Request, res: Response) => {
        
    const {id} = req.params
  
        try {
            const declined = await prisma.declined.findUnique({
                where
            })
        } catch (error) {
            
        }
        
    }




}

