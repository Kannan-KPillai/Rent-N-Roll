import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModels.js";
import nodemailer from 'nodemailer';

//Authenticating user and setting token
//route POST /api/users/login
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    if (user.isBlocked) {
      res.status(401).json({ message: "User is blocked" });
    } else {
      generateToken(res, user._id);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
      });
    }
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});



//Registering a new user
//route POST /api/users/register
const registerUser = asyncHandler (async (req,res) =>{
   
    const name = req.body.name.trim();
    const email = req.body.email.trim()
    const mobile = req.body.mobile.trim()
    const password = req.body.password.trim()
   
    const userExists = await User.findOne({email})
    const mobileExists = await User.findOne({mobile})
    if(userExists){
        res.status(400)
        throw new Error("User already exists");
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

    const user = await User.create({
        name,
        email,
        mobile,
        password,
        otp
    })
   
  res.status(200).json({message: 'Register user'})
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



//Logout user
//route POST /api/users/logout
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User logged out" });
});



//Get user profile
//route GET /api/users/profile
const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    mobile: req.user.mobile,
    email: req.user.email,
  };
  res.status(200).json(user);
});



//User profile update
//route PUT /api/users/profile
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.mobile = req.body.mobile || user.mobile;

    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      mobile: updatedUser.mobile,
    });
  } else {
    req.status(404);
    throw new Error("User not found");
  }
});



//Verigying OTP 
//route POST /api/users/verify-otp
const verifyOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;
  
  // Find the user by email
  const user = await User.findOne({ email: email });
  
  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  if (user.otp === otp) {
    user.isVerified = true;
    await user.save();

    if (user.isVerified === true) {
      generateToken(res, user._id);
       return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile
      });
    } else {
      res.status(400);
      throw new Error('User verification failed');
    }
  } else {
     res.status(400);
    throw new Error('Invalid OTP');
  }
});

 //GOOGLE LOGIN
 const  googleLogin = asyncHandler(async(req,res)=>{

  const {  user_id, name, email, profileGoogleImage } = req.body; 
  // Check if the user already exists
  let user = await User.findOne({ email });
console.log("-------------"+ user);

  if (user) {

    // if (!user.isVerified) {
    //   res.status(401);
    //   throw new Error('Your account is not verified');
    // }


    if (user.isBlocked) {
      res.status(401);
      throw new Error('Your account is temporarily blocked');
    }

    // User exists, generate token and send success response
    generateToken(res, user._id);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      // profileGoogleImage: user.profileGoogleImage,
      isBlocked: user.isBlocked
    });
  } else {
    // User doesn't exist, create a new user
    user = await User.create({
    
      name,
      email,
      // profileGoogleImage,
      isVerified: true,
    });

    if (user) {
      generateToken(res, user._id);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        // profileGoogleImage: user.profileGoogleImage,
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  }
});



export {
  authUser,
  registerUser,
  logoutUser,
  updateUserProfile,
  getUserProfile,
  verifyOtp,
  googleLogin
};
