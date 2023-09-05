import mongoose from "mongoose";

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log('Database connected sucessfully')
    }catch(error){
        console.error(`Error: ${error.message}`);
        process.exit(1)
    }
}

export default connectDB;