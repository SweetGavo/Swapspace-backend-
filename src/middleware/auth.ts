import dotenv from 'dotenv';
dotenv.config(); 
import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';

export interface AuthenticatedRequest extends Request {
  user?: {
    id : string,
    email:string
  };
}

export interface SoftAuthenticatedRequest extends Request {
  user?: {
    id : string,
    email:string
  };
}
const verifyToken = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);

    jwt.verify(token, process.env.JWT_SECRET || 'zackzack', (err: jwt.VerifyErrors | null, decoded: any) => {
      if (err) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid token' });
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Token not provided' });
  }
};
//
const softVerifyToken = async (req: SoftAuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);

    jwt.verify(token, process.env.JWT_SECRET || 'zackzack', (err: jwt.VerifyErrors | null, decoded: any) => {
        req.user = decoded;
        next();
    });
  } else {
    next()
  }
};
export {softVerifyToken}
export default verifyToken;