import { Request, Response } from 'express';
import prisma from '../DB/prisma';
import { StatusCodes } from 'http-status-codes';
import { tr } from 'date-fns/locale';
import { string } from 'joi';



const declinedController = {
    getAlldeclinedProperties: async (req:Request, res:Response) => {
        const { Declined } = req.query;
        
          try {
              let delineditem:any = {
                  id: string,
                  

              }
            if (Declined) {
                

            }
        } catch (error) {
            
        }

        
    }


}