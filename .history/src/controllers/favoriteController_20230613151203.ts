import { Request, Response } from 'express';
import prisma from '../DB/prisma';
import { StatusCodes } from 'http-status-codes';





export const favoriteController = {

    createFavorite: async (req: Request, res: Response) => {
        try {
         
            const favorites = await prisma.favorite.findMany();
          return res.status(StatusCodes.OK).json({
          message: "favorite propert",
          data: favorites,
      });
         
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
                .json({ error: "AN error " });
        }
    },


    getsinglefavoriteproperty: async (req: Request, res: Response) => {
        const { id } = req.params
    
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
    

