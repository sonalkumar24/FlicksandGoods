const express = require('express')
const { Get } = require('../controller/paymentController')

const routes = express.Router()

routes.get("/get", Get)

routes.get("/get/:id", Get)

// routes.delete("/delete/:id", Delete)


module.exports = routes
