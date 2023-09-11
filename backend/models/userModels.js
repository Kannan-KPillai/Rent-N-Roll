import mongoose from "mongoose";
import bcrypt from 'bcryptjs';


const userSchema = mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    mobile:{
        type:String,
        required: false,
    },
    password:{
        type:String,
        required:false
    },
    isBlocked: {
        type: Boolean,
        default: false, 
    },
    otp: {
        type: String, 
      },
      isVerified:{
        type: Boolean,
        default: false
      }
},{
    timestamps:true
});


userSchema.pre('save', async function (next) {
    if (!this.isModified('password') && !this.isModified('confirmPassword')) {
        return next();
    }
    try {
        if (this.isModified('password')) {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
        }
        return next();
    } catch (error) {
        return next(error);
    }
});

userSchema.methods.matchPassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model('User',userSchema);

export default User;