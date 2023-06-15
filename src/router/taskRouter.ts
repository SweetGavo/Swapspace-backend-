import express from 'express';

const router = express.Router();

import taskConroller from '../controllers/taskController';

router.route('/').post(taskConroller.createPersonalTask);

router.route('/').get(taskConroller.getAllTasks);

router.route('/:id').get(taskConroller.getAllPersonalTasksByREaltor);

router
  .route('/find/:id')
  .get(taskConroller.getTasksByAssigneeOrCollaborator);

export default router;
