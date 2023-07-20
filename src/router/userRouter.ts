import express from 'express';
const router = express.Router();

import userController from '../controllers/userController';

router.route('/').get(userController.getAllUsers);

router.route('/agents').get(userController.getAgentUsers);

router.route('/find/users').get(userController.getUsersWhichAreUsers);

router.route('/:id').get(userController.getOneUser);

router.route('/agents/:id').get(userController.getOneAgent);

router.route('/total/users').get(userController.getUsertAggregate);

router.route('/total/agent').get(userController.getAgentAggregate);

router.route('/block').patch(userController.blockUser);

export default router;
