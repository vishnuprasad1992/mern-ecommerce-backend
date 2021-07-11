const Orders = require("../models/orderModel");


const saveOrder = (data) =>{
    return new Promise(async(resolve,reject)=>{
        try {
            const orderData =await new Orders(data);
            const result =  orderData.save();
            resolve(result) 
        } catch (error) {
            reject(error)
        }
    })
}

const getOrdersByUserId = (userId) =>{
    return new Promise(async(resolve,reject)=>{
        try {
            const orders =await Orders.find({userId})
            if(orders){
                resolve(orders) 
            }
            else{
                reject({status:"error",message:"something went wrong"})
            }
        } catch (error) {
            reject(error)
        }
    })
}

const getOrdersById = (_id) =>{
    return new Promise(async(resolve,reject)=>{
        try {
            const orders =await Orders.findById({_id})
            if(orders){
                resolve(orders) 
            }
            else{
                reject({status:"error",message:"something went wrong"})
            }
        } catch (error) {
            reject(error)
        }
    })
}


const getTotalOrders = () =>{
    return new Promise(async(resolve,reject)=>{
        try {
            const totalOrders =await Orders.find({})
            if(totalOrders){
                resolve(totalOrders) 
            }
            else{
                reject({status:"error",message:"something went wrong"})
            }
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    saveOrder,
    getOrdersByUserId,
    getOrdersById,
    getTotalOrders
}