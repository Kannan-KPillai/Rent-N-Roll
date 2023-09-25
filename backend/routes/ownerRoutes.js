import express from 'express';
const router = express.Router();
import { authOwner, ownerRegister, logoutOwner, ownerProfile, updateOwnerProfile, verifyOwnerOtp,
         checkOwner, getCategory, registerCar, getOwnerStatus, getAllBookings} from '../controllers/ownerController.js' 







router.post('/login', authOwner)

router.post('/register', ownerRegister)

router.post('/logout', logoutOwner)

router.get('/profile', ownerProfile)

router.put('/profile', updateOwnerProfile)

router.post('/verify-otp', verifyOwnerOtp)

router.get('/checkOwner', checkOwner)

router.get('/getCategory', getCategory)

router.post('/registerCar',registerCar)

router.get('/status/:Id', getOwnerStatus);

router.get('/getallBookings/:Id', getAllBookings);

export default router;