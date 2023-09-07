import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js';
import Admin from '../models/adminModels.js';
import User from '../models/userModels.js';

//Authenticating Admin and setting token
//route POST /api/admin/login
const adminLogin = asyncHandler (async (req,res) =>{
    const { email, password} = req.body;
    const admin = await Admin.findOne({email})
    if(admin && (await admin.matchPassword(password))){
        generateToken(res, admin._id);
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

//Logout Admin
//route POST /api/admin/logout
const adminLogout = asyncHandler (async (req,res) =>{  
    res.cookie('adjwt', '',{
        httpOnly: true,
        expires: new Date(0),
    })
    res.status(200).json({message: 'Admin logged out'})
});

//Getting Users listed Orginal code
//route GET /api/admin/admin
// const userData = asyncHandler (async (req,res)=> {
//     try{
//         const users = await User.find({}, { name: 1, email: 1, mobile: 1, _id: 1 });
//         res.status(200).json({users})
//     }catch(error){
//         console.error("Error fetching users:", error);
//         throw error;
//     }
// })

const userData = asyncHandler(async (req, res) => {
    try {
      const users = await User.find({}, { name: 1, email: 1, mobile: 1, _id: 1 });
      res.status(200).json({ users });
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  });
  
  


const userBlock = asyncHandler(async(req,res)=> {
    try{
        const user = await User.findById(req.query.userId);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
          user.isBlocked = true;
          await user.save();
          res.status(200).json({ message: 'User blocked successfully' });
    }catch(error){
        console.error('Error blocking user:', error);
        res.status(500).json({ message: 'Server error' });
    }
})

const userUnblock = asyncHandler(async(req,res)=>{
    try{
        const user = await User.findById(req.query.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
          user.isBlocked = false;
          await user.save();
          res.status(200).json({message:'User unblocked succesfully'})
    }catch(error){
        console.error('Error Un blocking user:', error);
        res.status(500).json({ message: 'Server error' });
    }
})

export {adminLogin,  adminLogout, userData, userBlock, userUnblock}