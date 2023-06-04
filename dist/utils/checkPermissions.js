"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const checkPermission = (allowedTypes) => {
    return (req, res, next) => {
        const requestUser = req.user;
        const resourceUserId = req.params.userId;
        console.log(requestUser);
        console.log(resourceUserId);
        console.log(typeof resourceUserId);
        if (allowedTypes.includes(requestUser.type) ||
            requestUser.id === resourceUserId) {
            next();
        }
        else {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: 'Not authorized to access this route' });
        }
    };
};
exports.default = checkPermission;
