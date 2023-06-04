"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uuid_1 = require("uuid");
var generateInvitationToken = function () {
    // Generate a random UUID as the invitation token
    return (0, uuid_1.v4)();
};
console.log(generateInvitationToken);
exports.default = generateInvitationToken;
