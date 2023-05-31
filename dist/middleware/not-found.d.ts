import { Response } from 'express';
declare const notFound: (req: any, res: Response) => Response<any, Record<string, any>>;
export default notFound;
