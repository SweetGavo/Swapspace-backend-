import { Response, NextFunction } from 'express';
declare const checkPermission: (allowedTypes: string[]) => (req: any, res: Response, next: NextFunction) => void;
export default checkPermission;
