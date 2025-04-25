import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Category } from "../models/category.model.js";


const createCategory = asyncHandler(async (req, res) => {
    const {name} =  req.body;

    if(!name){
        throw new ApiError(404, "name of category is required");
    }

    const category = await Category.create({
        name
    })


    return res.status(201)
    .json(new ApiResponse(200, category, "category is created"))
});

const getCategories = asyncHandler(async (_, res) => {
    const cateogries = await Category.find();
    return res.status(201)
    .json(new ApiResponse(200, cateogries, "categories fetched successfully"))
})

export {
    createCategory,
    getCategories
}