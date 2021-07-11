const mongoose= require("mongoose");

const reviewSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    name:{
        type:String,
        required :true
    },
    rating:{
        type:Number,
        required :true
    },
    comments:{
        type:String,
    }
},{
    timeStamps:true
})
const productSchema = mongoose.Schema({
    name:{
        type:String,
        required :true
    },
    image:{
        type:String,
        required :true
    },
    category:{
        type:String,
        required :true
    },
    countInStock:{
        type:Number,
        required :true
    },
    price:{
        type:Number,
        required :true
    },
    description:{
        type:String,
        required :true
    },
    rating:{
        type:Number
    },
    reviews:[reviewSchema]
},
{
    timeStamps:true
})


const products = mongoose.model("products",productSchema);

module.exports = products;