import { Request, Response } from "express";
declare const OtpController: {
    sendOtpToMail: (req: Request, res: Response) => Promise<Response>;
    verifyOtpEmail: (req: Request, res: Response) => Promise<Response>;
    sendOtpToPhone: (req: Request, res: Response) => Promise<Response | void>;
    verifyOtpPhone: (req: Request, res: Response) => Promise<Response>;
    removeExpiredOtps: () => Promise<void>;
};
export default OtpController;
