import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        index: true,
    },
    description : {
        type : String,
    },
    price : {
        type : Number,
        required : true
    },
    productImage : {
        type : String,
        required : true
    },
    category : {
        type : String,
        required : true,
    }
}, { timestamps: true })


export const Product = mongoose.model("Product", productSchema)