import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Product } from "../models/product.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Category } from "../models/category.model.js";


const createProduct = asyncHandler(async(req, res)=>{
    const {name, price, description, category} = req.body;
    if(!name && !price){
        throw new ApiError(404, "all feilds are required")
    }

    const existedProduct = await Product.findOne({name})

    if(existedProduct){
        throw new ApiError(404, "product with same name is already exist")
    }

    const productImagePath = req.file?.path;
    console.log(productImagePath);
    
    const productImage = await uploadOnCloudinary(productImagePath);

    if(!productImage.url){
        throw new ApiError(401, "something went wrong while uploading product image")
    }

    const product = await Product.create({
        name,       
        description : description  || "",
        price,
        productImage : productImage?.url ,
        category,
    })      


    return res.status(201)
    .json(new ApiResponse(200, product, "product created successfully"))


})

const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find();
    if(!products){
        throw new ApiError(404, "products are not found" )
    }
    return res.status(201)
    .json(new ApiResponse(200, products, 'product fetch sucessfully as category '))
})

const getProductsWithCategory = asyncHandler(async (req, res) => {
    const {categoryId} = req.params;
    const categoryExists = await Category.findById(categoryId);
    if (!categoryExists) {
    //   return res.status(404).json({ message: 'Category not found' });
    throw new ApiError(404, 'Category not found')
    }
    const products = await Product.find({category : categoryId }).populate('category');
    if(!products){
        throw new ApiError(401, "PRODUCTS ARE NOT FOUND")
    }
    return res.status(201)
    .json(new ApiResponse(200, products, 'product fetch sucessfully as category '))
})

export {
    createProduct,
    getProductsWithCategory,
    getProducts
}

