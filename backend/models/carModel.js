import mongoose from "mongoose";


const carSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    year:{
        type: Number,
        required: true
    },
    transmission:{
        type: String,
        required: true
    },
    fuel:{
        type: String,
    },
    type:{
        type: String,
        required: true
    },
    rent:{
        type: String,
        required: true
    },
    extraRent:{
        type: String,
        required: true
    },
    document:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    approved:{
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Owner'
      }
})  


const Car = mongoose.model('Car', carSchema);

export default Car;