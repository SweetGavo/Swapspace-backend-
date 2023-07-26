import prisma from '../DB/prisma';
import { FavortiteDataType } from '../helpers/types';

const favoriteRepository = {
  createFavourite: async (favortiteDataType: FavortiteDataType) => {
    try {
      const favorite = await prisma.favorite.create({
        data: favortiteDataType,
      });
      return favorite;
    } catch (error) {
      console.error('Error adding a favorite property:', error);
      throw new Error('Failed to add a favorite property');
    }
  },
  getAllFavorites: async () => {
    try {
      const favorites = await prisma.favorite.findMany();
      return favorites;
    } catch (error) {
      console.error('Error retrieving favorites:', error);
      throw error;
    }
  },

  getFavoriteById: async (id: number) => {
    try {
      const favorite = await prisma.favorite.findUnique({
        where: { id },
      });
      return favorite;
    } catch (error) {
      console.error('Error retrieving the favorite:', error);
      throw error;
    }
  },
  updateFavorite: async (id: number, userId: number, propertyId: number) => {
    try {
      const favorite = await prisma.favorite.update({
        where: { id },
        data: {
          userId,
          propertyId,
        },
      });
      return favorite;
    } catch (error) {
      console.error('Error updating the favorite:', error);
      throw error;
    }
  },

  deleteFavorite: async (id:number) => {
     try {
       await prisma.favorite.delete({
         where: { id },
       });
     } catch (error) {
       console.error('Error deleting the favorite:', error);
       throw error;
     }
   }
};

export default favoriteRepository;
