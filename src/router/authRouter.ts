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

router
.route('/signup/agent')
.post(authController.createAgent)


router
.route('/relators/login')
.post(authController.loginRealtor)





export default router;



