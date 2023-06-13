import { Request, Response } from 'express';
import prisma from '../DB/prisma';
import { StatusCodes } from 'http-status-codes';



export const declinedController = {
      
    createdeclinedProperties: async (req: Request, res: Response) => {
        
        try {
            const {}
        } catch (error) {
            
        }
    },

      getAlldeclinedProperties: async (req:Request, res:Response) => {
        const { declined } = req.params;
        
          try {     
              
            if (declined) {
                const declinedproperties = await prisma.declined.findMany({
                   select: {
                        propertyId: true,
                        userID:true
                    }
                })
                
           return res.status(StatusCodes.CREATED).json({
               message: "Declined properties",
               data:declinedproperties
      });
            }
        } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Failed to add a property",
      });
              
        }

        
    },

    getSingledeclinedProperty: async (req: Request, res: Response) => {
        try {
      const { id } = req.params;

      const declinedproperties = await prisma.declined.findFirst({
          where: {
         id:id
        },
      });

      if (!declinedproperties) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: " declined Property not found",
        });
      }

      return res.status(StatusCodes.OK).json({
        message: "fetched declined properties",
        data: declinedproperties,
      });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Failed to get declined properties",
      });
    }
  },



    }


