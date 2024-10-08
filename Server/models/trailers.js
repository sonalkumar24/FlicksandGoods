const mongoose = require("mongoose")

const {Schema} = mongoose

const trailersSchema = new Schema({
    genres_id:{
        type:mongoose.Schema.Types.ObjectID,
	    ref:"genres"
    },
    name:{
        type:String,
        required:true
    },
    movie_details:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        
    },
    video:{
        type:String,
        
    },
    release_date:{
        type:Date,
        required:true
    },
    actor_name:{
        type:Array,
        required:true
    },
    ratings:{
        type:String,
    },
    media_type:{
        type:String,
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model("trailers",trailersSchema)