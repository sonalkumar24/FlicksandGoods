const express = require('express')
const { Insert, Get, Delete, Update, GetSeries, GetMovies } = require('../controller/trailersController')

const multer = require('multer')


// Configure storage for images
const storageImage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/images');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});



// Function to determine storage based on file type
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         if (file.fieldname === 'photo') {
//             cb(null, 'uploads/images');
//         } else if (file.fieldname === 'video') {
//             cb(null, 'uploads/videos');
//         }
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname);
//     }
// });

const upload = multer({ storage: storageImage });



const routes = express.Router()

routes.post("/insert", upload.single('photo'), Insert)

routes.get("/get/all", Get)
routes.get("/get/movies", GetMovies)

routes.get("/get/series", GetSeries)
routes.get("/get/:id", Get)

routes.delete("/delete/:id", Delete)

routes.put("/update/:id", Update)


module.exports = routes
