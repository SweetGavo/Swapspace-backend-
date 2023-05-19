import express from 'express';
const router = express.Router();



import rectorController from '../controllers/rectorController';


router
.route('/')
.post (rectorController.createAgentProfile);



export default router;