import { Request, Response } from 'express';
import prisma from '../DB/prisma';
import { StatusCodes } from 'http-status-codes';



const getALLfavorites = async (req: Request, res: Response) => {
    const { Favorite } = req.query;
    try {
    
        if (Favorite) {
            const savedproperties = await prisma.property.findMany({
                select: {
                    id: true,
                    property_title: true,
                    property_type: true,
                    property_price: true
                }
            })
            return res.status(StatusCodes.OK).json({
                count: savedproperties.length,
                savedproperties,
            });
        }
    
    }
 catch (error) {
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
         message: "No favorites added",
        }

    

}