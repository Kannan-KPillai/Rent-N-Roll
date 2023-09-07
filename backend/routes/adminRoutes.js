import express from 'express';
const router = express.Router();
import {adminLogin, adminLogout, userData, userBlock, userUnblock} from '../controllers/adminController.js'


router.post('/login', adminLogin)

router.post('/logout', adminLogout)

router.get('/admin', userData)

router.put('/blockUser', userBlock)

router.put('/unblockUser', userUnblock)

export default router;