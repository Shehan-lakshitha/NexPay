import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import mongoose from "mongoose"
import { registerRoutes } from "./routes/registerRoute.js"
import { loginRoutes } from "./routes/loginRoute.js"
import { otpGenerate } from "./routes/otp_generator.js"


dotenv.config()
const PORT = process.env.PORT || 3000 
const app = express()
app.use(cors())
app.use(express.json())


mongoose.connect(process.env.MONGOURL).then(()=>{
  console.log('database connected successfully..')
}).catch((err)=>{
  console.log('database connected unsuccessully',err)
})


app.use("/api", registerRoutes)
app.use("/api", loginRoutes)
app.use("/api", otpGenerate)
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})
