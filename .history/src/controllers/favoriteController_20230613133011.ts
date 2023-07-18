import { Request, Response } from 'express';
import prisma from '../DB/prisma';
import { StatusCodes } from 'http-status-codes';





export const favoriteController = {

    createFavorite: async (req: Request, res: Response) => {
        try {
         
        const { id, userID,propertyId,property } = req.body
         const checkfavorite = await prisma.favorite.findUnique({
             where: {
                id:userID
             }
         })
            
          if (!checkfavorite) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: "Favorite property does not exist",
        });
      }
         const favoriteproperties = await prisma.favorite.create({
             data: {
                 id,
                 userID,
                 propertyId,
                 property
             }
         });
      return res.status(StatusCodes.CREATED).json({
        message: "favoriteProperty has been added",
        data: favoriteproperties,
      });
         
     } catch (error) {
         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Failed to add a Favoriteproperty",
      });
     }   

     },


    getALLfavorites: async (req: Request, res: Response) => {
        const { favorite } = req.params;
        try {
          if (favorite) {
                const favoriteproperties = await prisma.favorite.findMany({
                    select: {
                        propertyId: true,
                        userID:true
                    }
                })
                return res.status(StatusCodes.OK).json({
                    count: favoriteproperties.length,
                  data:  favoriteproperties,
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
    

