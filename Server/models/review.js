const mongoose = require("mongoose")

const {Schema} = mongoose

const reviewSchema = new Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectID,
	    ref:"user"
    },
    // product_id:{
    //     type:mongoose.Schema.Types.ObjectID,
	//     ref:"products"
    // },
    trailer_id:{
        type:mongoose.Schema.Types.ObjectID,
	    ref:"trailers"
    },
    message:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model("review",reviewSchema)