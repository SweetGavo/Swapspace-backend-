import prisma from '../DB/prisma';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import favoriteRepository from '../respository/favoriteRepository';
import Joi from 'joi';

const favoriteSchema = Joi.object({
  userId: Joi.string().required(),
  propertyId: Joi.string().required(),
});
const favouriteController = {
  getAllFavourites: async (req: Request, res: Response) => {
    try {
      const favourites = await prisma.favorite.findMany();
      res.status(StatusCodes.OK).json(favourites);
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: 'An error occurred while retrieving favourites.' });
    }
  },

  createFavourite: async (req: Request, res: Response) => {
    try {
      const favorites = await favoriteRepository.getAllFavorites();
      res.status(StatusCodes.OK).json(favorites);
    } catch (error) {
      console.error('Error getting favorites:', error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: 'An error occurred while retrieving favorites.',
      });
    }
  },

  getFavouriteById: async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    try {
      const favorite = await favoriteRepository.getFavoriteById(id);

      if (!favorite) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ error: 'Favorite not found.' });
      } else {
        return res.json(favorite);
      }
    } catch (error) {
      console.error('Error getting the favorite:', error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: 'An error occurred while retrieving the favorite.' });
    }
  },

  updateFavourite: async (req: Request, res: Response) => {
    const  id  = parseInt(req.params.id) as number;
    const { userId, propertyId } = req.body;

    try {
      const favorite = await favoriteRepository.updateFavorite(
        id,
        userId,
        propertyId
      );
      res.status(StatusCodes.OK).json(favorite);
    } catch (error) {
      console.error('Error updating the favorite:', error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: 'An error occurred while updating the favorite.' });
    }
  },

  deleteFavourite: async (req: Request, res: Response) => {
    const id  = parseInt(req.params.id) as number;

  try {
    await favoriteRepository.deleteFavorite(id);
    res.status(StatusCodes.OK).json({ message: 'Favorite deleted successfully.' });
  } catch (error) {
    console.error('Error deleting the favorite:', error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'An error occurred while deleting the favorite.' });
  }
  },
};

export default favouriteController;
