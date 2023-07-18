import { Request, Response } from 'express';
import prisma from '../DB/prisma';
import { StatusCodes } from 'http-status-codes';



export const favoriteController = {
    getALLfavorites: async (req: Request, res: Response) => {
        const { favorite } = req.query;
        try {
    
            if (favorite) {
                const savedproperties = await prisma.favorite.findMany({
                    select: {
                    propertyId : 
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
    },


    getsinglefavoriteproperty: async (req: Request, res: Response) => {
        const { id } = req.query
    
        try {
            if (id) {
                const singlefavorite = prisma.favorite.findMany({
                    select: {
                        id: true,
                       
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
}
    

