"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const date_fns_1 = require("date-fns");
const generateInvitationToken = () => {
    const token = (0, uuid_1.v4)();
    const currentDate = new Date();
    const expirationDate = (0, date_fns_1.addDays)(currentDate, 7);
    const formattedExpirationDate = (0, date_fns_1.formatISO)(expirationDate);
    const tokenWithExpiration = `${token}_${formattedExpirationDate}`;
    return tokenWithExpiration;
};
exports.default = generateInvitationToken;
