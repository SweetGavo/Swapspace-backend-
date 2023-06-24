import express from 'express';
const router = express.Router();


import adminController from '../controllers/adminController';



router
.route('/signup')
.post(adminController.createAdmin)


router
.route('/login')
.post(adminController.logInAdmin);




export default router;