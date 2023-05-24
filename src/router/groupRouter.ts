import express from 'express';
const router = express.Router();





import groupMembersController from '../controllers/groupController';


router
.route('/')
.post(groupMembersController.createGroup)
.get(groupMembersController.getAllGroups);



router
.route('/add')
.patch(groupMembersController.addmembersToGroup);






export default router;