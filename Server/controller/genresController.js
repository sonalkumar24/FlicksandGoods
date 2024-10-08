const GenresSchema = require('../models/genres')
const bcryptjs = require('bcryptjs')
const jwt = require("jsonwebtoken")
const env = require("dotenv")
env.config()

const Insert = async(req, res) => {
    try{
        const {name} = req.body
        const check = await GenresSchema.findOne({name})
        if(check){
            return res.json({success:false, message:"genre already exists"})
        }
        else{
            const genres = await GenresSchema({name})
            await genres.save()
            return res.json({success:true,savedGenres:genres})
        }
    }
    catch(err){
        console.log("Error : "+err.message)
        res.status(500).send("Internal Server Error")
    }
}

const Get = async(req, res)=>{
    try{
        if(req.params.id){
            const genres = await GenresSchema.findById(req.params.id)
            res.json({success:true, genres})
        }
        else{
            const genres = await GenresSchema.find()
            res.json({success:true, genres})
        }
        
    }
    catch(err){
        console.log("Error : "+err.message)
        res.status(500).send("Internal Server Error")
    }
}

const Delete = async(req, res)=>{
    try{
        const id = req.params.id
        //console.log(id)
        const check = await GenresSchema.findById(id)
        if(!check){
            return res.json({success:false,message:"not found"})
        }
        else{
            const deletedData = await GenresSchema.findByIdAndDelete(id)
            return res.json({success:true, deletedData})
        }
        
    }
    catch(err){
        console.log("Error : "+err.message)
        res.status(500).send("Internal Server Error")
    }
}

const Update = async(req, res)=>{
    try{
        const id = req.params.id
        //console.log(id)
        const check = await GenresSchema.findById(id)
        if(!check){
            return res.json({success:false,message:"not found"})
        }
        else{
            const {name} = req.body
            const newData = {}
            if(name) { newData.name = name }
            const updatedData = await GenresSchema.findByIdAndUpdate(id,{$set:newData},{new:true})
            return res.json({success:true,updatedData})
        }
    }
    catch(err){
        console.log("Error : "+err.message)
        res.status(500).send("Internal Server Error")
    }
}



module.exports = {Insert,Get,Delete,Update}