import express from 'express';
const router = express.Router();


import getAgentController from  '../controllers/getAgentController';



router.route('/').get(getAgentController.getAllAgent);

router.route('/:agentId').get(getAgentController.getOneAgent);


router.route('/total/agent').get(getAgentController.getAgentAggregate);



router.route('/block').patch(getAgentController.blockAgent);

router.route('/unblock').patch(getAgentController.unBlockAgent);




export default router;