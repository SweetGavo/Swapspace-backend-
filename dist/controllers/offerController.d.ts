import { Request, Response } from 'express';
declare const offersControllers: {
    addOffer: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getAllOffers: (req: Request, res: Response) => Promise<Response>;
    getOneRealtorsOffers: (req: Request, res: Response) => Promise<Response>;
    updateOffer: (req: Request, res: Response) => Promise<Response>;
    getCheckoff: (req: Request, res: Response) => Promise<Response>;
    getConnected: (req: Request, res: Response) => Promise<Response>;
    getClosed: (req: Request, res: Response) => Promise<Response>;
};
export default offersControllers;
