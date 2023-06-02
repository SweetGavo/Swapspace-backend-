import express from 'express';
const router = express.Router();



import passwordController from '../controllers/restPassword';


router
     .route('/forget')
     .post(passwordController.forgetPassword)


router
     .route('/reset')
     .post(passwordController.restPassword)





export default router;
