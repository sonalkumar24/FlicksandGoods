const mongoose = require("mongoose")

const {Schema} = mongoose

const productsSchema = new Schema({
    trailer_id:{
        type:mongoose.Schema.Types.ObjectID,
	    ref:"trailers"
    },
    name:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        required:false
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    color:{
        type:String,
        required:true
    },
    size:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model("products",productsSchema)