import { Request, Response } from 'express';
import prisma from '../DB/prisma';
import { StatusCodes } from 'http-status-codes';

import propertySchema from '../utils/propertyValidation';
import { v2 as cloudinary } from 'cloudinary';
import { PROPERTY_TYPES, Prisma } from '@prisma/client';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const propertyController = {
  addProperty: async (req: Request, res: Response): Promise<Response> => {
    try {
      const { error } = propertySchema.validate(req.body);

      if (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: 'Invalid request body',
          error: error.details[0].message,
        });
      }

      const {
        property_title,
        property_type,
        structure,
        listing_type,
        style,
        view,
        utility_payment,
        year_built,
        pets_allowed,
        available,
        sale_or_rent_price,
        price_prefix,
        payment_frequency,
        payment_plan,
        langitude,
        latitude,
        country,
        street_Number,
        locality,
        postal_code,
        logistics,
        parking_lot,
        parking_slots,
        fire_place,
        entry_floor,
        room_list,
        bedroom,
        bathroom,
        pool,
        building_unit,
        unit_amenities,
        specification,
        video_url,
        video_url_tour,
        utilities,
        date_posted,
        property_price,
        total_lessee,
        permit,
        description,
        additional_details,
        additional_facilities_and_amenities,
        proximate_landmark,
        realtorId,
      } = req.body;

      // Check if realtor exists
      const userExists = await prisma.realtor.findUnique({
        where: { id: realtorId },
      });

      if (!userExists) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: 'User does not exist',
        });
      }

      // Add the property
      const newProperty = await prisma.property.create({
        data: {
          property_type,
          property_title,
          structure,
          listing_type,
          style,
          view,
          utility_payment,
          year_built,
          pets_allowed,
          available,
          sale_or_rent_price,
          price_prefix,
          payment_frequency,
          payment_plan,
          langitude,
          latitude,
          country,
          street_Number,
          locality,
          postal_code,
          logistics,
          parking_lot,
          parking_slots,
          fire_place,
          entry_floor,
          room_list,
          bedroom,
          bathroom,
          pool,
          building_unit,
          unit_amenities,
          specification,
          video_url,
          video_url_tour,
          utilities,
          date_posted,
          property_price,
          total_lessee,
          permit,
          description,
          additional_details,
          additional_facilities_and_amenities,
          proximate_landmark,
          realtorId,
        },
      });

      return res.status(StatusCodes.CREATED).json({
        message: 'Property has been added',
        data: newProperty,
      });
    } catch (error) {
      console.error('Error adding a property:', error);

      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Failed to add a property',
      });
    }
  },

  getAllProperty: async (req: Request, res: Response): Promise<Response> => {
    try {
      const properties = await prisma.property.findMany();

      if (properties.length === 0) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: ' No properties found' });
      }

      return res.status(StatusCodes.OK).json({
        count: properties.length,
        properties,
      });
    } catch (error) {
      console.error('Error retrieving users:', error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: 'Failed to retrieve properties' });
    }
  },

  uploadImages: async (req: Request, res: Response): Promise<Response> => {
    try {
      const propertyId = req.params.propertyId;

      // Check if the property exists
      const property = await prisma.property.findUnique({
        where: { id: propertyId },
      });

      if (!property) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: 'Property not found',
        });
      }

      // Upload property images to Cloudinary
      const propertyImages: string[] = [];
      if (req.files && Array.isArray(req.files) && req.files.length > 0) {
        const uploadPromises = req.files.map((file: Express.Multer.File) =>
          cloudinary.uploader.upload(file.path)
        );
        const uploadedImages = await Promise.all(uploadPromises);
        propertyImages.push(...uploadedImages.map((image) => image.secure_url));
      }

      // Add the uploaded images to the property
      const updatedProperty = await prisma.property.update({
        where: { id: propertyId },
        data: {
          images: {
            push: propertyImages,
          },
        },
      });

      return res.status(StatusCodes.OK).json({
        message: 'Images have been uploaded',
        data: {
          image: updatedProperty.images,
        },
      });
    } catch (error) {
      console.error('Error uploading images:', error);

      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Failed to upload images',
      });
    }
  },

  filterProperties: async (req: Request, res: Response): Promise<Response> => {
    const {
      property_type,
      sale_or_rent_price,
      location,
      payment_frequency,
      specification,
      bedroom,
      bathroom,
      views,
      renovation,
      pets_allowed,
      proximate_landmark,
      limit,
    } = req.query;

    const ITEMS_PER_PAGE = 10;
    const page = parseInt(req.query.page as string) || 1;
    const skip = (page - 1) * ITEMS_PER_PAGE;

    const filters: any = {};

    if (sale_or_rent_price) {
      const [minPrice, maxPrice] = (sale_or_rent_price as string)
        .split('-')
        .map(Number)
        .toString();
      filters.price = {
        gte: minPrice,
        lte: maxPrice,
      };
    }

    if (sale_or_rent_price) {
      const price = parseInt(sale_or_rent_price as string, 10);
      filters.price = { equals: price };
    }

    if (bedroom) {
      filters.bedroom = parseInt(bedroom as string, 10).toString();
    }

    if (bathroom) {
      filters.bathroom = parseInt(bathroom as string, 10).toString();
    }

    if (property_type) {
      filters[PROPERTY_TYPES[property_type as keyof typeof PROPERTY_TYPES]] =
        true;
    }

    if (pets_allowed) {
      filters.pets_allowed = pets_allowed === 'yes' ? 'yes' : 'no';
    }

    if (payment_frequency) {
      filters.payment_frequency = parseInt(payment_frequency as string, 10);
    }

    if (renovation) {
      filters.renovation = renovation === 'yes' ? 'yes' : 'no';
    }

    if (proximate_landmark) {
      filters.proximate_landmark = parseInt(proximate_landmark as string, 10);
    }

    if (views) {
      filters.views = parseInt(views as string, 10);
    }

    if (specification) {
      filters.specification = specification;
    }

    if (location) {
      filters.location = parseInt(location as string, 10);
    }

    try {
      const totalProperty = await prisma.property.count({
        where: filters,
      });

      const totalPages = Math.ceil(totalProperty / ITEMS_PER_PAGE);

      const properties = await prisma.property.findMany({
        where: filters,
        skip: skip,
        take: ITEMS_PER_PAGE,
      });
      console.log(filters);
      return res.status(StatusCodes.OK).json({
        count: properties.length,
        properties,
        totalProperty,
        totalPages,
        currentPage: page,
      });
    } catch (error) {
      console.error('Error finding properties:', error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
        error: error,
      });
    }
  },

  getOneProperty: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const property = await prisma.property.findFirst({
        where: {
          id: id,
        },
      });

      if (!property) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: 'Property not found',
        });
      }

      return res.status(StatusCodes.OK).json({
        message: 'Fatched',
        property,
      });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Failed to fatch property',
      });
    }
  },

  deleteProperty: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const deletedProperty = await prisma.property.delete({
        where: {
          id: id,
        },
      });

      return res.status(StatusCodes.OK).json({
        message: 'Property deleted',
      });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Failed to delete property.',
      });
    }
  },

  updateProperty: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const updatedProperty = await prisma.property.update({
        where: {
          id: id,
        },
        data: req.body,
      });

      return res.status(StatusCodes.OK).json({
        message: 'Property updated successfully.',
        updatedProperty,
      });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Failed to update property.',
      });
    }
  },

  updateLeads: async (req: Request, res: Response): Promise<Response> => {
    try {
      const { userId, propertyId } = req.body;

      const checkUserId = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!checkUserId) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: 'User not found' });
      }

      const existingProperty = await prisma.property.findUnique({
        where: {
          id: propertyId,
        },
      });

      if (!existingProperty) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: 'Property not found' });
      }

      // Check if the user has already viewed the property
      const hasViewed = existingProperty.view_by_user.includes(userId);
      if (!hasViewed) {
        // Update the view_count and view_by_user fields
        const updateViewAndCount = await prisma.property.update({
          where: {
            id: propertyId,
          },
          data: {
            view_count: { increment: 1 },
            view_by_user: { push: userId },
          },
        });

        // TODO: Email & Notifications
      }

      return res.status(StatusCodes.OK).json({
        message: 'Property count has been updated',
      });
    } catch (error) {
      console.error('Error updating leads:', error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: 'Failed to update leads' });
    }
  },

  leads: async (req: Request, res: Response): Promise<Response> => {
    try {
      const { realtorId } = req.params;

      const realtorLeads = await prisma.property.findMany({
        where: {
          realtorId: realtorId,
        },
        select: {
          id: true,
          view_count: true,
          view_by_user: true,
        },
      });

      let result = realtorLeads.filter(
        (lead) => lead.view_count !== null || lead.view_by_user !== null
      );

      if (!realtorLeads || realtorLeads.length === 0) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: `Leads not found for the realtor`,
        });
      }

      return res.status(StatusCodes.OK).json({
        message: true,
        result,
      });
    } catch (error) {
      console.error('Error fetching leads:', error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: 'Failed to fetch leads' });
    }
  },
};

export default propertyController;
