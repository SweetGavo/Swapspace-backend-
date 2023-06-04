"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../DB/prisma"));
const http_status_codes_1 = require("http-status-codes");
const offersControllers = {
    addOffers: async (req, res) => {
        const { userId, propertyId } = req.body;
        const checkUserId = await prisma_1.default.user.findUnique({
            where: {
                id: userId,
            },
        });
        if (!checkUserId) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                message: "User not found",
            });
        }
        //TODO:
        // Send mail notification and inapp notification
        const offer = await prisma_1.default.offers.create({
            data: {
                userId,
                propertyId,
            },
        });
        return res.status(http_status_codes_1.StatusCodes.CREATED).json({
            message: "offer created",
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
    getAllOffersByUser: async (req, res) => {
        const { id } = req.params;
        const userOffers = await prisma_1.default.offers.findMany({
            where: {
                userId: id,
            },
        });
        if (userOffers.length === 0) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                message: "No offers found for the user",
            });
        }
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            message: "Fetched offers",
            count: userOffers.length,
            data: userOffers,
        });
    },
    getAllOffersRealtor: async (req, res) => {
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
                message: "No offers found for the realtor",
            });
        }
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            message: "Fetched offers",
            count: userOffers.length,
            data: userOffers,
        });
    },
    acceptOffersByRealtor: async (req, res) => {
        const { offerId } = req.params;
        const updateResponse = await prisma_1.default.offers.update({
            where: {
                id: offerId,
            },
            data: {
                status: "ACCEPTED",
            },
        });
        if (!updateResponse) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                message: "Offer not found",
            });
        }
        //TODO: Send a notification and email notification
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            message: "Offer accepted",
            updatedOffer: updateResponse,
        });
    },
};
exports.default = offersControllers;
