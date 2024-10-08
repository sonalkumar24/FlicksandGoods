const ReviewSchema = require('../models/review')
const bcryptjs = require('bcryptjs')
const jwt = require("jsonwebtoken")
const env = require("dotenv")
env.config()

const InsertTrailerReview = async (req, res) => {
    try {
        const { message } = req.body
        const { id } = req.params
        const uid = req.user
        console.log(uid, 12121212)
        const review = await ReviewSchema({ trailer_id: id, user_id: uid, message }).populate('user_id')
        await review.save()
        res.json({ success: true, review })

    }
    catch (err) {
        console.log("Error : " + err.message)
        res.status(500).send("Internal Server Error")
    }
}

const Get = async (req, res) => {
    try {
        if (req.params.id) {
            const reviews = await ReviewSchema.find({ trailer_id: req.params.id }).populate('user_id')
            res.json({ success: true, reviews })
        }
        else {
            const reviews = await ReviewSchema.find().populate(["user_id", "trailer_id"])
            res.json({ success: true, reviews })
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
        const check = await ReviewSchema.findById(id)
        if (!check) {
            return res.json({ success: false, message: "not found" })
        }
        else {
            const deletedData = await ReviewSchema.findByIdAndDelete(id)
            return res.json({ success: true, deletedData })
        }

    }
    catch (err) {
        console.log("Error : " + err.message)
        res.status(500).send("Internal Server Error")
    }
}


module.exports = { InsertTrailerReview, Get, Delete }