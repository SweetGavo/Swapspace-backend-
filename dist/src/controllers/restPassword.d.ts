import { Request, Response } from "express";
declare const passwordController: {
    forgetPassword: (req: Request, res: Response) => Promise<Response>;
    restPassword: (req: Request, res: Response) => Promise<Response>;
};
export default passwordController;
