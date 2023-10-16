"use strict";
import express from "express";
import path from 'path';
import dotenv from 'dotenv';
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from 'cors';
import userRoutes from'./routes/userRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import ownerRoutes from './routes/ownerRoutes.js'



dotenv.config();
const port = process.env.PORT || 5000;

connectDB();
const app = express();

app.use(cors({origin:"http://localhost:3000", credentials:true}))

app.use(express.json());

app.use(express.urlencoded({extended: true}))
     
app.use(cookieParser());
app.use('/uploads',express.static('uploads'))

app.use('/api/users', userRoutes)

app.use('/api/admin', adminRoutes)

app.use('/api/owner', ownerRoutes)

if(process.env.NODE_ENV === 'production'){
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, 'frontend/dist')));

    app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html')));
}else{
    app.get('/',(req,res)=> res.send("server is ready"));
}



app.use(notFound);
app.use(errorHandler);


app.listen(port, () => console.log(`Server is running on port ${port}`));


