import express from 'express';
const router = express.Router();
import {adminLogin, adminLogout, userData, userBlock, userUnblock, ownerData, ownerBlock, ownerUnblock} from '../controllers/adminController.js'


router.post('/login', adminLogin)

router.post('/logout', adminLogout)

router.get('/admin', userData)

router.put('/blockUser', userBlock)

router.put('/unblockUser', userUnblock)

router.get('/owner', ownerData)

router.put('/blockowner', ownerBlock)

router.put('/unblockowner', ownerUnblock)

export default router;