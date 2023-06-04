import { Request, Response } from "express";
declare const ratingController: {
    createRating: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getAllRating: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    updateRating: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    deleteRating: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    averageRating: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getComment: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
};
export default ratingController;
