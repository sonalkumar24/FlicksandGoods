const mongoose = require("mongoose")

const {Schema} = mongoose

const adminSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    // profile_photo:{
    //     type:String,
    //     // required:true
    // },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model("admin",adminSchema)