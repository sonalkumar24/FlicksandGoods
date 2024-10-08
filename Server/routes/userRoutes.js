const express = require('express')
const {Register,Login, Get, Delete, Update} = require('../controller/userController')

const routes = express.Router()

routes.post("/register", Register)

routes.get("/get", Get)
routes.get("/get/:id", Get)

routes.delete("/delete/:id", Delete)

routes.put("/update/:id", Update)
routes.post("/login", Login)


module.exports = routes
