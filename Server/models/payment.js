const mongoose = require("mongoose")

const { Schema } = mongoose

const paymentSchema = new Schema({
    order_id: {
        type: mongoose.Schema.Types.ObjectID,
        ref: "orders"
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectID,
        ref: "user"
    },
    total_amount: {
        type: Number,
        required: true
    },
    payment_type: {
        type: String,
        required: true
    },
    transaction_id: {
        type: String,
        required: false
    },
    status: {
        type: String,
        default: "Active"
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("payment", paymentSchema)