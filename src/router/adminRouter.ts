import express from 'express';
const router = express.Router();


import adminController from '../controllers/adminController';



router
.route('/sigun')
.post(adminController.createAdmin)


router
.route('/sigun')
.post(adminController.logInAdmin);




export default router;