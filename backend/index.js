import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import mongoose from "mongoose"
import { registerRoutes } from "./routes/registerRoute.js"


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
app.use((error,req,res,next)=>{
  const errorStatusCode=error.status||500
  const errorMessage=error.message||'Internal error'
  return res.status(errorStatusCode).json({
      success:false,
      errorStatusCode,
      errorMessage
  })
})

app.use("/api", registerRoutes)
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})
