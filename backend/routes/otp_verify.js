import express from "express"
import bcrypt from "bcrypt"
import User from "../models/userModel.js"
const router = express.Router()


const otpVerifyController = async (req, res) => {
  const { email,otp } = req.body
  try {
           const user=await User.findOne({email})
           
           const validOtp=await bcrypt.compare(otp.toString(), user.otp) 
           console.log(validOtp)
           if(validOtp){
            const currentTime = Date.now()
            const expireTime=new Date(user.updatedAt).getTime()
            
            const expiredOtp = currentTime > expireTime+15*60*1000;

            //console.log(new Date(user.updatedAt).getTime())
            console.log(currentTime)
            if(expiredOtp){
              console.log("OTP has been expired")
              return res.status(200).send({message:"Unsuccessfull",success:false})
            }else{
              console.log("otp verify successfully")
                
                return res.status(200).send({message:"successfull",success:true})
            }

           }else{
            return res.send({ message: "otp not match",success:false })
           }
           
           

    
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .send({ message: "Error otp verification user", error: error })
  }
}

router.post("/otpverify", otpVerifyController)
export { router as otpVerify }
