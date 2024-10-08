const ProductSchema = require('../models/products')
const bcryptjs = require('bcryptjs')
const jwt = require("jsonwebtoken")
const env = require("dotenv")
env.config()

const Insert = async (req, res) => {
    try {
        const { trailer_id, name, price, description, color, size } = req.body

        const check = await ProductSchema.findOne({ name })
        if (check) {
            return res.json({ success: false, message: "product already exists" })
        }
        else {
            const products = await ProductSchema({ trailer_id, name, photo: req.file.filename, price, description, color, size })
            await products.save()
            return res.json({ success: true, savedProducts: products })
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
            const products = await ProductSchema.find({ trailer_id: req.params.id }).populate("trailer_id")
            res.json({ success: true, products })
        }
        else {
            const products = await ProductSchema.find().populate("trailer_id")
            res.json({ success: true, products })
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
        const check = await ProductSchema.findById(id)
        if (!check) {
            return res.json({ success: false, message: "not found" })
        }
        else {
            const deletedData = await ProductSchema.findByIdAndDelete(id)
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
        const check = await ProductSchema.findById(id)
        if (!check) {
            return res.json({ success: false, message: "not found" })
        }
        else {
            const { trailer_id, name, photo, price, description, color, size } = req.body
            const newData = {}
            if (trailer_id) { newData.trailer_id = trailer_id }
            if (name) { newData.name = name }
            if (photo) { newData.photo = photo }
            if (price) { newData.price = price }
            if (description) { newData.description = description }
            if (color) { newData.color = color }
            if (size) { newData.size = size }
            const updatedData = await ProductSchema.findByIdAndUpdate(id, { $set: newData }, { new: true })
            return res.json({ success: true, updatedData })
        }
    }
    catch (err) {
        console.log("Error : " + err.message)
        res.status(500).send("Internal Server Error")
    }
}



module.exports = { Insert, Get, Delete, Update }