const express = require('express')
const {Insert, Get, Delete, Update} = require('../controller/productsController')

const routes = express.Router()

const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'uploads/productImages')
    },
    filename : function(req, file, cb){
        cb(null, Date.now() + '-' + file.originalname)
    }
})
const upload = multer({ storage:storage })

routes.post("/insert", upload.single('photo'), Insert)

routes.get("/get", Get)
routes.get("/get/:id", Get)

routes.delete("/delete/:id", Delete)

routes.put("/update/:id", Update)


module.exports = routes
