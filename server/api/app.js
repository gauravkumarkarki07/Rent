import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoute from './routes/authRoute.js';
import userRoute from './routes/userRoute.js';
import cookieParser from 'cookie-parser';
dotenv.config();


mongoose.connect(process.env.mongodb_connection_string).then(()=>{
    console.log('database is connected')
}).catch((error)=>{
    console.log(error)
})

const app=express();

app.listen(process.env.port,()=>{
    console.log('server is running')
})

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth',authRoute);
app.use('/api/user',userRoute);


app.use('*',(req,res)=>{
    res.status(400).json({
        message:"No Routes Found"
    })
})


