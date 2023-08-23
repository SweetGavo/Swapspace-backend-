import express from 'express';
const router = express.Router();


import invitationController from '../controllers/invitationController';



router
.route('/:agentId')
.post(invitationController.inviteTeamMember);


router
.route('/')
.get(invitationController.getAllIvites);

router
.route('/:inviteId')
.delete(invitationController.deleteInvitation);


export default router;
 