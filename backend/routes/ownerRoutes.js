import express from 'express';
const router = express.Router();
import { authOwner, ownerRegister, logoutOwner, ownerProfile, updateOwnerProfile, verifyOwnerOtp, checkOwner, getCategory, registerCar} from '../controllers/ownerController.js' 
import multer from 'multer';



// Configure Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads'); // Destination folder for uploaded images
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + '-' + file.originalname);
    },
  });


  const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only images are allowed!"), false); 
    }
  };

  const upload = multer({
    storage:storage,
    fileFilter: fileFilter, 
})



router.post('/login', authOwner)

router.post('/register', ownerRegister)

router.post('/logout', logoutOwner)

router.get('/profile', ownerProfile)

router.put('/profile', updateOwnerProfile)

router.post('/verify-otp', verifyOwnerOtp)

router.get('/checkOwner', checkOwner)

router.get('/getCategory', getCategory)

router.post('/registerCar', upload.array('file'),registerCar)





export default router;