import prisma from '../DB/prisma';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

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
    const { userId, propertyId } = req.body;

    try {
      const newFavourite = await prisma.favorite.create({
        data: {
          userId,
          propertyId,
        },
      });

      res.status(StatusCodes.CREATED).json(newFavourite);
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: 'An error occurred while creating the favourite.' });
    }
  },

  getFavouriteById: async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const favourite = await prisma.favorite.findUnique({
        where: { id },
      });

      if (!favourite) {
        res
          .status(StatusCodes.NOT_FOUND)
          .json({ error: 'Favourite not found.' });
      } else {
        res.json(favourite);
      }
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: 'An error occurred while retrieving the favourite.' });
    }
  },

  updateFavourite: async (req: Request, res: Response) => {
    const { id } = req.params;
    const { userId, propertyId } = req.body;

    try {
      const favourite = await prisma.favorite.update({
        where: { id },
        data: {
          userId,
          propertyId,
        },
      });

      res.status(StatusCodes.OK).json(favourite);
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: 'An error occurred while updating the favourite.' });
    }
  },

  deleteFavourite: async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      await prisma.favorite.delete({
        where: { id },
      });

      res
        .status(StatusCodes.OK)
        .json({ message: 'Favourite deleted successfully.' });
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: 'An error occurred while deleting the favourite.' });
    }
  },
};

export default favouriteController;
