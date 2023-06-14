import { Request, Response } from 'express';
declare const taskController: {
    createTask: (req: Request, res: Response) => Promise<Response>;
};
export default taskController;
