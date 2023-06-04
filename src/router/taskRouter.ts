import express from 'express';

const router = express.Router();


import taskConroller from '../controllers/taskController';



router
.route('/')
.post(taskConroller.createTask);

export default router;