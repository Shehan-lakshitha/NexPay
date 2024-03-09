import express from "express"
import Stripe from 'stripe';
import Card from "../models/cardModel.js";
import User from "../models/userModel.js";
import Wallet from "../models/walletModel.js";
import Pay from "../models/paymentModel.js";

const router = express.Router()
const stripe = new Stripe('sk_test_51Oh4IYEyzMUhUrfVnThV1wzNrbnLyu2VplOqtktgFeFUX5JFNyYtTOrWQ2pQpMctEFBB8ojvPy4kggw1YBPbXD4I00UI1v9lBg');

const createUser=async(req,res)=>{
     const {id}=req.body
 
  
     try {
    const user=await User.findOne({_id:id})
     if(!user) return res.status(401).send({message:"invalid user",success:false})
    if(user){
        const customer=await stripe.customers.create({
            email:user.email,
            name:user.firstName,
            phone:user.phoneNumber,
            
        })
        const wallet=new Wallet({userId:id,customerId:customer.id})
        await wallet.save()
        res.status(200).send({success:true,message:'create user successfully'})
    }
     
  } catch (error) {
    console.log(error)
    return res.status(404).send({message:"Server error",success:false})
  }
     

}

const paymentMethod=async(req,res)=>{
        const {id,token,name}=req.body
        
        try {
            const details=await Wallet.findOne({userId:id})
           
    const payMethod=await stripe.paymentMethods.create({
        type:"card",
        card:{
            token:token
            
        }
    })
    await stripe.paymentMethods.attach(payMethod.id,{
        customer:details.customerId
    })
     console.log(payMethod.card.last4)
    const card=new Card({userId:id,paymentMethodId:payMethod.id,cardNumber:payMethod.card.last4,expireData:`${payMethod.card.exp_month}/${payMethod.card.exp_year}`,holderName:name})
    await card.save()
    res.status(200).send({success:true,message:'payment method added successfully'})

        } catch (error) {
            console.log(error)
            return res.status(404).send({message:"Server error",success:false})
        }
    
}

const carddetails=async(req,res)=>{
    const {id}=req.body
    const response=await Card.findOne({userId:id})
    if(response){
        res.send(response)
    }
}

const addCredit=async(req,res)=>{
    const {id,total}=req.body
    try {
        const data=await Card.findOne({userId:id})
        const dataWallet=await Wallet.findOne({userId:id})
        console.log(data.paymentMethodId)
        const user=await User.findOne({_id:id})
        if(data.paymentMethodId){
            const paymentIntent=await stripe.paymentIntents.create({
                payment_method:data.paymentMethodId,
                customer:dataWallet.customerId,
                amount:total,
                currency:'usd',
                confirm:true,
                payment_method_types:["card"],
                receipt_email:user.email
            }) 
            if(paymentIntent.status==="succeeded"){
                 const totalBalance=dataWallet.balance+total
                 await Wallet.findOneAndUpdate({userId:id},{balance:totalBalance})
                 res.status(200).send({success:true,message:'Credit add successfully'})
                 try {
                    const existingPayment = await Pay.findOne({ userId: id});
                     if(existingPayment){
                        await Pay.findOneAndUpdate(
                            { userId: id },
                            {
                                $push: {
                                    payments: {
                                        paymentIntentId: paymentIntent.id,
                                        type:'add credit',
                                        amount: paymentIntent.amount,
                                        created: paymentIntent.created
                                    }
                                }
                            }
                        );
                     }else{
                        const newPayment=new Pay({userId:id,payments:{ paymentIntentId:paymentIntent.id,type:'add credit',amount:paymentIntent.amount,created:paymentIntent.created}})
                        await newPayment.save()
                     }
                    
                 } catch (error) {
                    console.log(error)
                    res.status(404).send({success:false,message:'Server error'})
                 }
                
            }
            
        }
       
    } catch (error) {
        console.log(error)
    }

    
}


const nexPayment=async(req,res)=>{
    const {id,total}=req.body
    try {
        const dataMethod=await Card.findOne({userId:id})
        const dataWallet=await Wallet.findOne({userId:id})
        if(dataWallet.balance>total){
            const paymentIntent=await stripe.paymentIntents.create({
                payment_method:dataMethod.paymentMethodId,
                customer:dataWallet.customerId,
                amount:total,
                currency:'usd',
                confirm:true,
                payment_method_types:["card"],
                
            })  
            

            if(paymentIntent.status==="succeeded"){

                const totalBalance=dataWallet.balance-total
                     await Wallet.findOneAndUpdate({userId:id},{balance:totalBalance})
                     await Pay.findOneAndUpdate(
                        { userId: id },
                        {
                            $push: {
                                payments: {
                                    paymentIntentId: paymentIntent.id,
                                    type:'payment',
                                    amount: paymentIntent.amount,
                                    created: paymentIntent.created
                                }
                            }
                        }
                    );
                    
                     res.status(200).send({success:true,message:'payment successfully'})
                     
            }
        }else{
            res.send({success:false,message:'insufficient balance'})
        }
    } catch (error) {
        console.log(error)
    }
}


router.post('/createuser',createUser)
router.post('/paymentmethod',paymentMethod)
router.post('/carddetails',carddetails)
router.post('/addcredit',addCredit)
router.post('/nexpayment',nexPayment)
export default router