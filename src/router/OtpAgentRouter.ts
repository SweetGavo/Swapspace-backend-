import express from 'express';
const router = express.Router();


import OtpAgentController from '../controllers/OtpAgent';



router
.route('/email')
.post(OtpAgentController.sendOtpToMail);

router
.route('/verify-email')
.post(OtpAgentController.verifyOtpEmail)


router
.route('/phone')
.post(OtpAgentController.sendOtpToPhone)


router
.route('/verify-phone')
.post(OtpAgentController.verifyOtpPhone)



export default router;


