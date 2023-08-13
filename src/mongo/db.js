const mongoose=require('mongoose')
const dotenv=require('dotenv').config()

const mongooseconn= async ( MONGO_URI) => {
    try {
        await mongoose.connect(MONGO_URI)
        console.log("Connected to mongoose")
    } catch (error) {
        console.log(error);
    }
}


module.exports = {mongooseconn}