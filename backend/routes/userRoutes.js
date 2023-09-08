import express from 'express';
const router = express.Router();
import { protect } from '../middleware/authMiddleware.js';
import { authUser,registerUser,logoutUser,updateUserProfile,
    getUserProfile, verifyOtp } from "../controllers/userController.js";



router.post('/login', authUser)

router.post('/register', registerUser)

router.post('/logout', logoutUser)

router.get('/profile', protect, getUserProfile)

router.put('/profile', protect,  updateUserProfile)

router.post('/verify-otp', verifyOtp)


export default router;