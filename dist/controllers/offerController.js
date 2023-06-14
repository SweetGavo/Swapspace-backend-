"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../DB/prisma"));
const http_status_codes_1 = require("http-status-codes");
const offersControllers = {
    addOffer: async (req, res) => {
        const { propertyId, realtorId, client_name, property_title, property_type, listing_type, amount, progress, date, time, } = req.body;
        const offer = await prisma_1.default.offers.create({
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
        return res.status(http_status_codes_1.StatusCodes.CREATED).json({
            message: 'offer created',
            offer: offer,
        });
    },
    getAllOffers: async (req, res) => {
        const ITEMS_PER_PAGE = 10;
        const page = parseInt(req.query.page) || 1;
        const skip = (page - 1) * ITEMS_PER_PAGE;
        const offers = await prisma_1.default.offers.findMany({
            skip: skip,
            take: ITEMS_PER_PAGE,
        });
        const totalCount = await prisma_1.default.offers.count();
        const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            count: offers.length,
            offers: offers,
            currentPage: page,
            totalPages: totalPages,
        });
    },
    getOneRealtorsOffers: async (req, res) => {
        const { id } = req.params;
        const userOffers = await prisma_1.default.offers.findMany({
            where: {
                property: {
                    realtorId: id,
                },
            },
        });
        if (userOffers.length === 0) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                message: 'No offers found for the realtor',
            });
        }
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            message: 'Fetched offers',
            count: userOffers.length,
            data: userOffers,
        });
    },
    updateOffer: async (req, res) => {
        const { offerId } = req.params;
        const updateResponse = await prisma_1.default.offers.update({
            where: {
                id: offerId,
            },
            data: req.body,
        });
        if (!updateResponse) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                message: 'Offer not found',
            });
        }
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            message: 'Offer  updated successfully',
            updatedOffer: updateResponse,
        });
    },
    getCheckoff: async (req, res) => {
        const { offerId } = req.params;
        const checkoff = await prisma_1.default.offers.findMany({
            where: {
                id: offerId,
                progress: "Acceptance"
            }
        });
        if (checkoff.length == 0) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND)
                .json({ message: 'No offers with checkoff found' });
        }
        return res.status(http_status_codes_1.StatusCodes.OK)
            .json(checkoff);
    },
    getConnected: async (req, res) => {
        const { offerId } = req.params;
        const connected = await prisma_1.default.offers.findMany({
            where: {
                id: offerId,
                progress: "Inquiry" || "Negotiation"
            }
        });
        if (connected.length == 0) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND)
                .json({ message: 'No offers with checkoff found' });
        }
        return res.status(http_status_codes_1.StatusCodes.OK)
            .json(connected);
    },
    getClosed: async (req, res) => {
        const { offerId } = req.params;
        const sold = await prisma_1.default.offers.findMany({
            where: {
                id: offerId,
                progress: "Sold"
            }
        });
        if (sold.length == 0) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND)
                .json({ message: 'No offers with checkoff found' });
        }
        return res.status(http_status_codes_1.StatusCodes.OK)
            .json(sold);
    }
};
exports.default = offersControllers;
