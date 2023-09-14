import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
    type:{
        type: String,
        required: true
    },
    price:{
        type:Number,
        required: true
    },
    extraPrice:{
        type:Number,
        required: true
    }
})

const Category = mongoose.model('Category', categorySchema);

export default Category;