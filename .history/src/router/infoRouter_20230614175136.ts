import express from 'express';
const router = express.Router();



import infoController from '../controllers/infoController';


router
.route('/')
.post(infoController.createMeeting)

router.route
export default router;

