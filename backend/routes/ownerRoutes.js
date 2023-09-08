import express from 'express';
const router = express.Router();
import { authOwner, ownerRegister, logoutOwner, ownerProfile, updateOwnerProfile} from '../controllers/ownerController.js' 



router.post('/login', authOwner)

router.post('/register', ownerRegister)

router.post('/logout', logoutOwner)

router.get('/profile', ownerProfile)

router.put('/profile', updateOwnerProfile)

export default router;