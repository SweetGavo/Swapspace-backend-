import { Request, Response } from 'express';
import prisma from '../DB/prisma';
import { StatusCodes } from 'http-status-codes';
import { tr } from 'date-fns/locale';



const declinedController = {
    getAlldeclinedProperties: async (req:Request, res:Response) => {
        const { Declined } = req.query;
        
          try {
              let delineditem = {
                  id: any,
                  
              }
            if (Declined) {
                

            }
        } catch (error) {
            
        }

        
    }


}