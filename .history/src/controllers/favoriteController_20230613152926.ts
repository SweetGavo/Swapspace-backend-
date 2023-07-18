import { Request, Response } from 'express';
import prisma from '../DB/prisma';
import { StatusCodes } from 'http-status-codes';





export const favoriteController = {

    createFavorite: async (req: Request, res: Response) => {
        const { userId, propertyId } = req.body;

       try {
            const newfavorites = await prisma.favorite.create({
                data: {
                    userId,
                    propertyId,
             },
         })
           res.status(200).json(newfavorites);
     } catch (error) {
         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
         message: "Failed to add a Favoriteproperty",
      });
     }   

     },


    getAllfavorites: async (req: Request, res: Response) => {
        try {
            const favorites = await prisma.favorite.findMany({});
            res.status(200).json(favorites);
            }
        catch (error) {
            return res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ error: "An error occured while retrieving favorites" });
        }
    },


    getFavoriteById: async (req: Request, res: Response) => {
        const { id } = req.params
    
        try {
            const favorite = await prisma.favorite.findUnique({
                where: {
                    id
                }
            })
            if (!favorite) {
                res.status(404).json({error:"favorite not found"})
            } else {
                 res.status(200).json(favorite)
            }
        } catch (error) {
            return res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ error: "An error occured while retrieving the favorites" });
        }
    },



    deletefavortieProperty: async (req: Request, res: Response) => {    
        const favortiePropertyId = req.params.favortiePropertyId;
          try {
             const deletefavortieProperty = await prisma.favorite.delete({
                 where: {
                     id: favortiePropertyId
                 }
             })
             
         
     } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Failed to delete Favorite property.",
      });
     }

    },

    updateFavoriteProperty: async (req: Request, res: Response) => {
        const {userId , propertyId} = req.body
        const { id } = req.params
        try {
    const fav

        } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Failed to update FavoriteProperty.",
      });
        }
    }
}
    

