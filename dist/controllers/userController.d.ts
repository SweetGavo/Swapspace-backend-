import { Request, Response } from 'express';
declare const userController: {
    getAllUsers: (req: Request, res: Response) => Promise<void>;
    getAgentUsers: (req: Request, res: Response) => Promise<void>;
    getUsersWhichAreUsers: (req: Request, res: Response) => Promise<void>;
    getOneUser: (req: Request, res: Response) => Promise<Response>;
    getOneAgent: (req: Request, res: Response) => Promise<Response>;
};
export default userController;
