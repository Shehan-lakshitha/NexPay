import express from "express"
import dotenv from "dotenv"
import bcrypt from "bcrypt"
import User from "../models/userModel.js"
import jwt from "jsonwebtoken"
const router = express.Router()
dotenv.config()
const loginController = async (req, res) => {
  const { email, password } = req.body
  try {
    const validUser=await User.findOne({email})
    if(!validUser)return res.send({success:false,message:"User not found."})
    const validPassword=bcrypt.compareSync(password,validUser.password)
  if(!validPassword)  return res.send({success:false,message:"Wrong credentials."}) 
  if(validUser && validPassword){
    const token = jwt.sign({ userId: validUser._id}, process.env.SECRETKEY);
    
    return res.cookie('access_token',token,{httpOnly:true}).status(200).send({token,id:validUser._id,email:validUser.email,success:true,message:"signup successfull."})
  } 
  
  } catch (error) {
    return res.send({success:false,message:"Server Error."})
  }
  
}
router.post("/login", loginController)

export { router as loginRoutes }
