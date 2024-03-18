import express from 'express'
import User from '../models/userModel.js'
import bcrypt from "bcrypt"

const router=express.Router()

const reset=async(req,res)=>{
    const {email,password,rePassword}=req.body
    try {
        if (password !== rePassword) {
            return res.send({success:false,message:"Passwords do not match."})
          }else{
            const hashedPassword=bcrypt.hashSync(password,10)
            const user=await User.findOneAndUpdate({email},{password:hashedPassword})
            return res.status(200).json({success:true,message:"password reset successfully.",id:user._id})  
               
            }
    } catch (error) {
        console.log(error)
        res.status(500).send({success:false,message:'Server error.'})
    }
}
router.post('/resetpassword',reset)
export {router as reset}