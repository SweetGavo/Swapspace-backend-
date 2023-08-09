import express, { Request, Response } from 'express';
const router = express.Router();
import authController from '../controllers/authController';




router
.route('/signup')
.post(authController.createUser)

router
.route('/users/login')
.post(authController.loginUser)


router
.route('/logout')
.get(authController.logoutUser)










export default router;



