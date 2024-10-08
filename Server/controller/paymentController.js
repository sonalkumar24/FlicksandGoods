const PaymentSchema = require('../models/payment')
const bcryptjs = require('bcryptjs')
const jwt = require("jsonwebtoken")
const env = require("dotenv")
env.config()

const Insert = async (req, res) => {
    try {
        const { order_id, user_id, total_amount, payment_type } = req.body
        const payment = await PaymentSchema({ order_id, user_id, total_amount, payment_type })
        await payment.save()
        return res.json({ success: true, savedPayment: payment })

    }
    catch (err) {
        console.log("Error : " + err.message)
        res.status(500).send("Internal Server Error")
    }
}

const Get = async (req, res) => {
    try {
        if (req.params.id) {
            const payment = await PaymentSchema.findById(req.params.id)
            res.json({ success: true, payment })
        }
        else {
            const payments = await PaymentSchema.find().populate("user_id")
            res.json({ success: true, payments })
        }

    }
    catch (err) {
        console.log("Error : " + err.message)
        res.status(500).send("Internal Server Error")
    }
}



module.exports = { Insert, Get }