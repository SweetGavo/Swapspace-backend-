import { Request, Response } from "express";
declare const propertyController: {
    addProperty: (req: Request, res: Response) => Promise<Response>;
    getAllProperty: (req: Request, res: Response) => Promise<Response>;
    uploadImages: (req: Request, res: Response) => Promise<Response>;
    getAllProperties: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    getOneProperty: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    deleteProperty: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    updateProperty: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
};
export default propertyController;
