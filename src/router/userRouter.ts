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

<<<<<<< HEAD
router.route('/unblock').patch(userController.blockUser);

export default router;
=======
export default router;
>>>>>>> 16df60584bcabcb4966e89d4a168459efc5b942b
