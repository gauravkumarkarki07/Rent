import express from 'express';
import {Logout,AddProperty,GetPropertyByUserId, GetAllProperty} from '../controllers/userController.js';

const router=express.Router();

router.post('/logout',Logout);
router.post('/addproperty',AddProperty);
router.get('/getpropertyById/:userId',GetPropertyByUserId);
router.get('/getallproperty',GetAllProperty);


export default router;