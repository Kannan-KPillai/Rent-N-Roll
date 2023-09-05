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
        type:Number,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required:true
    },
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