const ConnectToMongo = require('./db')
ConnectToMongo()
const env = require('dotenv')
env.config()

const cors = require('cors')

const express = require('express') 

const app = express()

app.use(cors({
    origin: 'https://flicksngoods.netlify.app'
}))

app.use(express.json())


app.use("/api/photo", express.static('./uploads/images'))
// app.use("/api/video", express.static('./uploads/videos'))
app.use("/api/productImages", express.static('./uploads/productImages'))

app.use("/api/admin", require('./routes/adminRoutes'))

app.use("/api/user", require('./routes/userRoutes'))

app.use("/api/genres", require('./routes/genresRoutes'))

app.use("/api/trailers", require('./routes/trailersRoutes'))

app.use("/api/products", require('./routes/productsRoutes'))

app.use("/api/cart", require('./routes/cartRoutes'))

app.use("/api/order", require('./routes/ordersRoutes'))

app.use("/api/review", require('./routes/reviewRoutes'))

app.use("/api/payments", require('./routes/paymentRoutes'))

app.listen(process.env.PORT,()=>{
    console.log("app listening on PORT : "+process.env.PORT)
})