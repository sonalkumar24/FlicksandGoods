const mongoose = require("mongoose")

const {Schema} = mongoose

const cartSchema = new Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectID,
	    ref:"user"
    },
    product_id:{
        type:mongoose.Schema.Types.ObjectID,
	    ref:"products"
    },
    amount:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model("cart",cartSchema)