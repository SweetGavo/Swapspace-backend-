import { Request, Response } from "express";
declare const propertyController: {
    addProperty: (req: Request, res: Response) => Promise<Response>;
    getAllProperty: (req: Request, res: Response) => Promise<Response>;
    uploadImages: (req: Request, res: Response) => Promise<Response>;
    filterProperties: (req: Request, res: Response) => Promise<Response>;
    getOneProperty: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    deleteProperty: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    updateProperty: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    updateLeads: (req: Request, res: Response) => Promise<Response>;
    leads: (req: Request, res: Response) => Promise<Response>;
};
export default propertyController;
