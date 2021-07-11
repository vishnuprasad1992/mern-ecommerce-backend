const express = require("express");
const route = express.Router();
const { createNewUser,
    findUserByEmail,
    findUserByEmailForLogin,
    updateExistingUser,
    getAllExistingUsers,
    deleteUser } = require("../users/users");
const bcrypt = require("bcrypt")


route.post("/register", async (req, res) => {
    try {
        const { name, email, mobile, address, password, cPassword } = req.body;
        const userExist = await findUserByEmail(email)
        if (userExist) {
            return res.status(401).json({ status: "error", message: "User allready exist" })
        }
        if (password === cPassword) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const newUser = {
                name,
                email,
                mobile,
                address,
                password: hashedPassword
            }
            const result = await createNewUser(newUser);
            if (result) {
                res.status(201).json({ status: "success", message: "user created successfully" })
            }
        }
        else {
            res.status(500).json({ status: "error", message: "something went wrong, please try again later" })
        }
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message })
    }

})


route.post("/login", async (req, res) => {
    try {
        const logEmail = req.body.email;
        const logPassword = req.body.password
        const userDetails = await findUserByEmailForLogin(logEmail);
        if (!userDetails || !userDetails._id) {
            return res.status(401).json({ status: "error", message: "email or Password invalid" })
        }
        const passwordToBeVerified = userDetails.password;
        const { name, _id, email, mobile, address, password,isAdmin } = userDetails;
        const dataToBeSend = {
            name, _id, email, mobile, address,isAdmin
        }
        const verify = await bcrypt.compare(logPassword, passwordToBeVerified);
        if (verify) {
            res.status(200).json({ status: "success", message: "logged in successfully", loginDetails: dataToBeSend })
        }
        else {
            res.status(401).json({ status: "error", message: "email or Password invalid" })
        }
    } catch (error) {
        res.status(401).json({ status: "error", message: error.message })
    }

})

route.patch("/update", async (req, res) => {
    try {
        const { name, email, mobile, address, password, cPassword } = req.body;
        const userDetails = await findUserByEmailForLogin(email);
        const id = userDetails._id
        if (password === cPassword) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const updatedData = {
                name,
                email,
                mobile,
                address,
                password: hashedPassword
            }
            const result = await updateExistingUser(id, updatedData);
            if (result) {
                res.status(201).json({ status: "success", message: "user updated successfully" })
            }
        }
        else {
            res.status(500).json({ status: "error", message: "something went wrong, please try again later" })
        }
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message })
    }

})

route.get("/get_all_users", async (req, res) => {
    try {
        const userDetails = await getAllExistingUsers();
        if (userDetails) {
            res.status(201).json({ status: "success", message: "user fetching successfull", users: userDetails })
        }
        else {
            res.status(500).json({ status: "error", message: "something went wrong, please try again later" })
        }
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message })
    }

})

route.delete("/delete/:id", async (req, res) => {
    try {
        const {id} = req.params
        const result = await deleteUser(id);
        if (result) {
            res.status(201).json({ status: "success", message: "user deleted successfull" })
        }
        else {
            res.status(500).json({ status: "error", message: "something went wrong, please try again later" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ status: "error", message: error.message })
    }
})



module.exports = route;