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
            const favorite = 
        } catch (error) {
            return res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ error: "Favorite items not found" });
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
             return res.status(StatusCodes.OK).json({
              message: "Favorite property deleted successfully.",
              deletefavortieProperty,
            });
         
         
     } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Failed to delete Favorite property.",
      });
     }

    },

    updateFavoriteProperty: async (req: Request, res: Response) => {
        try {
            const FavoritePropertyId = req.params.favoritePropertyId;
            const updateFavoriteProperty = await prisma.favorite.update({
                where: {
                    id:FavoritePropertyId
                },
                data: req.body
            })
          return res.status(StatusCodes.OK).json({
          message: "FavoriteProperty updated successfully.",
          updateFavoriteProperty,
      });

        } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Failed to update FavoriteProperty.",
      });
        }
    }
}
    

