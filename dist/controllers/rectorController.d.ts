import { Request, Response } from "express";
declare const rectorController: {
    createAgentProfile: (req: Request, res: Response) => Promise<Response>;
    updateAgentProfileImage: (req: Request, res: Response) => Promise<Response>;
    getAllRealtor: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getOneRealtor: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
};
export default rectorController;
