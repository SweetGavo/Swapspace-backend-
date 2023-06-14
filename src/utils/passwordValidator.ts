import { StatusCodes } from 'http-status-codes';
import { Response } from 'request';

const validatePasswordString = (password: string): any | Response => {
     const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
   
     if (!password.match(regex)) {
       return {
         status: StatusCodes.BAD_REQUEST,
         message:
           'Password must contain a capital letter, number, special character, and be between 8 and 20 characters long.',
       };
     }
     return true;
   };

export default validatePasswordString;