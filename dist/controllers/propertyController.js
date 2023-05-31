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
            const properties = await prisma_1.default.property.findMany({});
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
                    image: updatedProperty.images
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
    getAllProperties: async (req, res) => {
        try {
            const properties = await prisma_1.default.property.findMany({});
            res.status(http_status_codes_1.StatusCodes.OK).json({
                message: `fetched`,
                count: properties.length,
                data: properties
            });
        }
        catch (error) {
            return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Failed to fatch properties",
            });
        }
    },
    getOneProperty: async (req, res) => {
        try {
            const { id } = req.params;
            const property = await prisma_1.default.property.findFirst({
                where: {
                    id: id
                }
            });
            if (!property) {
                return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                    message: 'Property not found'
                });
            }
            return res.status(http_status_codes_1.StatusCodes.OK).json({
                message: 'Fatched',
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
                    id: id
                },
            });
            return res.status(http_status_codes_1.StatusCodes.OK).json({
                message: "Property deleted"
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
                    id: propertyId
                },
                data: req.body
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
    }
};
exports.default = propertyController;
