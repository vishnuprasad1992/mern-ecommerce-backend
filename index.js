const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const {connectDb} = require("./DB/dbConnection.js");
const productRoute = require("./routes/productsRoute");
const userRoute = require("./routes/userRoute");
const orderRoute = require("./routes/orderRoute");
const path = require("path")

const app = express();
const port = process.env.PORT || 5000;
dotenv.config();
connectDb();
app.use(express.json());
app.use(express.urlencoded({
    extended:true
}))
app.use(cors());
app.use(morgan("tiny"));


app.use("/api/products",productRoute);
app.use("/api/user",userRoute)
app.use("/api/orders",orderRoute)

if(process.env.NODE_ENV ==="production"){
    app.use("/",express.static("../client/build"))

    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'..client/build/index.html'))
    })
}

app.listen(port,()=>{
    console.log(`server running on http://localhost:${port}`);
})