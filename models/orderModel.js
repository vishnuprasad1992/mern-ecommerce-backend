const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    orderItems: [
        {
            name: {
                type: String,
                required: true
            },
            _id: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    orderAmount: {
        type: Number,
        required: true
    },
    transactionId: {
        type: String,
        required: true
    },
    shippingAddress: {
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        pin: {
            type: Number,
            required: true
        },
        country: {
            type: String,
            required: true
        }
    },
    isDelivered: false,
    createdAt:{
        type: Date,
        default: new Date
    }
},{timeStamps:true})

const orders = mongoose.model("orders", orderSchema);

module.exports = orders;