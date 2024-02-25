import express from "express"
import otpGenerator from "otp-generator"
import bcrypt from "bcrypt"
import { sendMail } from "../utils/mailSender.js"
import User from "../models/userModel.js"
const router = express.Router()

const lastOTPRequest = new Map()
const otpController =async (req, res,next) => {
  const {  email } = req.body
  try {
    const currentTime = Date.now()
    const lastRequestTime = lastOTPRequest.get(email)
    if (!lastRequestTime || currentTime - lastRequestTime >= 30000) {
      

      const token = otpGenerator.generate(6, {
        digits: true,
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
      })
      console.log(token)
      const hashedOtp=bcrypt.hashSync(token,10)
      await User.findOneAndUpdate({email},{otp:hashedOtp},{new:true})
        
          
        
          
          sendMail(email, token, res)
          lastOTPRequest.set(email, currentTime)
            return res.status(200).send({
              message: "OTP, and expiration time stored in database",success:true
      })

      
        
      
   
        
    } else {
      const timeLeft = 30000 - (currentTime - lastRequestTime)

      res.status(429).send({
        message: `Please wait ${
          timeLeft / 1000
        } seconds before requesting a new OTP`,success:false
      })
    }
  } catch (error) {
    console.log(error)

    return res
      .status(500)
      .send({ message: "Error registering user", error: error,success:false })
  }
}
router.post("/generate", otpController)
export { router as otpGenerate }
