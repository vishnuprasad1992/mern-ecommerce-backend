const express = require("express");
const route = express.Router();
const {getAllProducts,getSingleProduct,deleteProduct,createNewProduct,updateProduct} = require("../products/products")


route.post("/add_new_product",async (req,res)=>{
    try {
        const data = req.body
        const createdProduct = await createNewProduct(data);
        if(createdProduct){
            return res.status(200).json({status:"success",message:"Product created successfully"});
        }
        else{
            return res.status(200).json({status:"error",message:"something went wrong,please try again"});
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json(error.message) 
    }
})


route.get("/",async (req,res)=>{
    try {
        const allProducts = await getAllProducts();
        if(allProducts.length){
            return res.status(200).json({status:"success",result:allProducts});
        }
        else{
            return res.status(200).json({status:"error",message:"Sorry no records found"});
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json(error.message) 
    }
})

route.get("/:id",async (req,res)=>{
     const {id}= req.params
    try {
        const singleProduct = await getSingleProduct(id);
        if(singleProduct){
            return res.status(200).json({status:"success",result:singleProduct});
        }
        else{
            return res.status(200).json({status:"error",message:"Sorry no records found"});
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json(error.message) 
    }
})

route.post("/add_reviews",async (req,res)=>{
    const {review,productId,currentUser}= req.body;
    const { rating,comment } = review
   try {
       const product = await getSingleProduct(productId);
       const review = {
            userId : currentUser._id,
            name : currentUser.name,
            rating : rating,
            comments : comment
       }
       const {reviews} = product;
       reviews.push(review);
       const averageRating =  product.reviews.reduce((acc,x)=> acc+x.rating,0)/product.reviews.length;
       product.rating = averageRating 
       const result = product.save()
       if(result){
           res.status(200).json({ status:"success", message:"review added successfully"}) 
       }
   } catch (error) {
       console.log(error)
       return res.status(400).json(error.message) 
   }
})


route.delete("/delete/:id", async (req, res) => {
    try {
        const {id} = req.params
        const result = await deleteProduct(id);
        if (result) {
            res.status(201).json({ status: "success", message: "Product deleted successfull" })
        }
        else {
            res.status(500).json({ status: "error", message: "something went wrong, please try again later" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ status: "error", message: error.message })
    }
})


route.patch("/update/:id", async (req, res) => {
    try {
        const {id} = req.params
        const body = req.body
        const result = await updateProduct(id,body);
        if (result) {
            res.status(201).json({ status: "success", message: "Product updated successfully" })
        }
        else {
            res.status(500).json({ status: "error", message: "something went wrong, please try again later" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ status: "error", message: error.message })
    }
})


module.exports=route;