import mongoose from 'mongoose'

const newSchema=mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        
    },
    lastName:{
        type:String,
        required:true,
        
    },
    email:{
        type:String,
        required:true,
        unique:true
        
    },
    NIC:{
        type:String,
        required:true,
        unique:true
    },
    phoneNumber:{
        type:Number,
        required:true,
        
    },
   
    password:{
        type:String,
        required:true,
        
    },
    otp:{
        type:String,
        
    },
    userImg:{
        type:String,

    },
    pin:{
        type:Number,
        unique:true
    }
   
    
},{timestamps:true})
const User= mongoose.model('User',newSchema)
export default User;