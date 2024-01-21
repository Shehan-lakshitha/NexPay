import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import mongoose from "mongoose"
import { registerRoutes } from "./routes/registerRoute.js"


dotenv.config()
const PORT = 5000 
const app = express()
app.use(cors())
app.use(express.json())


mongoose.connect("mongodb+srv://projectnexpay:Lhmc5ACrVULs22rU@nexypay.s6xxylq.mongodb.net/nexpay?retryWrites=true&w=majority").then(()=>{
  console.log('database connected successfully..')
}).catch((err)=>{
  console.log('database connected unsuccessully',err)
})


app.use("/api", registerRoutes)
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})
