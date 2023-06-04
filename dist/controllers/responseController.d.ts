import { Request, Response } from 'express';
declare const responseController: {
    addResponse: (req: Request, res: Response) => Promise<Response>;
};
export default responseController;
