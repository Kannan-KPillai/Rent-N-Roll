import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModels.js";
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import Car from "../models/carModel.js";
import Booking from '../models/bookingModel.js';

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



//****************************************************************************/

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


//*********************************************************************/

//Logout user
//route POST /api/users/logout
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User logged out" });
});


//**********************************************************************/

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


//*********************************************************************/

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


//*********************************************************************/

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
        mobile: user.mobile,
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


//*****************************************************************/

 //GOOGLE LOGIN 
//route POST /api/users/glogin
 const  googleLogin = asyncHandler(async(req,res)=>{

  const {  user_id, name, email } = req.body; 
  // Check if the user already exists
  let user = await User.findOne({ email });

  if (user) {
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
      isVerified: true,
    });

    if (user) {
      generateToken(res, user._id);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  }
});


//**********************************************************************/
//Getting user data 
//route GET /api/users/status/:Id
const getUserStatus = asyncHandler(async (req, res) => {
  const userId = req.params.Id; 
  const user = await User.findById(userId);
  if (user) {
    res.status(200).json({ isBlocked: user.isBlocked }); 
  } else {
    res.status(404).json({ message: 'User not found'});
  }
});


//**********************************************************************************/
//Checking for User Token
//route GET /api/users/checkUser
const checkUser = asyncHandler(async(req,res)=>{
  const token = req.cookies.jwt

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


//*************************************************************************/
// Route GET /api/users/getAvailableCars
const getAvailableCars = asyncHandler(async (req, res) => {
  try {
    const { pickupDate, dropoffDate } = req.query;
    const pickupDateObj = new Date(pickupDate);
    const dropoffDateObj = new Date(dropoffDate);

    const cars = await Car.find({ approved: true }).lean();
    const availableCars = [];
    for (const car of cars) {
      const overlappingBookings = await Booking.findOne({
        carId: car._id,
        $and: [
          {
            pickupDate: {
              $lte: dropoffDateObj,
            },
          },
          {
            dropoffDate: {
              $gte: pickupDateObj,
            },
          },
        ],
      });
      if (!overlappingBookings) {
        availableCars.push(car);
      }
    }

    res.status(200).json(availableCars);
  } catch (error) {
    console.error("Error fetching available cars", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


//*******************************************************************************************/
// Getting selected car details
// Route GET /api/users/carDetails/:Id
const carDetails = asyncHandler(async(req,res)=>{
    const carId = req.params.Id;
    try {
      const car = await Car.findById(carId);
      if(!car){
        return res.status(404).json({error:'Car not found'});
      }
      res.status(200).json({ car })
    } catch (error) {
      res.status(500).json({error: 'Internal server error'});
    }
})


//*******************************************************************************************/
// Uploading booking details to database
// Route POST /api/users/bookingDetails
const bookingDetails = asyncHandler(async(req,res)=>{

  const carId =  req.body.carId;
  const userId = req.body.userId;
  const ownerId = req.body.ownerId;
  const pickupPoint = req.body.pickupPoint;
  const pickupDate = req.body.pickupDate;
  const pickupTime = req.body.pickupTime;
  const dropoffPoint = req.body.dropoffPoint;
  const dropoffDate = req.body.dropoffDate;
  const totalPrice = req.body.totalPrice;
  const advanceAmount = req.body.advanceAmount;

  await Booking.create({
    carId,userId,ownerId,
    pickupPoint,pickupDate,pickupTime,
    dropoffDate, dropoffPoint,
    totalPrice, advanceAmount
  })
    res.status(200).json({message: 'Booking registered'})
})



//*******************************************************************************************/
// Getting the  bookings to be listed on user Side...
// Route GET /api/users/allBookings
const getAllBookings = asyncHandler(async (req, res) => {
  const userId = req.params.Id;

  const userBookings = await Booking.find({ userId: userId }).exec();

  const bookingsWithCarNames = [];

  for (const booking of userBookings) {
    const car = await Car.findById(booking.carId).exec(); 
    const bookingWithCarName = {
      carName: car.name,
      pickupPoint: booking.pickupPoint,
      dropoffPoint: booking.dropoffPoint,
      pickupDate: booking.pickupDate,
      dropoffDate: booking.dropoffDate,
      totalPrice: booking.totalPrice,
      advanceAmount: booking.advanceAmount,
    };
    bookingsWithCarNames.push(bookingWithCarName);
  }
  res.status(200).json(bookingsWithCarNames);
});






export {
  authUser,registerUser,
  logoutUser,updateUserProfile,
  getUserProfile,verifyOtp,
  googleLogin,getUserStatus,
  checkUser,getAvailableCars,carDetails,
  bookingDetails,getAllBookings
};
