import asyncHandler from 'express-async-handler';
import ownerToken from '../utils/ownerToken.js';
import Owner from '../models/ownerModels.js';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import Category from '../models/categoryModel.js';
import Car from '../models/carModel.js';     
import cloudinary from '../utils/cloudinary.js';
import Booking from '../models/bookingModel.js'


//Authenticating owner and setting token
//route POST /api/owner/login
const authOwner = asyncHandler (async (req,res) =>{
    const { email, password} = req.body;
    const owner = await Owner.findOne({email})

    if(owner && (await owner.matchPassword(password))){
        if (owner.isBlocked) {
            res.status(401).json({ message: 'User is blocked' })
        }else{
        ownerToken(res, owner._id);
        res.status(201).json({
            _id: owner._id,
            name: owner.name,
            email: owner.email,
            mobile: owner.mobile
        })
    }
    }else{
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

//***************************************************************************************/
//Registering a new user 
//route POST /api/owner/register
const ownerRegister = asyncHandler (async (req,res) =>{
  
    const name = req.body.name.trim();
    const email = req.body.email.trim()
    const mobile = req.body.mobile.trim()
    const password = req.body.password.trim()
   
    const ownerExists = await Owner.findOne({email})
    const mobileExists = await Owner.findOne({mobile})
    if(ownerExists){
        res.status(400)
        throw new Error("Owner already exists");
    }
    if (!password || password.length < 6) {
        res.status(400);
        throw new Error("Password must contain 6 characters")
      }
      if(mobileExists){
        res.status(400)
        throw new Error("Mobile already exists")
      }
    
       // Generate OTP
        const otp = Math.floor(1000 + Math.random() * 9000);
 
      // Send OTP to user's email
       await sendOTPByEmail(email, otp);  

    const owner = await Owner.create({
        name,
        email,
        mobile,
        password,
        otp
    })
   
  res.status(200).json({message: 'Register owner'})
});

//Sending OTP 
const sendOTPByEmail = async (email, otp) => {
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
          user: 'mose.mante@ethereal.email',
          pass: 'Nj5KtVhTH9W7g8wK3m'
      }
  })
  
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: 'OTP Verification',
      text:` Your OTP for verification is: ${otp}`,
    };
  
    await transporter.sendMail(mailOptions);
  };

  
//*********************************************************************************/
//Logout Owner
//route POST /api/owner/logout
const logoutOwner = asyncHandler (async (req,res) =>{  
    res.cookie('jwt', '',{
        httpOnly: true,
        expires: new Date(0),
    })
    res.status(200).json({message: 'User logged out'})
});


//*************************************************************************/
//Get owner profile
//route GET /api/owner/profile
const ownerProfile = asyncHandler (async (req,res) =>{  
    const owner = {
        _id: req.owner._id,
        name: req.owner.name,
        mobile: req.owner.mobile,
        email: req.owner.email
    }
    res.status(200).json(owner)
});


//*******************************************************************************/
//Owner profile update
//route PUT /api/owner/profile
const updateOwnerProfile = asyncHandler(async(req,res) =>{
    const owner = await Owner.findById(req.owner._id);
 
    if(owner){
         owner.name = req.body.name || owner.name;
         owner.email = req.body.email || owner.email;  
         owner.mobile = req.body.mobile || owner.mobile;
 
       if(req.body.password){
         user.password = req.body.password;
       }
      const updatedOwner = await owner.save();
      res.json({
         _id: updatedOwner._id,
         name: updatedOwner.name,
         email: updatedOwner.email,
         mobile: updatedOwner.mobile,
      })
    }else{
     req.status(404);
     throw new Error('User not found')
    }
 })
   

//*************************************************************************************/
//Verigying OTP 
//route POST /api/owner/verify-otp
const verifyOwnerOtp = asyncHandler(async (req, res) => {
    const { email, otp } = req.body;
    
    // Find the owner by email
    const owner = await Owner.findOne({ email: email });
    if (!owner) {
      return res.status(400).json({ message: 'Owner not found' });
    }
  
    if (owner.otp.toString() === otp.toString()) {
      owner.isVerified = true;
      await owner.save();
  
      if (owner.isVerified === true) {
        ownerToken(res, owner._id);
        console.log('********************************************* ')
         return res.status(201).json({
          _id: owner._id,
          name: owner.name,
          email: owner.email,
          mobile: owner.mobile
        });
      } else {
        res.status(400);
        throw new Error('owner verification failed');
      }
    } else {
       res.status(400);
      throw new Error('Invalid OTP');
    }
  });


//****************************************************************************************/
//Checking for Owner Token
//route GET /api/owner/checkOwner
  const checkOwner = asyncHandler(async(req,res)=>{
    const token = req.cookies.owjwt
  
    if(!token){
        return res.status(401).json({message:"unauthorized"})
    }
  
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        res.status(200).json({message: "Authorized"})
    } catch (error) {
        console.log(error)
        return res.status(401).json({message: 'Unauthorized'})
    }
  })
  

//***************************************************************************************/
//Getting all category datas
//route GET /api/owner/getCategory
const getCategory = asyncHandler(async(req, res)=>{
  try {
    const category= await Category.find({}, { type: 1, price: 1, extraPrice: 1, });
    res.status(200).json({ category });
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
})


//********************************************************************************************/
//Adding new Cars 
//route POST  /api/owner/registerCar
const registerCar = asyncHandler(async (req, res) => {
  const type = req.body.categories;
  try {
    const image = req.body.image; 
    const imageUploadResult = await cloudinary.uploader.upload(image, {
      folder: 'images',
    });

    const document = req.body.document;

    const documentUploadResult = await cloudinary.uploader.upload(document, {
      folder: 'documents',
    });


    const {
      name,
      year,
      transmission,
      fuel,
      rent,
      extraRent,
      owner,
    } = req.body;

    const car = new Car({
      name,
      year,
      transmission,
      fuel,
      type,
      rent,
      extraRent,
      owner,
      image: {
        public_id: imageUploadResult.public_id,
        url: imageUploadResult.secure_url,
      },
      document: {
        public_id: documentUploadResult.public_id,
        url: documentUploadResult.secure_url,
      },
    });

    await car.save();

    res.status(201).json({ message: 'Car registered successfully' });
  } catch (error) {
    console.error('Error registering car:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



//**********************************************************************/
//Getting owner data for checking whether blocked or not
//route GET /api/owner/status/:Id
const getOwnerStatus = asyncHandler(async (req, res) => {
  const ownerId = req.params.Id; 
  const owner = await Owner.findById(ownerId);
  if (owner) {
    res.status(200).json({ isBlocked: owner.isBlocked }); 
  } else {
    res.status(404).json({ message: 'Owner not found'});
  }
});
        







export {authOwner, ownerRegister, logoutOwner, ownerProfile, updateOwnerProfile, verifyOwnerOtp,
   checkOwner, getCategory, registerCar, getOwnerStatus}