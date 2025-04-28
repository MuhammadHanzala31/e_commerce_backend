import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Product } from "../models/product.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Category } from "../models/category.model.js";


const createProduct = asyncHandler(async (req, res) => {
    const { name, price, description, category } = req.body;
    if (!name && !price) {
        throw new ApiError(404, "all feilds are required")
    }

    const existedProduct = await Product.findOne({ name })

    if (existedProduct) {
        throw new ApiError(404, "product with same name is already exist")
    }

    const productImagePath = req.file?.path;
    console.log(productImagePath);

    const productImage = await uploadOnCloudinary(productImagePath);

    if (!productImage.url) {
        throw new ApiError(401, "something went wrong while uploading product image")
    }

    const product = await Product.create({
        name,
        description: description || "",
        price,
        productImage: productImage?.url,
        category,
    })


    return res.status(201)
        .json(new ApiResponse(200, product, "product created successfully"))


})

const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find();
    if (!products) {
        throw new ApiError(404, "products are not found")
    }
    return res.status(201)
        .json(new ApiResponse(200, products, 'product fetch sucessfully as category '))
})

const getProductsWithCategory = asyncHandler(async (req, res) => {
    const { categoryId } = req.params;
    const categoryExists = await Category.findById(categoryId);
    if (!categoryExists) {
        throw new ApiError(404, 'Category not found')
    }
    const products = await Product.find({ category: categoryId }).populate('category');
    if (!products) {
        throw new ApiError(401, "PRODUCTS ARE NOT FOUND")
    }
    return res.status(201)
        .json(new ApiResponse(200, products, 'product fetch sucessfully as category '))
})

const updateProductDetails = asyncHandler(async (req, res) => {
    const { productId } = req.params
    const { name, description, price, category } = req.body
    if (!name && !description && !price && !category) {
        throw new ApiError(404, "at-least one feild is required")
    }

    const product = await Product.findByIdAndUpdate(
        productId,
        {
            $set: {
                name: name?.trim(),
                description,
                price,
                category
            }
        },
        {
            new: true
        }

    )
    return res.status(201)
        .json(new ApiResponse(200, product, "product update successfully"))
})

const changeProductImage = asyncHandler(async (req, res) => {
    const { productId } = req.params
    const imageLocalPath = req.file?.path

    if (!imageLocalPath) {
        throw new ApiError(404, "upload an proper image")
    }

    const productImage = await uploadOnCloudinary(imageLocalPath)

    if (!productImage) {
        throw new ApiError(409, "something went wromg while uploading image please try again")
    }

    const product = await Product.findByIdAndUpdate(
        productId,
        {
            productImage : productImage?.url
        },
        {
            new  : true
        }
    )

    return res.status(201)
    .json(new ApiResponse(200, product,  "product Image update"))

})

const deleteProduct = asyncHandler(async (req, res) => {
    const { productId } = req.params
    if (!productId) {
        throw new ApiError(404, "product id is required")
    }

    const productDeleted = await Product.findByIdAndDelete(productId)

    if (!productDeleted) {
        throw new ApiError(500, 'something went wrong while deleting the product')
    }

    return res.status(200)
    .json(new ApiResponse(200, {}, "product deleted successfully"))

})

export {
    createProduct,
    getProductsWithCategory,
    getProducts,
    updateProductDetails,
    changeProductImage,
    deleteProduct

}

