import { Request, Response } from 'express';
import prisma from '../DB/prisma';

import { StatusCodes } from 'http-status-codes';

const offersControllers = {
  addOffer: async (req: Request, res: Response) => {
    const {
      propertyId,
      realtorId,
      client_name,
      property_title,
      property_type,
      listing_type,
      amount,
      progress,
      date,
      time,
    } = req.body;

    const offer = await prisma.offers.create({
      data: {
        propertyId,
        realtorId,
        client_name,
        property_title,
        property_type,
        listing_type,
        amount,
        progress,
        date,
        time,
      },
    });

    return res.status(StatusCodes.CREATED).json({
      message: 'offer created',
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

  getOneRealtorsOffers: async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const  id  = parseInt(req.params.id);

    const userOffers = await prisma.offers.findMany({
      where: {
        property: {
          agentId: id,
        },
      },
    });

    if (userOffers.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: 'No offers found for the realtor',
      });
    }

    return res.status(StatusCodes.OK).json({
      message: 'Fetched offers',
      count: userOffers.length,
      data: userOffers,
    });
  },

  updateOffer: async (req: Request, res: Response): Promise<Response> => {
   
    const  offerId  = parseInt(req.params.offerId);

    const updateResponse = await prisma.offers.update({
      where: {
        id: offerId,
      },
      data: req.body,
    });

    if (!updateResponse) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: 'Offer not found',
      });
    }

    return res.status(StatusCodes.OK).json({
      message: 'Offer  updated successfully',
      updatedOffer: updateResponse,
    });
  },

  getCheckoff: async (req: Request, res: Response): Promise<Response> => {
    const  offerId  = parseInt(req.params.offerId);


    const checkoff = await prisma.offers.findMany({
      where: {
        id: offerId,
        progress: "ACCEPTANCE" 

      }
    })

    if(checkoff.length == 0 ) {
       return res.status(StatusCodes.NOT_FOUND)
       .json({ message: 'No offers with checkoff found'})
    }

    return res.status(StatusCodes.OK)
    .json(checkoff)
  },
  getConnected: async (req: Request, res: Response): Promise<Response> => {
    const  offerId  = parseInt(req.params.offerId);

    const connected = await prisma.offers.findMany({
      where: {
        id: offerId,
        progress: "INQUIRY" || "NEGOTIATION"

      }
    })

    if(connected.length == 0 ) {
       return res.status(StatusCodes.NOT_FOUND)
       .json({ message: 'No offers with checkoff found'})
    }

    return res.status(StatusCodes.OK)
    .json(connected)
  },
  getClosed: async (req: Request, res: Response): Promise<Response> => {
    const  offerId  = parseInt(req.params.offerId);


    const sold = await prisma.offers.findMany({
      where: {
        id: offerId,
        progress: "SOLD"

      }
    })

    if(sold.length == 0 ) {
       return res.status(StatusCodes.NOT_FOUND)
       .json({ message: 'No offers with checkoff found'})
    }

    return res.status(StatusCodes.OK)
    .json(sold)
  }
};

export default offersControllers;
