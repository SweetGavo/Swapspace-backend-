import { Request, Response, NextFunction } from 'express';
export interface AuthenticatedRequest extends Request {
    user?: {
        id: string;
        email: string;
    };
}
export interface SoftAuthenticatedRequest extends Request {
    user?: {
        id: string;
        email: string;
    };
}
declare const verifyToken: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
declare const softVerifyToken: (req: SoftAuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
export { softVerifyToken };
export default verifyToken;
