import express from 'express';
const router = express.Router();


import invitationController from '../controllers/invitationController';



router
.route('/')
.post(invitationController.inviteTeamMember);



export default router;
 