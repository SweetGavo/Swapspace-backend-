import express  from 'express';
const router = express.Router();


import  teamTaskController from '../controllers/teamtaskController';





router
.route('/')
.post(teamTaskController.createTeamTask)


export default router;