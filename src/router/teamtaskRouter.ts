import express from 'express';
const router = express.Router();

import teamTaskController from '../controllers/teamtaskController';

router
  .route('/')
  .post(teamTaskController.createTeamTask)
  .get(teamTaskController.getAllTeamTasks);

router.route('/realtor/:realtorId').get(teamTaskController.getTasksByRealtor);

export default router;
