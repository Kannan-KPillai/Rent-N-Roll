import express from 'express';
const router = express.Router();
import { protect } from '../middleware/authMiddleware.js';
import { payment} from '../controllers/paymentController.js'
import { authUser,registerUser,logoutUser,updateUserProfile,
    getUserProfile, verifyOtp,  googleLogin, getUserStatus, checkUser, getCars, carDetails, bookingDetails} from "../controllers/userController.js";



router.post('/login', authUser)

router.post('/register', registerUser)

router.post('/logout', logoutUser)

router.post('/glogin',  googleLogin) //google login

router.get('/profile', protect, getUserProfile)

router.put('/profile', protect,  updateUserProfile)

router.post('/verify-otp', verifyOtp);

router.get('/checkUser', checkUser);

router.get('/status/:Id', getUserStatus);

router.get('/getCars', getCars);

router.get('/carDetails/:Id',carDetails);

router.post('/payment', payment)

router.post('/bookingDetails', bookingDetails)





export default router;