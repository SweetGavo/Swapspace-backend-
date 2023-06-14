import express from 'express';
const router = express.Router();





import teamController from '../controllers/teamController';


router
.route('/')
.post(teamController.createGroup)
.get(teamController.getAllGroups);



router
.route('/add')
.patch(teamController.addMembersToGroup);






export default router;