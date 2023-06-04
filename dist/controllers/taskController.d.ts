import { Request, Response } from 'express';
declare const taskConroller: {
    createTask: (req: Request, res: Response) => Promise<Response>;
};
export default taskConroller;
