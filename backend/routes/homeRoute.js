import express from "express"
import User from "../models/userModel.js"
const router = express.Router()

const homeController=async (req,res)=>{
 const {email}=req.params

 try {
    const validUser=await User.findOne({email})
    if(!validUser){
        return res.send({success:false,message:"User not found."})
    }else{
        return res.send(validUser)
    }
 } catch (error) {
    console.log(error)
    return res.status(500).send({ success: false, message: "Internal server error" });
 }

}
const accountController=async (req,res)=>{
 const {id}=req.body
 
 try {
    const validUser=await User.findOne({_id:id})
    if(!validUser){
        return res.send({success:false,message:"User not found."})
    }else{
        return res.send(validUser)
    }
 } catch (error) {
    console.log(error)
    return res.status(500).send({ success: false, message: "Internal server error" });
 }

}
router.get('/home/:email',homeController)
router.get('/details/:email',homeController)
router.post('/details/account',accountController)
export {router as homeRoutes}