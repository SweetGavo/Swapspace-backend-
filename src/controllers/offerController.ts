import { Request, Response } from "express";
import prisma from "../DB/prisma";

import { StatusCodes } from "http-status-codes";

const offersControllers = {
  addOffers: async (req: Request, res: Response) => {
    const { userId, propertyId } = req.body;

    const checkUserId = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!checkUserId) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "User not found",
      });
    }
    //TODO:
    // Send mail notification and inapp notification

    const offer = await prisma.offers.create({
      data: {
        userId,
        propertyId,
      },
    });

    return res.status(StatusCodes.CREATED).json({
      message: "offer created",
      offer: offer,
    });
  },
  getAllOffers: async (req: Request, res: Response): Promise<Response> => {
    const ITEMS_PER_PAGE = 10;
    const page = parseInt(req.query.page as string) || 1;

    const skip = (page - 1) * ITEMS_PER_PAGE;

    const offers = await prisma.offers.findMany({
      skip: skip,
      take: ITEMS_PER_PAGE,
    });

    const totalCount = await prisma.offers.count();

    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

    return res.status(StatusCodes.OK).json({
      count: offers.length,
      offers: offers,
      currentPage: page,
      totalPages: totalPages,
    });
  },
  getAllOffersByUser: async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const { id } = req.params;

    const userOffers = await prisma.offers.findMany({
      where: {
        userId: id,
      },
    });

    if (userOffers.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "No offers found for the user",
      });
    }

    return res.status(StatusCodes.OK).json({
      message: "Fetched offers",
      count: userOffers.length,
      data: userOffers,
    });
  },

  getAllOffersRealtor: async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const { id } = req.params;

    const userOffers = await prisma.offers.findMany({
      where: {
        property: {
          realtorId: id,
        },
      },
    });

    if (userOffers.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "No offers found for the realtor",
      });
    }

    return res.status(StatusCodes.OK).json({
      message: "Fetched offers",
      count: userOffers.length,
      data: userOffers,
    });
  },

  acceptOffersByRealtor: async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const { offerId } = req.params;

    const updateResponse = await prisma.offers.update({
      where: {
        id: offerId,
      },
      data: {
        status: "ACCEPTED",
      },
    });

    if (!updateResponse) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Offer not found",
      });
    }

    //TODO: Send a notification and email notification
    return res.status(StatusCodes.OK).json({
      message: "Offer accepted",
      updatedOffer: updateResponse,
    });
  },
};

export default offersControllers;
