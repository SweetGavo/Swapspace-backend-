import { Response, NextFunction } from 'express';
import  { User }  from '@prisma/client';
import { StatusCodes } from 'http-status-codes';

const checkPermission = (allowedTypes: string[]) => {
  return (req: any, res: Response, next: NextFunction) => {
    const requestUser = req.user as User;
    const resourceUserId = req.params.userId;

    console.log(requestUser);
    console.log(resourceUserId);
    console.log(typeof resourceUserId);

    if (
      allowedTypes.includes(requestUser.type) ||
      requestUser.id === resourceUserId
    ) {
      next(); 
    } else {
      res.status(StatusCodes.BAD_REQUEST).json({ message: 'Not authorized to access this route' });
    }
  };
};

export default checkPermission;
