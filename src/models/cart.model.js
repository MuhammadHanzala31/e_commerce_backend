import mongoose from "mongoose";


const cartItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
    },
    price: {
        type: Number,
        required: true,
    },
}, { timestamps: true });

const cartSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    cartItems: [cartItemSchema],
    totalPrice: {
        type: Number,
        default: 0,
        required: true
    }
}, { timestamps : true })


export const Cart = mongoose.model('Cart', cartSchema)