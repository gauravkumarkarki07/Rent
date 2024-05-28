import express from 'express';
import {Logout} from '../controllers/userController.js';

const router=express.Router();

router.use('/logout',Logout)

export default router;