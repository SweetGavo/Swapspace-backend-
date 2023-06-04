import { Request, Response } from "express";
declare const offersControllers: {
    addOffers: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getAllOffers: (req: Request, res: Response) => Promise<Response>;
    getAllOffersByUser: (req: Request, res: Response) => Promise<Response>;
    getAllOffersRealtor: (req: Request, res: Response) => Promise<Response>;
    acceptOffersByRealtor: (req: Request, res: Response) => Promise<Response>;
};
export default offersControllers;
