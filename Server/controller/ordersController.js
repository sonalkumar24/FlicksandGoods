const OrderSchema = require('../models/orders')
const CartSchema = require('../models/cart')
const shippingSchema = require('../models/shipping')
const paymentSchema = require('../models/payment')
const bcryptjs = require('bcryptjs')
const jwt = require("jsonwebtoken")
const env = require("dotenv")
env.config()

const Insert = async (req, res) => {
    try {
        const { amount, address, email, phone, name, payment_type, pincode, transaction_id } = req.body;

        const uid = req.user;
        const cart = await CartSchema.find({ user_id: uid });

        // Extract product details from the cart
        const productDetails = cart.map(item => ({
            product_id: item.product_id,
            quantity: item.quantity,
            price: item.amount
        }));

        // Create the order with the extracted product details
        const orders = new OrderSchema({
            user_id: uid,
            product_details: productDetails,
            amount
        });

        await orders.save();

        let shipping = new shippingSchema({ name, phone, email, address, pincode, order_id: orders._id, user_id: uid })

        await shipping.save()

        let payment = new paymentSchema({ order_id: orders._id, user_id: uid, total_amount: amount, payment_type, transaction_id })

        await payment.save()

        await CartSchema.deleteMany({ user_id: uid });

        return res.json({ success: true, orders, shipping, payment });

    } catch (err) {
        console.log("Error: " + err.message);
        res.status(500).send("Internal Server Error");
    }
};


const Get = async (req, res) => {
    try {
        if (req.params.id) {
            const orders = await OrderSchema.findById(req.params.id).populate("product_details.product_id")
            res.json({ success: true, orders })
        }
        else {
            const orders = await OrderSchema.find().populate("product_details.product_id")
            const shippingPromises = orders.map(order => shippingSchema.findOne({ order_id: order._id }));
            const shippings = await Promise.all(shippingPromises);

            res.json({ success: true, orders, shippings });
        }

    }
    catch (err) {
        console.log("Error : " + err.message)
        res.status(500).send("Internal Server Error")
    }
}

const Delete = async (req, res) => {
    try {
        const id = req.params.id
        //console.log(id)
        const check = await OrderSchema.findById(id)
        if (!check) {
            return res.json({ success: false, message: "not found" })
        }
        else {
            const deletedData = await OrderSchema.findByIdAndDelete(id)
            return res.json({ success: true, deletedData })
        }

    }
    catch (err) {
        console.log("Error : " + err.message)
        res.status(500).send("Internal Server Error")
    }
}

const Update = async (req, res) => {
    try {
        const id = req.params.id;
        const check = await OrderSchema.findById(id);
        if (!check) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        const { status } = req.body;
        if (!status) {
            return res.status(400).json({ success: false, message: "Status is required" });
        }

        check.status = status;
        await check.save();

        return res.json({ success: true, order: check });
    } catch (err) {
        console.log("Error: " + err.message);
        res.status(500).send("Internal Server Error");
    }
};



module.exports = { Insert, Get, Delete, Update }