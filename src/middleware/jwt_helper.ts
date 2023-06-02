// import jwt from 'jsonwebtoken';
// import { Request, Response, NextFunction } from 'express';
// import { StatusCodes } from 'http-status-codes';
// import { ACCOUNT_TYPES } from '../important';

// const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
//   const authHeader = req.headers.authorization;
//   if (authHeader && authHeader.startsWith("Bearer ")) {
//     const token = authHeader.substring(7);
//     jwt.verify(token, process.env.JWT_SECRET, (err: any, decoded: any) => {
//       if (err) {
//         return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Invalid token" });
//       } else {
//         req.user = decoded;
//         next();
//       }
//     });
//   } else {
//     return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Token not provided" });
//   }
// };

// const verifyTokenAndAuthorization = (req: Request, res: Response, next: NextFunction) => {
//   verifyToken(req, res, () => {
//     if (req.user.accountType === ACCOUNT_TYPES.ADMIN || req.user.id === req.params.id) {
//       next();
//     } else {
//       res.status(StatusCodes.FORBIDDEN).json("You are not allowed to perform this action!");
//     }
//   });
// };

// const verifyTokenAndAdmin = (req: Request, res: Response, next: NextFunction) => {
//   verifyToken(req, res, () => {
//     if (req.user.accountType === ACCOUNT_TYPES.ADMIN) {
//       next();
//     } else {
//       res.status(StatusCodes.FORBIDDEN).json("You are not allowed to perform this action!");
//     }
//   });
// };

// export default {
//   verifyToken,
//   verifyTokenAndAuthorization,
//   verifyTokenAndAdmin,
// };
