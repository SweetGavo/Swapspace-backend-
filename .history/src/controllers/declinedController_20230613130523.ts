import { Request, Response } from 'express';
import prisma from '../DB/prisma';
import { StatusCodes } from 'http-status-codes';



export const declinedController = {
      
    createdeclinedProperties: async (req: Request, res: Response) => {
        
        try {
            const { id, userID, propertyId, property, Interested } = req.body;
             const checkfavorite = await prisma.favorite.findUnique({
             where: {
                id:userID
             }
         })
            
          if (!checkfavorite) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: "Declined property does not exist",
        });
          }
            
            if (!Interested) {
                  const favoriteproperties = await prisma.favorite.create({
                    data: {
                        id,
                        userID,
                        propertyId,
                        property
                    }
                });
                return res.status(StatusCodes.CREATED).json({
                  message: "declinedProperty has been added",
                  data: favoriteproperties,
                });
            }
        }
        catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Failed to add a declinedproperty",
      });
        }
    },

      getAlldeclinedProperties: async (req:Request, res:Response) => {
        const { declined } = req.params;
        
          try {     
              
            if (declined) {
                const declinedproperties = await prisma.declined.findMany({
                   select: {
                        propertyId: true,
                        userID:true
                    }
                })
                
           return res.status(StatusCodes.CREATED).json({
               message: "Declined properties",
               data:declinedproperties
      });
            }
        } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Failed to add a property",
      });
              
        }

        
    },

    getSingledeclinedProperty: async (req: Request, res: Response) => {
        try {
      const { id } = req.params;

      const declinedproperties = await prisma.declined.findFirst({
          where: {
         id:id
        },
      });

      if (!declinedproperties) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: " declined Property not found",
        });
      }

      return res.status(StatusCodes.OK).json({
        message: "fetched declined properties",
        data: declinedproperties,
      });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Failed to get declined properties",
      });
    }
  },
    deletedeclinedProperty: async (req: Request, res: Response) => {    
        const declinedPropertyId = req.params.favortiePropertyId;
          try {
             const deletefavortieProperty = await prisma.favorite.delete({
                 where: {
                     id: favortiePropertyId
                 }
             })
             return res.status(StatusCodes.OK).json({
              message: "Profile and associated properties deleted successfully.",
              deletefavortieProperty,
            });
         
         
     } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Failed to delete profile and associated properties.",
      });
     }

    },

    updateDeclinedProperty: async (req: Request, res: Response) => {
        try {
            const FavoritePropertyId = req.params.FavoritePropertyId;
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


