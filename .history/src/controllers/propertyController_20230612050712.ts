import { Request, Response } from "express";
import prisma from "../DB/prisma";
import { StatusCodes } from "http-status-codes";

import propertySchema from "../utils/propertyValidation";
import { v2 as cloudinary } from "cloudinary";
import { string } from "joi";
import { id } from "date-fns/locale";

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
      const filters:any = {}
      const { for_Rent,
        for_Sale,
        Short_let,
        price_Range,
        area_Range,
        payment_frequency,
        property_type,
        specification,
        bedrooms,
        bathrooms,
        pets,
        renovation,
        views,
        proximity,
        add,Saved } = req.query
      
      if (for_Rent) filters.for_Rent = for_Rent;
      if (for_Sale) filters.for_Sale = for_Sale;
      if (Short_let) filters.Short_let = Short_let;
     

      if (price_Range) {
      const [minPrice, maxPrice] = (price_Range as string).split('-').map(Number);
      filters.price = {
        gte: minPrice,
        lte: maxPrice,
      };
      }
      
        switch (payment_frequency) {
          case 'Yearly':
            filters.payment_frequency = 'Yearly'
            break;
         case 'Monthly':
            filters.payment_frequency = 'Monthly'
            break;        
          default:
            filters.payment_frequency = 'Weekly'
            break;
        }
         
      if (property_type) {
        
        const property_type_options = {
           any_a: 'any',
          
            residential: {
            Residential: {
            Apartment:'Apartment',
            villa:'Villa',
            town_house:'Town house' ,
            petHouse: 'Pet house',
            residentialFloor: 'Residential',
            residentialPot:'residentialPot'
            
            }
          },
          commercial: {
            Commercial:{
              office: "Office",
              shops: 'Shops',
              warehouse: 'Warehouse',
              commertialvilla: 'Commertialvilla',
              commercial_floor: 'Commertialfloor',
              bulk_unit: 'Bulkunit',
              show_room:'showroom'
              
              
            }
          },
          short_let: {
            short_let: {
              apartment_hotel: 'Apartment hotel',
              residential_apartment:'Residential apartment'
            }
          }
        }
        filters.property_type = property_type_options
      }
      
      if (specification)  filters.specification = 'any' || 'Furnished' || 'UnFurnished'; 
      
      if (bedrooms) {
        let number = 1
        filters.bedrooms = number + 1
      }

      if (bathrooms) {
        let number = 0
        filters.bathrooms = number + 1
        filters.bathrooms++
      }


      if (pets) filters.pets = ['None', 'Cat', "Dogs", 'Bird'];

      if (renovation) filters.renovation = 'Yes' || 'No';
      
      if(views) filters.views = 'Views'
      if (proximity) filters.proximity = 'Proximity'
      

      if (add) {
        const addfilter = await prisma.property.create({
           data: filters
        })

        return res.status(StatusCodes.CREATED).json({
      message: "Filtered properties has been added",
      data: addfilter,
      })
      }

      if (Saved) {
        const { Interested, Connected, favortie, Declined } = req.query;
        const savedproperties = await prisma.property.findMany({
          select: {
            id: true,
            

            
          }
        })
      }
      
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
      const saved = {}
      const { Interested, Connected, Favorites, Declined } = req.query;
      if (Interested) {
        
      }


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
