"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getOtpExpiryTime = () => {
    const expiredAtDate = new Date(new Date().getTime() + 1000 * 60 * 10); // 10 minutes
    return expiredAtDate;
};
exports.default = getOtpExpiryTime;
