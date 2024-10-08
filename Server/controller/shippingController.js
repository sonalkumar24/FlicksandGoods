const ShippingSchema = require('../models/shipping')
const bcryptjs = require('bcryptjs')
const jwt = require("jsonwebtoken")
const env = require("dotenv")
env.config()

const Insert = async(req, res) => {
    try{
        const {order_id, user_id, name, phone, email, address} = req.body
        const shipping = await ShippingSchema({order_id, user_id, name, phone, email, address})
        await shipping.save()
        return res.json({success:true,savedShipping:shipping})
    
    }
    catch(err){
        console.log("Error : "+err.message)
        res.status(500).send("Internal Server Error")
    }
}

const Get = async(req, res)=>{
    try{
        if(req.params.id){
            const shipping = await ShippingSchema.findById(req.params.id)
            res.json({success:true, shipping})
        }
        else{
            const shipping = await ShippingSchema.find()
            res.json({success:true, shipping})
        }
        
    }
    catch(err){
        console.log("Error : "+err.message)
        res.status(500).send("Internal Server Error")
    }
}

const Delete = async(req, res)=>{
    try{
        const id = req.params.id
        //console.log(id)
        const check = await ShippingSchema.findById(id)
        if(!check){
            return res.json({success:false,message:"not found"})
        }
        else{
            const deletedData = await ShippingSchema.findByIdAndDelete(id)
            return res.json({success:true, deletedData})
        }
        
    }
    catch(err){
        console.log("Error : "+err.message)
        res.status(500).send("Internal Server Error")
    }
}

// const Update = async(req, res)=>{
//     try{
//         const id = req.params.id
//         //console.log(id)
//         const check = await ShippingSchema.findById(id)
//         if(!check){
//             return res.json({success:false,message:"not found"})
//         }
//         else{
//             const {order_id, user_id, name, phone, email, address} = req.body
//             const newData = {}
//             if(order_id) { newData.order_id = order_id }
//             if(user_id) { newData.user_id = user_id }
//             if(name) { newData.name = name }
//             if(phone) { newData.phone = phone }
//             if(email) { newData.email = email }
//             if(address) { newData.address = address }
//             const updatedData = await ShippingSchema.findByIdAndUpdate(id,{$set:newData},{new:true})
//             return res.json({success:true,updatedData})
//         }
//     }
//     catch(err){
//         console.log("Error : "+err.message)
//         res.status(500).send("Internal Server Error")
//     }
// }


module.exports = {Insert,Get,Delete}