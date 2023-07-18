import { Request, Response } from 'express';
import prisma from '../DB/prisma';
import { StatusCodes } from 'http-status-codes';



const declinedController = {
    getAlldeclinedProperties: async (req:Request, res:Response) => {
        const {Declined} = req.query

        
    }


}