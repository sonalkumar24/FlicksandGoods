const express = require('express')
const { InsertTrailerReview, Get, Delete } = require('../controller/reviewController')
const userMiddleware = require('../middleware/userMiddleware')

const routes = express.Router()

routes.post("/insert/:id", userMiddleware, InsertTrailerReview)

routes.get("/get", Get)
routes.get("/get/:id", Get)
// routes.get("/get/:id", Get)

routes.delete("/delete/:id", Delete)


module.exports = routes
