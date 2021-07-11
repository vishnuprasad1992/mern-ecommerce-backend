const express = require("express");
const route = express.Router();
const {v4:uuidv4} = require("uuid");
const { saveOrder,getOrdersByUserId,getOrdersById,getTotalOrders } = require("../orders/orders");
const key= "sk_test_51JAVDlSAjehwtp59l3ZsZihJSObbbwZ3tjmAd2ciTTFy1xJPMZJy6oiNF0CK9QiqBYGjvoW1sPP7hrKNdMx7XOLi00b5iL4DqS";
const stripe = require("stripe")(key);
 

route.post("/place_order", async (req,res)=>{

    const { token, subTotal,currentUser,cartItems }=req.body
    const customer = await stripe.customers.create({
        email:token.email,
        source :token.id
    })
    const payment = await stripe.charges.create({
        amount: subTotal *100, 
        customer:customer.id,
        currency:"inr",
        receipt_email : token.email
    },{
        idempotencyKey: uuidv4()
    })
    if(payment){
        const orderData = {
            userId: currentUser._id,
            name: currentUser.name,
            email: currentUser.email,
            orderItems: cartItems,
            orderAmount:subTotal,
            transactionId:token.card.id,
            shippingAddress:{
                address:token.card.address_line1,
                city: token.card.address_city,
                pin:token.card.address_zip,
                country : token.card.address_country
            },
            isDelivered : false
        }

        const result = await saveOrder(orderData)
        if(result){
            res.status(200).json({
                status:"success",
                message : "Order placed successfull"
            })
        }else{
            res.status(403).json({
                status:"error",
                message : "something went wrong"
            })
        }

    }
    else{
        res.json({
            message:"payment failed"
        })
    }

})


route.post("/get_all_orders", async (req,res)=>{

    const {userId} = req.body;

    const result = await getOrdersByUserId(userId)

    if(result){
        res.status(200).json(result)
    }
    else{
        res.status(404).json({status:"error",message:"something went wrong"})
    }
})

route.post("/get_single_order", async (req,res)=>{

    const {_id} = req.body;

    const result = await getOrdersById(_id)

    if(result){
        res.status(200).json(result)
    }
    else{
        res.status(404).json({status:"error",message:"something went wrong"})
    }
})


route.post("/all_orders", async (req,res)=>{

    const result = await getTotalOrders()

    if(result){
        res.status(200).json(result)
    }
    else{
        res.status(404).json({status:"error",message:"something went wrong"})
    }
})



module.exports =route