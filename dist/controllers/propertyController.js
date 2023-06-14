"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../DB/prisma"));
const http_status_codes_1 = require("http-status-codes");
const propertyValidation_1 = __importDefault(require("../utils/propertyValidation"));
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});
const propertyController = {
    addProperty: async (req, res) => {
        try {
            const { error } = propertyValidation_1.default.validate(req.body);
            if (error) {
                return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                    message: "Invalid request body",
                    error: error.details[0].message,
                });
            }
            const { property_title, property_type, structure, listing_type, style, view, utility_payment, year_built, pets_allowed, available, sale_or_rent_price, price_prefix, payment_frequency, payment_plan, langitude, latitude, country, street_Number, locality, postal_code, logistics, parking_lot, parking_slots, fire_place, entry_floor, room_list, bedroom, bathroom, pool, building_unit, unit_amenities, specification, video_url, video_url_tour, utilities, date_posted, property_price, total_lessee, permit, description, additional_details, additional_facilities_and_amenities, proximate_landmark, realtorId, } = req.body;
            // Check if realtor exists
            const userExists = await prisma_1.default.realtor.findUnique({
                where: { id: realtorId },
            });
            if (!userExists) {
                return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                    message: "User does not exist",
                });
            }
            // Add the property
            const newProperty = await prisma_1.default.property.create({
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
            return res.status(http_status_codes_1.StatusCodes.CREATED).json({
                message: "Property has been added",
                data: newProperty,
            });
        }
        catch (error) {
            console.error("Error adding a property:", error);
            return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Failed to add a property",
            });
        }
    },
    getAllProperty: async (req, res) => {
        try {
            const properties = await prisma_1.default.property.findMany();
            if (properties.length === 0) {
                return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).
                    json({ message: " No properties found" });
            }
            return res.status(http_status_codes_1.StatusCodes.OK).json({
                count: properties.length,
                properties,
            });
        }
        catch (error) {
            console.error("Error retrieving users:", error);
            return res
                .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ error: "Failed to retrieve properties" });
        }
    },
    uploadImages: async (req, res) => {
        try {
            const propertyId = req.params.propertyId;
            // Check if the property exists
            const property = await prisma_1.default.property.findUnique({
                where: { id: propertyId },
            });
            if (!property) {
                return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                    message: "Property not found",
                });
            }
            // Upload property images to Cloudinary
            const propertyImages = [];
            if (req.files && Array.isArray(req.files) && req.files.length > 0) {
                const uploadPromises = req.files.map((file) => cloudinary_1.v2.uploader.upload(file.path));
                const uploadedImages = await Promise.all(uploadPromises);
                propertyImages.push(...uploadedImages.map((image) => image.secure_url));
            }
            // Add the uploaded images to the property
            const updatedProperty = await prisma_1.default.property.update({
                where: { id: propertyId },
                data: {
                    images: {
                        push: propertyImages,
                    },
                },
            });
            return res.status(http_status_codes_1.StatusCodes.OK).json({
                message: "Images have been uploaded",
                data: {
                    image: updatedProperty.images,
                },
            });
        }
        catch (error) {
            console.error("Error uploading images:", error);
            return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Failed to upload images",
            });
        }
    },
    filterProperties: async (req, res) => {
        try {
            const filters = {};
            const { for_Rent, for_Sale, Short_let, property_price, area_Range, payment_frequency, property_type, specification, bedrooms, bathrooms, pets, renovation, views, proximity, add, } = req.query;
            if (for_Rent)
                filters.for_Rent = for_Rent;
            if (for_Sale)
                filters.for_Sale = for_Sale;
            if (Short_let)
                filters.Short_let = Short_let;
            switch (payment_frequency) {
                case 'Yearly':
                    filters.payment_frequency = 'Yearly';
                    break;
                case 'Monthly':
                    filters.payment_frequency = 'Monthly';
                    break;
                default:
                    filters.payment_frequency = 'Weekly';
                    break;
            }
            if (property_type) {
                const propertyTypeOptions = {
                    any_a: 'any',
                    residential: {
                        Residential: {
                            Apartment: 'Apartment',
                            villa: 'Villa',
                            town_house: 'Town house',
                            petHouse: 'Pet house',
                            residentialFloor: 'Residential',
                            residentialPot: 'residentialPot',
                        },
                    },
                    commercial: {
                        Commercial: {
                            office: 'Office',
                            shops: 'Shops',
                            warehouse: 'Warehouse',
                            commertialvilla: 'Commertialvilla',
                            commercial_floor: 'Commertialfloor',
                            bulk_unit: 'Bulkunit',
                            show_room: 'Showroom',
                        },
                    },
                    short_let: {
                        short_let: {
                            apartment_hotel: 'Apartment hotel',
                            residential_apartment: 'Residential apartment',
                        },
                    },
                };
                filters.property_type = propertyTypeOptions;
            }
            if (specification)
                filters.specification = ['any', 'Furnished', 'UnFurnished'];
            if (bedrooms) {
                filters.bedrooms = parseInt(bedrooms) + 1;
            }
            if (bathrooms) {
                filters.bathrooms = parseInt(bathrooms) + 1;
            }
            if (pets)
                filters.pets = ['None', 'Cat', 'Dogs', 'Bird'];
            if (renovation)
                filters.renovation = ['Yes', 'No'];
            if (views)
                filters.views = 'Views';
            if (proximity)
                filters.proximity = 'Proximity';
            if (property_price) {
                const [minPrice, maxPrice] = property_price.split('-').map(Number);
                filters.price = {
                    gte: minPrice,
                    lte: maxPrice,
                };
            }
            if (add) {
                const addedProperties = await prisma_1.default.property.create({
                    data: filters,
                });
                return res.status(http_status_codes_1.StatusCodes.CREATED).json({
                    message: 'Filtered properties have been added',
                    data: addedProperties,
                });
            }
            const properties = await prisma_1.default.property.findMany({
                where: filters,
            });
            return res.status(http_status_codes_1.StatusCodes.OK).json({
                count: properties.length,
                properties,
            });
        }
        catch (error) {
            console.error('Error retrieving properties:', error);
            return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to retrieve properties' });
        }
        // const {
        //   property_type,
        //   price,
        //   location,
        //   payment_frequency,
        //   specification,
        //   bedroom,
        //   bathroom,
        //   views,
        //   renovation,
        //   pet_allowed,
        //   proximate_landmark,
        //   sort,
        //   fields,
        //   numericFilters,
        //   page = 1,
        //   limit = 10,
        // } = req.query;
        // const filters: any = {};
        // filters[property_type as string] = property_type as string;
        // if (price) {
        //   filters.price = {
        //     gte: parseInt(price as string, 10),
        //   };
        // }
        // if (bedroom) {
        //   filters.bedroom = parseInt(bedroom as string, 10);
        // }
        // if (bathroom) {
        //   filters.bathroom = parseInt(bathroom as string, 10);
        // }
        // // Add other filter conditions based on your requirements
        // try {
        //   const totalProperty = await prisma.property.count({
        //     where: filters,
        //   });
        //  const totalPages = Math.ceil(totalProperty / parseInt(limit as string, 10) as number);
        //  const properties = await prisma.property.findMany({
        //   where: filters,
        //   orderBy: {
        //     createdAt: sort || 'asc',
        //   } as Prisma.PropertyOrderByWithRelationInput,
        //   select: fields,
        //   skip: (page - 1) * limit,
        //   take: limit,
        // });
        //   return res.status(200).json({ properties, totalProperty, totalPages });
        // } catch (error) {
        //   return res.status(500).json({
        //     message: 'Internal server error',
        //     error: error,
        //   });
        // }
    },
    getOneProperty: async (req, res) => {
        try {
            const { id } = req.params;
            const property = await prisma_1.default.property.findFirst({
                where: {
                    id: id,
                },
            });
            if (!property) {
                return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                    message: "Property not found",
                });
            }
            return res.status(http_status_codes_1.StatusCodes.OK).json({
                message: "Fatched",
                property,
            });
        }
        catch (error) {
            return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Failed to fatch property",
            });
        }
    },
    deleteProperty: async (req, res) => {
        try {
            const { id } = req.params;
            const deletedProperty = await prisma_1.default.property.delete({
                where: {
                    id: id,
                },
            });
            return res.status(http_status_codes_1.StatusCodes.OK).json({
                message: "Property deleted",
            });
        }
        catch (error) {
            return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Failed to delete property.",
            });
        }
    },
    updateProperty: async (req, res) => {
        try {
            const propertyId = req.params.propertyId;
            const updatedProperty = await prisma_1.default.property.update({
                where: {
                    id: propertyId,
                },
                data: req.body,
            });
            return res.status(http_status_codes_1.StatusCodes.OK).json({
                message: "Property updated successfully.",
                updatedProperty,
            });
        }
        catch (error) {
            return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Failed to update property.",
            });
        }
    },
    updateLeads: async (req, res) => {
        const { userId, propertyId } = req.body;
        const checkUserId = await prisma_1.default.user.findUnique({
            where: {
                id: userId
            }
        });
        if (!checkUserId)
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND)
                .json({ message: `User not found` });
        const existingProperty = await prisma_1.default.property.findUnique({
            where: {
                id: propertyId,
            }
        });
        if (!existingProperty)
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND)
                .json({ message: `Property not found` });
        const updateViewAndCount = await prisma_1.default.property.update({
            where: {
                id: propertyId
            },
            data: {
                view_count: { increment: 1 },
                view_by_user: { push: userId },
            }
        });
        // TODO: Email& Notifications
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            message: "Property Count has been increased"
        });
    },
    leads: async (req, res) => {
        const { realtorId } = req.params;
        const realtosLeads = await prisma_1.default.property.findMany({
            where: {
                id: realtorId,
            },
            select: {
                view_count: true,
                view_by_user: true,
            },
        });
        if (!realtosLeads) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND)
                .json({
                message: `leads not found`
            });
        }
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            message: true,
            realtosLeads
        });
    }
};
exports.default = propertyController;
