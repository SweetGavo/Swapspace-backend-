import express from 'express';
const router = express.Router();

import userController from '../controllers/userController';

router.route('/').get(userController.getAllUsers);



router.route('/find/users').get(userController.getUsersWhichAreUsers);

router.route('/:id').get(userController.getOneUser);



router.route('/total/users').get(userController.getUsertAggregate);



router.route('/block').patch(userController.blockUser);

export default router;
