import express from 'express';
const router = express.Router();
import {adminLogin, adminLogout, userData, userBlock, userUnblock, ownerData, ownerBlock,
     ownerUnblock, checkAdmin, addCategory, getCategory, getCategoryById, editCategory, getCars,
     acceptCar, 
     rejectCar} from '../controllers/adminController.js'




router.post('/login', adminLogin)

router.post('/logout', adminLogout)

router.get('/admin', userData)

router.put('/blockUser', userBlock)

router.put('/unblockUser', userUnblock)

router.get('/owner', ownerData)

router.put('/blockowner', ownerBlock)

router.put('/unblockowner', ownerUnblock)

router.get('/checkAdmin', checkAdmin)

router.post('/category', addCategory)

router.get('/getCategory', getCategory)

router.get('/category/:id', getCategoryById)

router.put('/category/:id', editCategory)

router.get('/getCars', getCars)

router.put('/acceptCar', acceptCar)

router.put('/rejectCar', rejectCar)







export default router;