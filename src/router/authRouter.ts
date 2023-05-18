import express from 'express';
const router = express.Router();

import authController from '../controllers/authController';


router
.route('/signup')
.post(authController.createUser)

router
.route('/login')
.post(authController.loginUser)


router
.route('/logout')
.get(authController.logoutUser)

router
.route('/signup/agent')
.post(authController.createAgent)


export default router;



