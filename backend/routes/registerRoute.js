import express from "express"
import bcrypt from "bcrypt"
import User from '../models/userModel.js'

const router = express.Router()
const registerController = async(req, res,next) => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    NIC,
    password,
    confirmPassword,
  } = req.body
  if (password !== confirmPassword) {
    return res.send({success:false,message:"Passwords do not match."})
  }else{
    const hashedPassword=bcrypt.hashSync(password,10)
    const newUser=new User({firstName,lastName,email,phoneNumber,NIC,password:hashedPassword})
    try {
        await newUser.save()
       return res.status(201).json({success:true,message:"signup successfull."})  
    } catch (error) {
      
      if(error.code===11000){
        return res.send({success:false,message:"Email is already in use."})
      }else{
        return res.send({success:false,message:"Server Error."})
      }
      
       
    }
  }
  

}

router.post("/register", registerController)
export { router as registerRoutes }
