import express from 'express';
const router = express.Router();



import infoController from '../controllers/infoController';


router
.route('/')
.post(infoController.createMeeting)

router.route("/").get(infoController.getallMeetings);
router.route("/:id").u
export default router;

