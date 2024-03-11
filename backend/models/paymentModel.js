import mongoose from 'mongoose'

const Payment = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
        
    },
    payments:[{
        paymentIntentId:{
            type: String,
            
        },
        type:{
           type:String
        },
        amount:{
            type:Number,
            
        },
        created:{
            type:Number
        },
    }   ]
});

const Pay = mongoose.model('Pay', Payment);

export default Pay;