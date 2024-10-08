const ProductSchema = require('../models/products')
const CartSchema = require('../models/cart')
const OrderSchema = require('../models/orders')
const bcryptjs = require('bcryptjs')
const jwt = require("jsonwebtoken")
const env = require("dotenv")
env.config()

const Insert = async (req, res) => {
    try {
        const { _id, amount } = req.body
        const user_id = req.user
        console.log(_id, "product_id")
        let quantity = 1;
        const check = await CartSchema.findOne({ user_id, product_id: _id })
        if (check) {
            check.quantity += 1;
            check.amount = check.quantity * amount;
            await check.save();
            return res.json({ success: true, message: "Cart updated successfully", cart: check });
        }
        else {
            const cart = await CartSchema({ user_id, product_id: _id, amount, quantity })
            await cart.save()
            return res.json({ success: true, cart })
        }
    }
    catch (err) {
        console.log("Error : " + err.message)
        res.status(500).send("Internal Server Error")
    }
}

const Get = async (req, res) => {
    try {
        if (req.params.id) {
            const cart = await CartSchema.find({ user_id: req.params.id }).populate('product_id')
            res.json({ success: true, cart })
        }
        else {
            const cart = await CartSchema.find().populate('product_id')
            const uid = req.user
            console.log(uid,11)
            const orders = await OrderSchema.find({ user_id: uid }).populate("product_details.product_id")
            res.json({ success: true, cart, orders })
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
        const check = await CartSchema.findById(id)
        if (!check) {
            return res.json({ success: false, message: "not found" })
        }
        else {
            const deletedData = await CartSchema.findByIdAndDelete(id)
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
        const id = req.params.id; // Get the cart item ID from the request parameters
        const { quantity } = req.body; // Get the new quantity from the request body

        const cartItem = await CartSchema.findById(id).populate('product_id'); // Find the cart item by ID
        if (!cartItem) {
            return res.json({ success: false, message: "Cart item not found" }); // If not found, return a message
        }
        
        // Check if quantity is valid
        if (isNaN(quantity) || quantity < 1) {
            return res.status(400).json({ success: false, message: "Invalid quantity" });
        }

        // Calculate amount
        const price = cartItem.product_id.price; // Ensure price is correctly retrieved
        const amount = price * quantity; // Calculate the new amount

        // Update quantity and amount
        cartItem.quantity = quantity;
        cartItem.amount = amount;

        await cartItem.save(); // Save the updated cart item

        return res.json({ success: true, message: "Cart updated successfully", cartItem });
    } catch (err) {
        console.log("Error: " + err.message);
        res.status(500).send("Internal Server Error");
    }
};


module.exports = { Insert, Get, Delete, Update }