import { Request, Response } from "express";
import prisma from "../DB/prisma";
import { StatusCodes } from "http-status-codes";

import propertySchema from "../utils/propertyValidation";
import { v2 as cloudinary } from "cloudinary";

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
          message: "Invalid request body",
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
          message: "User does not exist",
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
        message: "Property has been added",
        data: newProperty,
      });
    } catch (error) {
      console.error("Error adding a property:", error);

      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Failed to add a property",
      });
    }
  },

  getAllProperty: async (req: Request, res: Response): Promise<Response> => {
    try {
      const properties = await prisma.property.findMany({});

      const filteredproperty = await prisma.p
      return res.status(StatusCodes.OK).json({
        count: properties.length,
        properties,
      });
       
    } catch (error) {
      console.error("Error retrieving users:", error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Failed to retrieve properties" });
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
          message: "Property not found",
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
        message: "Images have been uploaded",
        data: {
          image: updatedProperty.images,
        },
      });
    } catch (error) {
      console.error("Error uploading images:", error);

      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Failed to upload images",
      });
    }
  },

  getAllProperties: async (req: Request, res: Response) => {
    try {
      const properties = await prisma.property.findMany({});

      res.status(StatusCodes.OK).json({
        message: `fetched`,
        count: properties.length,
        data: properties,
      });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Failed to fatch properties",
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
          message: "Property not found",
        });
      }

      return res.status(StatusCodes.OK).json({
        message: "Fatched",
        property,
      });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Failed to fatch property",
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
        message: "Property deleted",
      });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Failed to delete property.",
      });
    }
  },

  updateProperty: async (req: Request, res: Response) => {
    try {
      const propertyId = req.params.propertyId;
      const updatedProperty = await prisma.property.update({
        where: {
          id: propertyId,
        },
        data: req.body,
      });

      return res.status(StatusCodes.OK).json({
        message: "Property updated successfully.",
        updatedProperty,
      });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Failed to update property.",
      });
    }
  },
};

export default propertyController;
