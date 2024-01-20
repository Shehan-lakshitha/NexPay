import express from "express"
import bcrypt from "bcrypt"
import User from '../models/userModel.js'
import { errorHandler } from "../utils/error.js"
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
    next(errorHandler(400,"password do not match"))
  }else{
    const hashedPassword=bcrypt.hashSync(password,10)
    const newUser=new User({firstName,lastName,email,phoneNumber,NIC,password:hashedPassword})
    try {
        await newUser.save()
        res.status(201).json({success:true,message:"signup successfull."})  
    } catch (error) {
       next(error)
    }
  }
  

}

router.post("/register", registerController)
export { router as registerRoutes }
