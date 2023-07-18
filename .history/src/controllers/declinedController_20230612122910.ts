import { Request, Response } from 'express';
import prisma from '../DB/prisma';
import { StatusCodes } from 'http-status-codes';



export const declinedController = {
    getAlldeclinedProperties: async (req:Request, res:Response) => {
        const { Declined } = req.query;
        
          try {
              const delineditem:any = []               
              
            if (Declined) {
                const item = prisma.declined.fin
           const declinedproperties = (await item).push(delineditem);
           return res.status(StatusCodes.CREATED).json({
           message: "All Declined properties",
           data: declinedproperties,
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

      const declined = await prisma.declined.findFirst({
          where: {
          id: id,
        },
      });

      if (!declined) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: " declined Property not found",
        });
      }

      return res.status(StatusCodes.OK).json({
        message: "Fetched",
        declined,
      });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Failed to get declined properties",
      });
    }
  },



    }


