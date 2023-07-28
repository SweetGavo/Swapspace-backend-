import { Request, Response } from 'express';
import prisma from '../DB/prisma';
import { StatusCodes } from 'http-status-codes';

import propertySchema from '../utils/propertyValidation';
import { v2 as cloudinary } from 'cloudinary';
import propertyRepository from '../respository/propertyRepository';
import realtorRepository from '../respository/realtorRepository';
import { PropertyDataType } from '../helpers/types';
//import { getOrSetCache, clearCache } from '../cache/redisClient';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

interface PropertyData {
  count: number;
  properties: Array<any>; // Adjust this type as per the structure of your properties array
}

// Function to fetch fresh data from the database
async function fetchData(): Promise<PropertyData> {
  const properties = await prisma.property.findMany();
  return { count: properties.length, properties };
}

const propertyController = {
  addProperty: async (req: Request, res: Response): Promise<Response> => {
    
    try {
      const { error } = propertySchema.validate(req.body);
  
      if (error) {
        return res.status(400).json({
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
        
        renovation,
        availablity,
        satus,
      } = req.body
       
      const realtorId = parseInt(req.params.realtorId, 10); 
      // Check if realtor exists
      const userExists = await realtorRepository.getOneRealtor(realtorId)
  
      if (!userExists) {
        return res.status(404).json({
          message: 'User does not exist',
        });
      }


      const propData: PropertyDataType = {
        
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
        renovation,
        availablity,
        satus,
      }
  
      const newProperty = await propertyRepository.addProperty(propData);
  
      return res.status(201).json({
        message: 'Property has been added',
        data: newProperty,
      });
    } catch (error) {
      console.error('Error adding a property:', error);
  
      return res.status(500).json({
        message: 'Failed to add a property',
      });
    }
        

     
  },

  // Usage in getAllProperty function
  getAllProperty: async (req: Request, res: Response): Promise<Response> => {
    try {
      // const cacheKey = 'allProperties';

      // const cachedData = (await getOrSetCache(
      //   cacheKey,
      //   fetchData
      // )) as PropertyData; // Type assertion

      // if (cachedData.properties.length === 0) {
      //   // The cache is empty, so fetch fresh data from the database
      //   const freshData = await fetchData();

      //   // Store the fresh data in the cache
      //   await getOrSetCache(cacheKey, () => freshData);

      //   // Return the fresh data
      //   return res.status(StatusCodes.OK).json(freshData);
      // } else {
      //   // The cache is not empty, so return the cached data
      //   return res.status(StatusCodes.OK).json(cachedData);
      // }

      
        const properties = await propertyRepository.getAllProperties();
    
        if (properties.length === 0) {
          return res.status(StatusCodes.NOT_FOUND).json(`properties not found`);
        }
    
        return res.status(StatusCodes.OK).json(properties);
      } catch (error) {
        console.error('Error retrieving properties:', error);
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ error: 'Failed to retrieve properties' });
      }
  },

   uploadImages: async (req: Request, res: Response) => {
    try {
      const propertyId = parseInt(req.params.propertyId);
  
      // Check if the property exists
      const property = await propertyRepository.getPropertyById(propertyId);
  
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
      const updatedProperty = await propertyRepository.updatePropertyImages(propertyId, propertyImages);
  
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

   filterProperties: async (req: Request, res: Response) => {
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
  
    const filters: any = {
      // Apply your filters here based on the query parameters
    };
  
    try {
      const totalProperty = await propertyRepository.getTotalFilteredProperties(filters);
      const totalPages = Math.ceil(totalProperty / ITEMS_PER_PAGE);
  
      const properties = await propertyRepository.getFilteredProperties(filters, skip, ITEMS_PER_PAGE);
  
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
    const  id  = parseInt(req.params.id);

    
  
    try {
      const property = await propertyRepository.getPropertyById(id)
  
      if (!property) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: 'Property not found',
        });
      }
  
      // const property = await getOrSetCache(id, async () => {
      //   const data = await prisma.property.findUnique({
      //     where: { id: id },
      //   });
      //   return data;
      // });

      // const property = await prisma.property.findUnique({
      //      where: { id: id },
      //     });
  
      return res.status(StatusCodes.OK).json({
        message: 'Fetched',
        property,
      });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Failed to fetch property',
      });
    }
  },
  

  deleteProperty: async (req: Request, res: Response) => {
    try {
      const  id  = parseInt(req.params.id);

      const deletedProperty =  propertyRepository.getPropertyById(id)

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
      const  id  = parseInt(req.params.id);

      const updatedProperty = await propertyRepository.updateProperty(id, req.body);
    
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
   
      const { userId, propertyId } = req.body;
    
      try {
        await propertyRepository.updateLeads(userId, propertyId);
    
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

  leads: async (req: Request, res: Response) => {
    const  realtorId  = parseInt(req.params.realtorId)
  
    try {
      const leads = await propertyRepository.getLeads(realtorId);
  
      return res.status(StatusCodes.OK).json({
        message: true,
        leads,
      });
    } catch (error) {
      console.error('Error fetching leads:', error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: 'Failed to fetch leads' });
    }
  }
};

export default propertyController;


