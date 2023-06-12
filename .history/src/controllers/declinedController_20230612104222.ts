import { Request, Response } from 'express';
import prisma from '../DB/prisma';
import { StatusCodes } from 'http-status-codes';
import { tr } from 'date-fns/locale';
import { string } from 'joi';
import { Prisma } from '@prisma/client';



export const declinedController = {
    getAlldeclinedProperties: async (req:Request, res:Response) => {
        const { Declined } = req.query;
        
          try {
              const delineditem:any = []               
              
            if (Declined) {
                const item = prisma.declined.findMany({
                    select: {
                        id: true,
                        property_name: true,
                        property_type: true,
                        description:true
                  }
              }) 
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

      const property = await prisma.declined.findFirst({})

      if (!property) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: "Property not found",
        });
      }

      return res.status(StatusCodes.OK).json({
        message: "Fatched",
        property,
      });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Failed to fatch property",
      });
    }
  },



    }


