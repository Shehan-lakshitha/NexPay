import express from 'express';
import User from "../models/userModel.js"
import path from 'path';
const router=express.Router()


const imgDisplayController=async (req,res)=>{
   try {
    const {id}=req.params
const data=await User.findOne({_id:id})
 const imgPath = path.join('uploads', data.userImg ||'user.png');
  res.send({ imagePath: imgPath });
   } catch (error) {
     console.log(error)
   }

}
router.get('/display/:id',imgDisplayController)
export {router as imgDisplay}