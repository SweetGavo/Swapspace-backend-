import { Request, Response } from 'express';
declare const authController: {
    createUser: (req: Request, res: Response) => Promise<Response>;
    loginUser: (req: Request, res: Response) => Promise<Response>;
    logoutUser: (req: Request, res: Response) => Promise<Response>;
    createAgent: (req: Request, res: Response) => Promise<Response>;
};
export default authController;
