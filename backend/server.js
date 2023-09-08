import express from "express";
import dotenv from 'dotenv';
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
dotenv.config();
import cookieParser from "cookie-parser";
const port = process.env.PORT || 5000;
import cors from 'cors';
import userRoutes from'./routes/userRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import ownerRoutes from './routes/ownerRoutes.js'


connectDB();
const app = express();

app.use(cors({origin:"http://localhost:3000", credentials:true}))

app.use(express.json());

app.use(express.urlencoded({extended: true}))
     
app.use(cookieParser());

app.use('/api/users', userRoutes)

app.use('/api/admin', adminRoutes)

app.use('/api/owner', ownerRoutes)

app.get('/',(req,res)=> res.send("server is ready"));

app.use(notFound);
app.use(errorHandler);


app.listen(port, () => console.log(`Server is running on port ${port}`));


