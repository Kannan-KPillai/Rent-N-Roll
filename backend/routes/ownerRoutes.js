import express from 'express';
const router = express.Router();
import { authOwner, ownerRegister, logoutOwner} from '../controllers/ownerController.js' 



router.post('/login', authOwner)

router.post('/register', ownerRegister)

router.post('/logout', logoutOwner)

export default router;