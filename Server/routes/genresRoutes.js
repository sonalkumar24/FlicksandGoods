const express = require('express')
const {Insert, Get, Delete, Update} = require('../controller/genresController')

const routes = express.Router()

routes.post("/insert", Insert)

routes.get("/get", Get)
routes.get("/get/:id", Get)

routes.delete("/delete/:id", Delete)

routes.put("/update/:id", Update)


module.exports = routes
