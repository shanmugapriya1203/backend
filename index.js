
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const app =express();
app.use(cors())
app.use(express.json());
import userRoute from './routes/userRoutes.js';
import fitnessRoute from './routes/FitnessRoute.js'

const url=process.env.URL;
mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>console.log("MongoDb is connected"))
.catch((err)=>{
  console.log(err)
})

app.get('/',(req,res)=>{
 try{
  res.send("Welcome to fitness app")
 }
 catch(err){
console.log(err)
 }
})
app.use('/user',userRoute)
app.use('/fit',fitnessRoute);
const PORT=process.env.PORT || 8000;
app.listen(PORT,()=>{
  console.log(`Server is running on port ${process.env.PORT}`)
})