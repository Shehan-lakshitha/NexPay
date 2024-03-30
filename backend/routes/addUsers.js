import express from 'express'
import Stripe from 'stripe';
import User from '../models/userModel.js'
import Wallet from '../models/walletModel.js'
import Others from '../models/users.js'
import Card from '../models/cardModel.js'
import Pay from '../models/paymentModel.js';

const stripe = new Stripe('sk_test_51Oh4IYEyzMUhUrfVnThV1wzNrbnLyu2VplOqtktgFeFUX5JFNyYtTOrWQ2pQpMctEFBB8ojvPy4kggw1YBPbXD4I00UI1v9lBg');

const router=express.Router()

const addUser=async(req,res)=>{
    const {email,id}=req.body
try {
    const user=await User.findOne({email})
    console.log(id)

    try {
        if(user){
            const newfriend=new Others({userId:id,users:[{userId:user._id,email:email,img:user.userImg,name:user.firstName}]})
            await newfriend.save()
           res.send({success:true,message:'add user success'})
        }
    } catch (error) {
        
        res.send({success:false,message:'invalid user'}) 
    }

} catch (error) {
    console.log(error)
    res.send({success:false,message:'invalid user'})
    
}

}
const quickTransfer=async(req,res)=>{
    const {id,userId,amount}=req.body
    try {
        const dataMethod=await Card.findOne({userId:id})
        const dataWallet=await Wallet.findOne({userId:id})
        if(dataWallet.balance>amount){
            const paymentIntent=await stripe.paymentIntents.create({
                payment_method:dataMethod.paymentMethodId,
                customer:dataWallet.customerId,
                amount:amount,
                currency:'usd',
                confirm:true,
                payment_method_types:["card"],
                
            })  
            

            if(paymentIntent.status==="succeeded"){
                try {
                    
                    const totalBalance=dataWallet.balance-amount
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
                    const friendWallet=await Wallet.findOne({userId:userId}) 
                    if(friendWallet){
                        
                       const totalAmount=friendWallet.balance+amount
                    await Wallet.findOneAndUpdate({userId:userId},{balance:totalAmount})
                    await Pay.findOneAndUpdate(
                       { userId: userId },
                       {
                        $push: {
                               payments:[ {
                                   paymentIntentId: paymentIntent.id,
                                   type:'add credit',
                                   amount: paymentIntent.amount,
                                   created: paymentIntent.created
                               }]
                            }
                       }
                   );
                    }

                    res.status(200).send({success:true,message:'payment successfully'})

                } catch (error) {
                    console.log(error)
                }

               
                     
            }
        }else{
            res.send({success:false,message:'insufficient balance'})
        }
        
    } catch (error) {
        console.log(error)
    }
}
const userDetails=async(req,res)=>{
    const {id}=req.body
    try {
        const user=await Others.findOne({userId:id})
        res.send(user)
    } catch (error) {
        console.log(error)
    }
}
const uDetails=async(req,res)=>{
    const {id}=req.body
    try {
        const user=await User.findOne({_id:id})
        res.send(user)
    } catch (error) {
        console.log(error)
    }
}
router.post('/adduser',addUser)
router.post('/adduserdetails',userDetails)
router.post('/udetails',uDetails)
router.post('/quicktransfer',quickTransfer)
export {router as addUser}