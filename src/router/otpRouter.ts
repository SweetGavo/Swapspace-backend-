import express from 'express';
const router = express.Router();


import OtpController from '../controllers/otpController';



router
.route('/email')
.post(OtpController.sendOtpToMail);

router
.route('/verify-email')
.post(OtpController.verifyOtpEmail)



export default router;


