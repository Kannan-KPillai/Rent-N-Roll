import asyncHandler from 'express-async-handler'
import adminToken from '../utils/adminToken.js';
import Admin from '../models/adminModels.js';
import User from '../models/userModels.js';
import Owner from '../models/ownerModels.js';
import Category from '../models/categoryModel.js';
import jwt  from 'jsonwebtoken';
import Car from '../models/carModel.js';
import nodemailer from 'nodemailer';
import Booking from '../models/bookingModel.js';



//Authenticating Admin and setting token
//route POST /api/admin/login
const adminLogin = asyncHandler (async (req,res) =>{
    const { email, password} = req.body;
    const admin = await Admin.findOne({email})
    if(admin && (await admin.matchPassword(password))){
        adminToken (res, admin._id);
        res.status(201).json({
            _id: admin._id,
            name: admin.name,
            email: admin.email,
        })
    }else{
        res.status(401);
        throw new Error('Invalid email or password');
    }
});


//*******************************************************************************************/
//Logout Admin
//route POST /api/admin/logout
const adminLogout = asyncHandler (async (req,res) =>{  
    res.cookie('adjwt', '',{
        httpOnly: true,
        expires: new Date(0),
    })
    res.status(200).json({message: 'Admin logged out'})
});


//*************************************************************************************/
//Getting users listed 
//route GET /api/admin
const userData = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;

  try {
    const users = await User.find({}, { name: 1, email: 1, mobile: 1, _id: 1, isBlocked: 1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const totalUsers = await User.countDocuments();
    const totalPages = Math.ceil(totalUsers / limit);

    const paginationInfo = {
      totalPages,
      currentPage: page,
    };

    if (page < totalPages) {
      paginationInfo.next = page + 1;
    }
    if (page > 1) {
      paginationInfo.prev = page - 1;
    }

    res.status(200).json({ users, totalPages: totalPages, paginationInfo });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

  

//****************************************************************************************/
//Blocking the user
//route PUT /api/admin/blockuser
const userBlock = asyncHandler(async(req,res)=> {
    try{
        const user = await User.findById(req.query.userId);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
          user.isBlocked = true;
          await user.save();
          res.status(200).json({ 
            _id: user._id,
            name: user.name,
            email: user.email,
            mobile: user.mobile,
            isBlocked: user.isBlocked
           });
    }catch(error){
        console.error('Error blocking user:', error);
        res.status(500).json({ message: 'Server error' });
    }
})


//****************************************************************************************/
//Unblocking the user
//route PUT /api/admin/unblockuser
const userUnblock = asyncHandler(async(req,res)=>{
    try{
        const user = await User.findById(req.query.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
          user.isBlocked = false;
          await user.save();
          res.status(200).json({ 
            _id: user._id,
            name: user.name,
            email: user.email,
            mobile: user.mobile,
            isBlocked: user.isBlocked
           });
    }catch(error){
        console.error('Error Un blocking user:', error);
        res.status(500).json({ message: 'Server error' });
    }
})


//*****************************************************************************************/
//Getting owners listed 
//route GET /api/admin/owner
const ownerData = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;

    try {
      const owner = await Owner.find({}, { name: 1, email: 1, mobile: 1, _id: 1, isBlocked:1 })
      .skip((page - 1) * limit)
      .limit(limit);
      
      const totalOwners = await Owner.countDocuments();
      const totalPages = Math.ceil(totalOwners / limit);

      const paginationInfo = {
        totalPages,
        currentPage: page,
      };

      
    if (page < totalPages) {
      paginationInfo.next = page + 1;
    }
    if (page > 1) {
      paginationInfo.prev = page - 1;
    }
      
      res.status(200).json({ owner, totalPages });
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  });
  
//*********************************************************************************************/
//Blocking the owner
//route PUT /api/admin/blockowner
const ownerBlock = asyncHandler(async(req,res)=> {
    try{
        const owner = await Owner.findById(req.query.ownerId);
        
        if (!owner) {
            return res.status(404).json({ message: 'Owner not found' });
          }
          owner.isBlocked = true;
          await owner.save();
          res.status(200).json({ message: 'Owner blocked successfully' });
    }catch(error){
        console.error('Error blocking owner:', error);
        res.status(500).json({ message: 'Server error' });
    }
})


//*****************************************************************************************/
//Unblocking the owner
//route PUT /api/admin/unblockowner
const ownerUnblock = asyncHandler(async(req,res)=>{
    try{
        const owner = await Owner.findById(req.query.ownerId);
        if (!owner) {
            return res.status(404).json({ message: 'User not found' });
          }
          owner.isBlocked = false;
          await owner.save();
          res.status(200).json({message:'Owner unblocked succesfully'})
    }catch(error){
        console.error('Error Unblocking owner:', error);
        res.status(500).json({ message: 'Server error' });
    }
})


//*********************************************************************************************/
//Checking the Owner
//route GET /api/admin/checkAdmin
const checkAdmin = asyncHandler(async(req,res)=>{
    const token = req.cookies.adjwt
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


//*****************************************************************************************/
//Adding the Car Categories
//route POST /api/admin/category
const addCategory = asyncHandler(async (req, res) => {
    try {
      const type = req.body.type.trim();
      const price = req.body.price.trim();
      const extraPrice = req.body.extraPrice.trim();

      if (!type || !price || !extraPrice) {
        res.status(400).json('Cannot submit an empty form');
        return;
      }
  
      const catExists = await Category.findOne({ type });
  
      if (catExists) {
        res.status(400).json('Category already exists');
        return;
      }
  
      const category = await Category.create({
        type,
        price,
        extraPrice,
      });
      const response = await Category.find();
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  

//*********************************************************************************************/
//Getting Categories listed
//route GET /api/admin/category
const getCategory = asyncHandler(async (req, res) => {
    try {
      const category= await Category.find({}, { type: 1, price: 1, extraPrice: 1, });
      res.status(200).json({ category });
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  });
  

  //***********************************************************************************************/
//Getting the categories by ID 
//route GET /api/admin/category/:id
const getCategoryById = asyncHandler(async(req,res)=>{
    const category = await Category.findById(req.params.id);
    res.status(201).json(category)
    
})


//***********************************************************************************************/
//Editing the Categories
//route PUT /api/admin/category/:id
const editCategory = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (category) {
      category.type = req.body.type || category.type;
      category.price = req.body.price || category.price;
      category.extraPrice = req.body.extraPrice || category.extraPrice;
  
       await category.save();
        let response = await Category.find();
         res.status(201).json(response);
    } else {
      res.status(404);
      throw new Error("Category not found");
    }
  });
  

//*******************************************************************************************/
// Getting all car datas
// Route GET /api/admin/getCars
const getCars = asyncHandler(async (req, res) => {
  try {
    const cars = await Car.find(
      { approved: false }, 
      {
        name: 1,
        year: 1,
        transmission: 1,
        fuel: 1,
        type: 1,
        rent: 1,
        extraRent: 1,
        document: 1,
        owner: 1,
        approved: 1,
      }
    ).populate('owner', 'name mobile');

    res.status(200).json(cars);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});



//*******************************************************************************************/
// Accepting the car
// Route PUT /api/admin/acceptCar
const acceptCar = asyncHandler(async (req, res) => {
  const car = await Car.findById(req.query.carId);

  try {
    car.approved = true;
    await car.save();
    const updatedCar = await Car.findById(req.query.carId);
    res.status(200).json({ car: updatedCar });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});



//*******************************************************************************************/
//Reject/Delete the car request
//route PUT/api/admin/rejectCar
const rejectCar = asyncHandler(async (req, res) => {
  const carId = req.query.carId;
  try {
    const car = await Car.findById(carId);

    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    const owner = await Owner.findById(car.owner);

    if (!owner || !owner.email) {
      return res.status(404).json({ message: 'Owner not found or missing email' });
    }

    await car.deleteOne();
    
    await sendReasonbyEmail(owner.email);

    res.status(200).json({ message: 'Car deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


//Sending Reason
const sendReasonbyEmail = async (email) => {
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
    subject: 'Your Car Request has been rejected',
    text:'Your car request for car for RENT N ROLL has been rejected due to improper / invalid document.. Thank You' ,
  };

  await transporter.sendMail(mailOptions);
};



//**************************************************************************************************/
// Getting all car datas
// Route GET /api/admin/getCarData
const getCarData = asyncHandler(async (req, res) => {
  try {
    const cars = await Car.find({ approved: true }).populate('owner', 'name mobile');

    res.status(200).json(cars);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});



//**************************************************************************************************/
// Getting all datas for dashboard
// Route GET /api/admin/dashboard
const dashboardDatas = asyncHandler(async(req,res)=>{
  try {
    const userCount = await User.countDocuments();
    const ownerCount = await Owner.countDocuments();
    const carCount = await Car.countDocuments();
    const bookingCount = await Booking.countDocuments();
    res.status(200).json({
      userCount,
      ownerCount,
      carCount,
      bookingCount,
    });
  } catch (error) {
    console.error("Error fetching counts:", error);
    throw error;
  }

})


//**************************************************************************************************/
// Getting all datas for dashboard
// Route GET /api/admin/fetchBookings 
const fetchBookings = asyncHandler(async(req,res)=>{
  try {
    const monthlyBookings = await Booking.aggregate([
      {
        $group: {
          _id: {
            month: { $month: "$pickupDate" }, 
            year: { $year: "$pickupDate" }, 
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 },
      },
    ]);
    res.status(200).json(monthlyBookings);
  } catch (error) {
    console.error("Error fetching monthly bookings:", error);
    throw error;
  }
})













export {adminLogin,  adminLogout, userData, userBlock, userUnblock, ownerData, ownerBlock, ownerUnblock,getCarData,fetchBookings,
        checkAdmin, addCategory, getCategory, getCategoryById, editCategory, getCars, acceptCar, rejectCar, dashboardDatas }