const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config()

const connectDb = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL,{
            useCreateIndex:true,
            useFindAndModify:false,
            useUnifiedTopology:true,
            useNewUrlParser:true
        });
        console.log("mongodb connected sucessfully")
    } catch (error) {
        console.log(error.message)
    }
}


module.exports = {
    connectDb
}