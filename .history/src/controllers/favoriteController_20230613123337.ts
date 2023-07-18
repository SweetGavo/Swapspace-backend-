import { Request, Response } from 'express';
import prisma from '../DB/prisma';
import { StatusCodes } from 'http-status-codes';





export const favoriteController = {

    createFavorite: async (req: Request, res: Response) => {
        try {
         
            const { id, title, type, price } = req.body
         const checkfavorite = await prisma.favorite.findUnique({
             where: {
                id:id
             }
         })
         const favoriteproperties = await prisma.favorite.create({
             data:({})
         });

         
     } catch (error) {
        
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
   


    },

    deletefavortieProperty: async (req: Request, res: Response) => {    
        const favortiePropertyId = req.params.favortiePropertyId;
     try {
         await prisma.$transaction(async (prisma: any) => {
             const deletefavortieProperty = await prisma.favorite.delete({
                 where: {
                     id: favortiePropertyId
                 }
             })
             return res.status(StatusCodes.OK).json({
              message: "Profile and associated properties deleted successfully.",
              deletefavortieProperty,
            });
         });
         
     } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Failed to delete profile and associated properties.",
      });
     }

    }
}
    

