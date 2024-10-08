const TrailerSchema = require('../models/trailers')
const GenresSchema = require('../models/genres')
const bcryptjs = require('bcryptjs')
const jwt = require("jsonwebtoken")
const moment = require("moment")
const env = require("dotenv")
env.config()

const Insert = async (req, res) => {
    try {
        const { genres_id, name, movie_details, video, release_date, actor_name, ratings, media_type } = req.body
        console.log(req.file)
        // console.log(req.files['video'][0])
        const photo = req.file.filename
        // const video = req.files['video'][0].filename
        const check = await TrailerSchema.findOne({ name })
        if (check) {
            return res.json({ success: false, message: "trailer already exists" })
        }
        else {
            const trailers = await TrailerSchema({ genres_id, name, movie_details, photo, video, release_date, actor_name, ratings, media_type })
            await trailers.save()
            return res.json({ success: true, savedTrailers: trailers })
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
            const trailers = await TrailerSchema.findById(req.params.id).populate("genres_id")
            res.json({ success: true, trailers })
        }
        else {
            const trailers = await TrailerSchema.find().populate("genres_id")
            res.json({ success: true, trailers })
        }

    }
    catch (err) {
        console.log("Error : " + err.message)
        res.status(500).send("Internal Server Error")
    }
}

const GetMovies = async (req, res) => {
    try {
        if (req.params.id) {
            const trailers = await TrailerSchema.findById(req.params.id).populate("genres_id")
            const genres = await GenresSchema.find()
            res.json({ success: true, trailers, genres })
        }
        else {
            const trailers = await TrailerSchema.find({ media_type: "Movie" }).populate("genres_id")
            const genres = await GenresSchema.find()
            res.json({ success: true, trailers, genres })
        }

    }
    catch (err) {
        console.log("Error : " + err.message)
        res.status(500).send("Internal Server Error")
    }
}
const GetSeries = async (req, res) => {
    try {

        const trailers = await TrailerSchema.find({ media_type: "TV Series" }).populate("genres_id")
        const genres = await GenresSchema.find()
        res.json({ success: true, trailers, genres })

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
        const check = await TrailerSchema.findById(id)
        if (!check) {
            return res.json({ success: false, message: "not found" })
        }
        else {
            const deletedData = await TrailerSchema.findByIdAndDelete(id)
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
        const check = await TrailerSchema.findById(id)
        if (!check) {
            return res.json({ success: false, message: "not found" })
        }
        else {
            const { genres_id, name, movie_details, photo, video, release_date, actor_name, ratings, media_type } = req.body
            const newData = {}
            if (genres_id) { newData.genres_id = genres_id }
            if (name) { newData.name = name }
            if (movie_details) { newData.movie_details = movie_details }
            if (photo) { newData.photo = photo }
            if (video) { newData.video = video }
            if (release_date) { newData.release_date = release_date }
            if (actor_name) { newData.actor_name = actor_name }
            if (ratings) { newData.ratings = ratings }
            if (media_type) { newData.media_type = media_type }
            const updatedData = await TrailerSchema.findByIdAndUpdate(id, { $set: newData }, { new: true })
            return res.json({ success: true, updatedData })
        }
    }
    catch (err) {
        console.log("Error : " + err.message)
        res.status(500).send("Internal Server Error")
    }
}



module.exports = { Insert, Get, Delete, Update, GetSeries, GetMovies }