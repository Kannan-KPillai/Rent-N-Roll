import asyncHandler from 'express-async-handler';
import ownerToken from '../utils/ownerToken.js';
import Owner from '../models/ownerModels.js';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';


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

  


//Logout Owner
//route POST /api/owner/logout
const logoutOwner = asyncHandler (async (req,res) =>{  
    res.cookie('jwt', '',{
        httpOnly: true,
        expires: new Date(0),
    })
    res.status(200).json({message: 'User logged out'})
});


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




//Verigying OTP 
//route POST /api/owner/verify-otp
const verifyOwnerOtp = asyncHandler(async (req, res) => {
    const { email, otp } = req.body;
    
    // Find the owner by email
    const owner = await Owner.findOne({ email: email });
    if (!owner) {
      return res.status(400).json({ message: 'Owner not found' });
    }
  
    if (owner.otp === otp) {
      owner.isVerified = true;
      await owner.save();
  
      if (owner.isVerified === true) {
        generateToken(res, owner._id);
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
  




export {authOwner, ownerRegister, logoutOwner, ownerProfile, updateOwnerProfile, verifyOwnerOtp, checkOwner}