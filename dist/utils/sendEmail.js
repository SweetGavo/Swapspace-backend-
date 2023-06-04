"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendEmail = async ({ email, subject, html }) => {
    try {
        const transporter = nodemailer_1.default.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            port: 587,
            secure: true,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS,
            },
        });
        await transporter.sendMail({
            from: `"SWAP SPACE" ${process.env.USER}`,
            to: email,
            subject: subject,
            html: html,
        });
        console.log('Email sent successfully');
    }
    catch (error) {
        console.log('Email not sent');
        console.log(error);
    }
};
exports.default = sendEmail;
