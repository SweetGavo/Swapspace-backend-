import express from 'express';
const router = express.Router();


import profileController from '../controllers/profileController';




router
     .route('/')
     .post(profileController.createProfile)




export default router;