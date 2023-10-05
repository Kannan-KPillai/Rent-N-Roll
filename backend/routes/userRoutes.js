import express from 'express';
const router = express.Router();
import { protect } from '../middleware/authMiddleware.js';
import { payment} from '../controllers/paymentController.js'
import { authUser,registerUser,logoutUser,updateUserProfile,getUserProfile,
         verifyOtp,  googleLogin, getUserStatus, checkUser, carDetails,
         bookingDetails, getAvailableCars, getAllBookings, cancelBooking, userReview, getReviews} from "../controllers/userController.js";



router.post('/login', authUser)

router.post('/register', registerUser)

router.post('/logout', logoutUser)

router.post('/glogin',  googleLogin) //google login

router.get('/profile', protect, getUserProfile)

router.put('/profile', protect,  updateUserProfile)

router.post('/verify-otp', verifyOtp);

router.get('/checkUser', checkUser);

router.get('/status/:Id', getUserStatus);

router.get('/getAvailableCars',protect, getAvailableCars);

router.get('/carDetails/:Id',protect, carDetails);

router.post('/payment', payment)

router.post('/bookingDetails',protect, bookingDetails)

router.get('/allBookings/:Id',protect, getAllBookings)

router.post('/cancel/:Id', cancelBooking)

router.post('/ratings/:bookingId', userReview)

router.get('/ratings/:Id', getReviews)


export default router;