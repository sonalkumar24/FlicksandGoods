const mongoose = require("mongoose")

const {Schema} = mongoose

const shippingSchema = new Schema({
    order_id:{
        type:mongoose.Schema.Types.ObjectID,
	    ref:"orders"
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectID,
	    ref:"user"
    },
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
    address:{
        type:String,
        required:true
    },
    pincode:{
        type:Number,
        required:false
    },
    status:{
        type:String,
        default:"Pending"
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model("shipping",shippingSchema)