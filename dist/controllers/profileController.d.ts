import { Request, Response } from "express";
declare const profileController: {
    createProfile: (req: Request, res: Response) => Promise<Response>;
    getOneProfile: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    getAllProfile: (req: Request, res: Response) => Promise<void>;
    deleteProfile: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    updateProfile: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
};
export default profileController;
