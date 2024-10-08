const mongoose = require("mongoose")

const { Schema } = mongoose

const ordersSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectID,
        ref: "user"
    },
    product_details: [
        {
            product_id: { type: mongoose.Schema.Types.ObjectID, ref: "products" },
            quantity: { type: Number },
            price: { type: Number }
        }
    ],
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: "Pending"
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("orders", ordersSchema)