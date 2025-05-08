import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import activityRoutes from './routes/activityRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import cors from "cors";

const app = express();
app.use(cors()); 
//connecting to server 
app.listen(5000,()=>{
    console.log("Connected to server on port 5000");
})

app.use(express.json());
dotenv.config();

//connect to db
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Connected to DB successfully :)"))
.catch((err) => console.error("Connection to DB was unsuccessful:", err));


app.use('/api/auth', authRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/bookings', bookingRoutes);
