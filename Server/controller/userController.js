const UserSchema = require('../models/user')
const bcryptjs = require('bcryptjs')
const jwt = require("jsonwebtoken")
const env = require("dotenv")
env.config()

const Register = async (req, res) => {
    try {
        const { name, phone, email, password } = req.body
        const check = await UserSchema.findOne({ email })
        if (check) {
            return res.json({ success: false, message: "email already exists" })
        }
        else {
            const salt = await bcryptjs.genSalt(10)
            // console.log(salt)
            const secPass = await bcryptjs.hash(password, salt)
            const user = await UserSchema({ name, phone, email, password: secPass })
            await user.save()
            return res.json({ success: true, savedUser: user })
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
            const user = await UserSchema.findById(req.params.id)
            res.json({ success: true, user })
        }
        else {
            const user = await UserSchema.find()
            res.json({ success: true, user })
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
        const check = await UserSchema.findById(id)
        if (!check) {
            return res.json({ success: false, message: "not found" })
        }
        else {
            const deletedData = await UserSchema.findByIdAndDelete(id)
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
        const check = await UserSchema.findById(id)
        if (!check) {
            return res.json({ success: false, message: "not found" })
        }
        else {
            const { name, phone, email } = req.body
            const newData = {}
            if (name) { newData.name = name }
            if (phone) { newData.phone = phone }
            if (email) { newData.email = email }
            const updatedData = await UserSchema.findByIdAndUpdate(id, { $set: newData }, { new: true })
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
        const check = await UserSchema.findOne({ email })
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

module.exports = { Register, Get, Delete, Update, Login }