import express, { Request, Response } from 'express';
const router = express.Router();


import agentController from '../controllers/agentAuthController';



router
.route('/signup/agent')
.post(agentController.createAgent)



router
.route('/relators/login')
.post(agentController.loginRealtor)


export default router;