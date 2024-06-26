import mongoose from 'mongoose'

const Users= new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
        
    },
    users:[{
        userId:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            
        },
        img:{
            type:String
           
        },
        name:{
            type:String
        }
    }   ]
});

const Others = mongoose.model('Others', Users);

export default Others;