import mongoose from 'mongoose'

const cardSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
     paymentMethodId:{
        type: String,
        
    },
    cardNumber:{
        type:String,
        
    },
    expireData:{
        type:String
    },
    holderName:{
        type:String
    }
   
     

    
});

const Card = mongoose.model('Card', cardSchema);

export default Card;