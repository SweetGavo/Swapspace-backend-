import express from 'express';
const router = express.Router();



import infoController from '../controllers/infoController';


router
.route('/')
.post(infoController.createMeeting)

router.get("/")
export default router;

