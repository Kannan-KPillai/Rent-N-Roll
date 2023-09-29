import express from 'express';
const router = express.Router();
import { protect } from '../middleware/ownerMiddleware.js';
import { authOwner, ownerRegister, logoutOwner, ownerProfile, updateOwnerProfile, verifyOwnerOtp,
         checkOwner, getCategory, registerCar, getOwnerStatus, getAllBookings, getCars, turnOffCar, turnOnCar} from '../controllers/ownerController.js' 



   



router.post('/login', authOwner)

router.post('/register', ownerRegister)

router.post('/logout', logoutOwner)

router.get('/profile',protect, ownerProfile)

router.put('/profile',protect, updateOwnerProfile)

router.post('/verify-otp', verifyOwnerOtp)

router.get('/checkOwner', checkOwner)

router.get('/getCategory',protect, getCategory)

router.post('/registerCar',protect, registerCar)

router.get('/status/:Id',getOwnerStatus);

router.get('/getallBookings/:Id',protect, getAllBookings);

router.get('/getCar/:Id',protect, getCars);

router.put('/cars/turnoff/:Id', turnOffCar);

router.put('/cars/turnon/:Id', turnOnCar);



export default router;