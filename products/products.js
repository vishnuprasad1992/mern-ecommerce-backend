const products = require("../models/productsModel");



const createNewProduct =  (data)=>{
    return new Promise(async (resolve,reject)=>{
        try {
            const newProduct = await  products(data);
            const result = newProduct.save();
            if(result){
                resolve(result)
            }else{
                reject("something went wrong")
            }
        } catch (error) {
            reject(error)
        }
    })
}

const getAllProducts =  ()=>{
    return new Promise(async (resolve,reject)=>{
        try {
            const response = await  products.find();
            resolve(response)
        } catch (error) {
            reject(error)
        }
    })
}

const getSingleProduct =  (_id)=>{
    return new Promise(async (resolve,reject)=>{
        try {
            const response = await  products.findById(_id);
            resolve(response)
        } catch (error) {
            reject(error)
        }
    })
}

const deleteProduct = (_id)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            const product =await products.findByIdAndRemove({_id})
            if(product){
                resolve(product);
            }
            else{
                reject("product not deleted")
            }
        } catch (error) {
            console.log(error);
            reject(error.message) 
        }
    })
}


const updateProduct = (_id,data)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            const product =await products.findByIdAndUpdate({_id},data,{new:true})
           if(product){
                resolve(product);
            }
            else{
                reject("product not updated")
            }
        } catch (error) {
            console.log(error);
            reject(error.message) 
        }
    })
}

module.exports = {
    getAllProducts,
    getSingleProduct,
    deleteProduct,
    createNewProduct,
    updateProduct
}