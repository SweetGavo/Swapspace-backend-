import express from 'express';     
const router = express.Router();



import userController from '../controllers/userController';



router
.route('/')
.get(userController.getAllUsers);

router
.route('/agents')
.get(userController.getAgentUsers);

export default router;