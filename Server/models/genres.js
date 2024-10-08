const mongoose = require("mongoose")

const {Schema} = mongoose

const genresSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model("genres",genresSchema)