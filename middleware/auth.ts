import dotenv from 'dotenv';
dotenv.config(); 
import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';

interface AuthenticatedRequest extends Request {
  user?: any;
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

export default verifyToken;
