import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";

const checkAdmins = asyncHandler(async (req, _, next) => {

        const user = req.user;

        if(!user){
            throw new ApiError(404, "user is not found")
        }

        if (!user || user?.role !== 'admin') {
            throw new ApiError(403, "Access denied. Admins only.");
        }
        next()
})


export {
    checkAdmins
}