import { Request, Response } from 'express';
import prisma from '../DB/prisma';
import { StatusCodes } from 'http-status-codes';



export const favoriteController = {
    getALLfavorites: async (req: Request, res: Response) => {
        const { Favorite } = req.query;
        try {
    
            if (Favorite) {
                const savedproperties = await prisma.favorite.findMany({
                    s
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
}
    

