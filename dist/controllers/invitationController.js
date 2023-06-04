"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../DB/prisma"));
const http_status_codes_1 = require("http-status-codes");
const randomtoken_1 = __importDefault(require("../utils/randomtoken"));
const sendEmail_1 = __importDefault(require("../utils/sendEmail"));
const invitationController = {
    inviteTeamMember: async (req, res) => {
        const { email } = req.body;
        const invitationToken = (0, randomtoken_1.default)();
        await prisma_1.default.invitation.create({
            data: {
                email,
                token: invitationToken,
            },
        });
        // Generate the invitation link using the invitation token
        const invitationLink = `http://localhost:6001/signup?token=${invitationToken}`;
        const emailOptions = {
            email: email,
            subject: 'You have been invited to join your team On Swapspace',
            html: `<p>Click on the link <b>${invitationLink}</b>  and complete your registration.</p>
     <p>This code <b>link expires in 7 days </b>.</p>`,
        };
        await (0, sendEmail_1.default)(emailOptions);
        return res.status(http_status_codes_1.StatusCodes.CREATED).json({
            message: 'Invitation sent successfully',
        });
    },
};
exports.default = invitationController;
