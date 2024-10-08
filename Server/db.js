const mongoose = require('mongoose');
const env = require('dotenv')
env.config()

const ConnectToMongo = async () => {
    try {
        await mongoose.connect(process.env.mongoURI)
        console.log("Connect to MongoDB Successful")
    } catch (err) {
        console.log("Connect to MongoDB Unsuccessful", err.message)
    }
}

module.exports = ConnectToMongo