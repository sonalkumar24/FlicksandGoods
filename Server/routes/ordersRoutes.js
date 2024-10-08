const express = require('express')
const { Insert, Get, Delete,Update } = require('../controller/ordersController')
const userMiddleware = require('../middleware/userMiddleware')

const routes = express.Router()

routes.post("/insert", userMiddleware, Insert)

routes.get("/get", Get)
routes.get("/get/:id", Get)

routes.delete("/delete/:id", Delete)

routes.put("/update/:id", Update)


module.exports = routes
