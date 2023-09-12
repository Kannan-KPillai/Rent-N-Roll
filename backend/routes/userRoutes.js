import express from 'express';
const router = express.Router();
import { protect } from '../middleware/authMiddleware.js';
import { authUser,registerUser,logoutUser,updateUserProfile,
    getUserProfile, verifyOtp,  googleLogin, getUserStatus} from "../controllers/userController.js";



router.post('/login', authUser)

router.post('/register', registerUser)

router.post('/logout', logoutUser)

router.post('/glogin',  googleLogin) //google login

router.get('/profile', protect, getUserProfile)

router.put('/profile', protect,  updateUserProfile)

router.post('/verify-otp', verifyOtp)

router.get('/status', getUserStatus);


export default router;