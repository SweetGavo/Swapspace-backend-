import express from 'express';
const router = express.Router();


import OtpController from '../controllers/otpController';



router
.route('/email')
.post(OtpController.sendOtpToMail);

router
.route('/verify-email')
.post(OtpController.verifyOtpEmail)


router
.route('/phone')
.post(OtpController.sendOtpToPhone)


router
.route('/verify-phone')
.post(OtpController.verifyOtpPhone)



export default router;


