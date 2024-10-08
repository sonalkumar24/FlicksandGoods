const express = require('express')
const {Register, Get, Delete, Update, Login,Count} = require('../controller/adminController')

const routes = express.Router()

routes.post("/register", Register)

routes.get("/get", Get)
routes.get("/get/:id", Get)

routes.get('/count/all',Count)

routes.delete("/delete/:id", Delete)

routes.put("/update/:id", Update)

routes.post("/login", Login)

module.exports = routes
