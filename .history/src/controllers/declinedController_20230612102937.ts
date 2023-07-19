import { Request, Response } from 'express';
import prisma from '../DB/prisma';
import { StatusCodes } from 'http-status-codes';
import { tr } from 'date-fns/locale';
import { string } from 'joi';



const declinedController = {
    getAlldeclinedProperties: async (req:Request, res:Response) => {
        const { Declined } = req.query;
        
          try {
              const delineditem:any = {                  
              }
            if (Declined) {
                const item = prisma.declined.findMany({
                  sl
              }) 

            }
        } catch (error) {
            
        }

        
    }


}