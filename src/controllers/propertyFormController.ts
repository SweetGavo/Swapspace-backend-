import { Request, Response } from 'express';
import prisma from '../DB/prisma';
import { StatusCodes } from 'http-status-codes';

import propertyFormSchema from '../helpers/propertyFormValidation';
import { v2 as cloudinary } from 'cloudinary';
import landlordRepository from '../respository/propertyFormRepository';
import userRepository from '../respository/userRepository';
import { LandLordDataType } from '../helpers/types';
import realtorRepository from '../respository/realtorRepository';


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  timeout: 6000,
});

const propertyFormController = {
  addProperty: async (req: Request, res: Response): Promise<Response> => {
   
    try {
      const { error } = propertyFormSchema.validate(req.body);

      if (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: 'Invalid request body',
          error: error.details[0].message,
        });
      }

      const file = req.file;
      if (!file) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: 'Please provide all the required details and upload a document.',
        });
      }

      const {
        property_title,
        description,
        rent,
        property_type,
        structure,
        sale_or_rent_price,
        price_prefix,
        payment_frequency,
        payment_plan,
        video_url,
        video_url_tour,
        bedroom,
        bathroom,
        area_size,
        size_postfix,
        fire_place,
        entry_floor,
        parking_slot,
        parking_lot,
        year_built,
        building_unit,
        available,
        renovation,
        appliance,
        category,
        amenities,
        additional_details,
        location,
        emirate,
        proximity,
        street_Number,
        locality,
        postal_code,
        style,
        view,
        pet,
        specification,
        floor_plan,
        total_lessee,
        price,
        message,
        
        property_document
      } = req.body;

const userId =  parseInt(req.params.id, 10);

      const userexit = await userRepository.getUserId(userId);

      if (!userexit) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: 'User does not exist',
        });
      }

      const uploadedDocument = await cloudinary.uploader.upload(file.path);

      const newPropertyData: LandLordDataType = {
        property_title,
        description,
        rent,
        property_type,
        structure,
        sale_or_rent_price,
        price_prefix,
        payment_frequency,
        payment_plan,
        video_url,
        video_url_tour,
        bedroom,
        bathroom,
        area_size,
        size_postfix,
        fire_place,
        entry_floor,
        parking_slot,
        parking_lot,
        year_built,
        building_unit,
        available,
        renovation,
        appliance,
        category,
        amenities,
        additional_details,
        location,
        emirate,
        proximity,
        street_Number,
        locality,
        postal_code,
        style,
        view,
        pet,
        specification,
        floor_plan,
        total_lessee,
        price,
        message,
        property_document: [uploadedDocument.secure_url], // Convert it to an array of strings
        userId,
      };

      // TODO: NOTIFICATION TO ADMIN

      return res.status(StatusCodes.CREATED).json({
        message: 'Property Form has been submitted',
        data: newPropertyData,
      });
    } catch (error) {
      console.error('Error adding a property:', error);

      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Failed to submit property Form',
      });
    }
  },
  

  uploadImages: async (req: Request, res: Response): Promise<Response> => {
    try {
      const propertyId = parseInt(req.params.propertyId);

      // Check if the property exists
      const property = await landlordRepository.getPropertyById(propertyId);

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
      const updatedProperty = await landlordRepository.updatePropertyImages(
        propertyId,
        propertyImages
      );

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

  pairRealtorByAdmin: async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { propertyId, realtorId } = req.body;

      const checkProperty = await landlordRepository.getPropertyById(propertyId);
      if (!checkProperty) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: `Property not found` });
      }

      const checkRealtor = await realtorRepository.getOneRealtor(realtorId);
      if (!checkRealtor) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: `Realtor not found` });
      }

      const update = await landlordRepository.updatePropertyRealtor(propertyId, realtorId);
      if (!update) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: `Property not found` });
      }

      return res.status(StatusCodes.OK).json({ message: `Property has been matched` });
    } catch (error) {
      console.error('Error pairing realtor with property:', error);

      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Failed to pair realtor with property',
      });
    }
  },
  

  getListings: async (req: Request, res: Response): Promise<Response> => {
    try {
      const { realtorId } = req.params;

      const listings = await  landlordRepository
      .getListingsByRealtorId(parseInt(realtorId));

      if (listings.length === 0) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: 'No listings found for the specified realtor',
        });
      }

      return res.status(StatusCodes.OK).json({
        message: 'Listings retrieved successfully',
        data: listings,
      });
    } catch (error) {
      console.error('Error retrieving listings:', error);

      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Failed to retrieve listings',
      });
    }
  },
};

export default propertyFormController;
