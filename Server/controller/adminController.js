const AdminSchema = require('../models/admin')
const UserSchema = require('../models/user')
const OrderSchema = require('../models/orders')
const paymentSchema = require('../models/payment')
const productSchema = require('../models/products')
const genresSchema = require('../models/genres')
const TrailerSchema = require('../models/trailers')
const bcryptjs = require('bcryptjs')
const jwt = require("jsonwebtoken")
const env = require("dotenv")
env.config()

const Register = async (req, res) => {
    try {
        const { name, phone, email, password, address } = req.body
        const check = await AdminSchema.findOne({ email })
        if (check) {
            return res.json({ success: false, message: "email already exists" })
        }
        else {
            const salt = await bcryptjs.genSalt(10)
            // console.log(salt)
            const secPass = await bcryptjs.hash(password, salt)
            const admin = await AdminSchema({ name, phone, email, password: secPass, address })
            await admin.save()
            return res.json({ success: true, savedAdmin: admin })
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
            const admin = await AdminSchema.findById(req.params.id)
            res.json({ success: true, admin })
        }
        else {
            const admin = await AdminSchema.find()
            res.json({ success: true, admin })
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
        const check = await AdminSchema.findById(id)
        if (!check) {
            return res.json({ success: false, message: "not found" })
        }
        else {
            const deletedData = await AdminSchema.findByIdAndDelete(id)
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
        const id = req.params.id
        //console.log(id)
        const check = await AdminSchema.findById(id)
        if (!check) {
            return res.json({ success: false, message: "not found" })
        }
        else {
            const { name, phone, email, password, address, profile_photo } = req.body
            const newData = {}
            if (name) { newData.name = name }
            if (phone) { newData.phone = phone }
            if (email) { newData.email = email }
            if (password) {
                const salt = await bcryptjs.genSalt(10)
                const secPass = await bcryptjs.hash(password, salt)
                newData.password = secPass
            }
            if (address) { newData.address = address }
            if (profile_photo) { newData.profile_photo = profile_photo }
            const updatedData = await AdminSchema.findByIdAndUpdate(id, { $set: newData }, { new: true })
            return res.json({ success: true, updatedData })
        }
    }
    catch (err) {
        console.log("Error : " + err.message)
        res.status(500).send("Internal Server Error")
    }
}

const Login = async (req, res) => {
    try {
        const { email, password } = req.body
        const check = await AdminSchema.findOne({ email })
        if (check) {
            const passwordCompare = await bcryptjs.compare(password, check.password)
            if (!passwordCompare) {
                return res.json({ success: false, message: "Incorrect email or password" })
            }
            else {
                const data = check.id
                const token = await jwt.sign(data, process.env.JWT_SECRET)
                return res.json({ success: true, message: "Login Successful", token })
            }
        }
        else {
            return res.json({ success: false, message: "Incorrect email or password" })
        }
    }
    catch (err) {
        console.log("Error : " + err.message)
        res.status(500).send("Internal Server Error")
    }
}
const Count = async (req, res) => {
    try {
        const userCount = await UserSchema.countDocuments()
        const orderCount = await OrderSchema.countDocuments()
        const productCount = await productSchema.countDocuments()
        const trailerCount = await TrailerSchema.countDocuments()
        const genresCount = await genresSchema.countDocuments()
        const payments = await paymentSchema.find();

        // Compute the total amount using reduce
        const totalAmount = payments.reduce((total, payment) => total + payment.total_amount, 0);

        return res.json({ success: false, userCount, orderCount, productCount, trailerCount, totalAmount, genresCount })

    }
    catch (err) {
        console.log("Error : " + err.message)
        res.status(500).send("Internal Server Error")
    }
}


module.exports = { Register, Get, Delete, Update, Login, Count }