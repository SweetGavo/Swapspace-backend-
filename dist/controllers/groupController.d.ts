import { Request, Response } from "express";
declare const groupMembersController: {
    createGroup: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getAllGroups: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    addMembersToGroup: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
};
export default groupMembersController;
