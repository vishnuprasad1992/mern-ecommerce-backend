const User = require("../models/userModel");

const createNewUser = (userData)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            const newUser =await new User(userData);
            const result = await newUser.save();
            resolve(result);
        } catch (error) {
            console.log(error);
            reject(error.message)
        }
    })
}

const findUserByEmailForLogin = (email)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            const userDetails =await User.findOne({email})
            if(userDetails){
                resolve(userDetails);
            }
            else{
                resolve({status:"error",message:"email or password not correct"})
            }
        } catch (error) {
            reject(error.message)
        }
    })
}

const findUserByEmail = (email)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            const userDetails =await User.findOne({email})
            if(userDetails){
                resolve(true);
            }
            else{
                resolve(false)
            }
        } catch (error) {
            reject(error.message)
        }
    })
}

const updateExistingUser = (_id,userData)=>{
    return new Promise(async(resolve,reject)=>{
        try {

            const result = await User.findByIdAndUpdate({_id},userData)
            resolve(result);
        } catch (error) {
            console.log(error);
            reject(error.message)
        }
    })
}

const getAllExistingUsers = ()=>{
    return new Promise(async(resolve,reject)=>{
        try {
            const users =await User.find({})
            if(users){
                resolve(users);
            }
            else{
                reject("users not found")
            }
        } catch (error) {
            reject(error.message)
        }
    })
}

const deleteUser = (_id)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            const users =await User.findByIdAndRemove({_id})
            if(users){
                resolve(users);
            }
            else{
                reject("users not deleted")
            }
        } catch (error) {
            console.log(error);
            reject(error.message) 
        }
    })
}


module.exports={
    createNewUser,
    findUserByEmail,
    findUserByEmailForLogin,
    updateExistingUser,
    getAllExistingUsers,
    deleteUser
}