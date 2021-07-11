const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name :{
        type:String,
        required:true
    },
    email :{
        type:String,
        required:true,
        unique:true
    },
    mobile :{
        type:String,
        required:true
    },
    isAdmin :{
        type: String,
        default : "false"
    },
    address :{
        type:String,
        required:true
    },
    password :{
        type:String,
        required:true
    },
},{timeStamps:true})


const User = mongoose.model("Users",userSchema);
module.exports = User;