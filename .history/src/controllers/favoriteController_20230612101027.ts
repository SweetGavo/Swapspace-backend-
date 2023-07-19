import { Request, Response } from 'express';
import prisma from '../DB/prisma';
import { StatusCodes } from 'http-status-codes';



export const getALLfavorites = async (req: Request, res: Response) => {
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
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Favorites not added..." });
    }
}


export const getsinglefavoriteproperty = async (req: Request, res: Response) => {
    const { id } = req.query
    

    try {
        if (id) {
        const singlefavorite = prisma.favorite.findMany({
            select: {
                id: true,
                    property_name: true,
                    property_type: true,
                    address: true
                   }
        })
            return res.status(StatusCodes.OK).json({
                count: (await singlefavorite).length,
                singlefavorite,
            });
            
    } 
    } catch (error) {
        return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Favorite items not found" });
    }
   


}

    

