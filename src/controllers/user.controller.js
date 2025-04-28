import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js"
import { ApiResponse } from "../utils/apiResponse.js";
import { User } from "../models/user.model.js";
import sendEmail from "../utils/sendMail.js";

const generateTokens = async function(userId){
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({validateBeforeSave : false})

    return {refreshToken, accessToken}
}

const registerUser = asyncHandler(async (req, res)=>{
    const {username, email, password} = req.body;
    if([username, email, password].some(e=>e?.trim() === "")){
        throw new ApiError(404, "All feilds are required")
    }

    const userCount = await User.countDocuments();

    let role = "user"

    if(userCount === 0){
        role = "admin"
    }

    console.log(userCount)
    
    const existedUser = await User.findOne({
        $or : [{email}, {username}]
    })

    if(existedUser){
        throw new ApiError(401, "user already exist with same email or username")
    }


    const user = await User.create({
        userName : username,
        email,
        password,
        role : role
    })

    const RegisterUser = await User.findById(user._id).select('-password -refreshToken')

    await sendEmail({
        to: email,
        subject: "Welcome to InnoSpark!",
        text: `Hi ${username}, welcome to our platform!`,
        html: `<h2>Welcome, ${username}!</h2><p>Thanks for signing up at zee commerce 🚀</p>`,
    });


    return res.status(201)
    .json(new ApiResponse(200, RegisterUser, "user created successfully"))
})

const loginUser = asyncHandler(async (req, res) => {
    const {email , password} = req.body

    if(!email){
        throw new ApiError(404, 'all feilds are required')
    }

    const user = await User.findOne({email});
    console.log(user)

    if(!user){
        throw new ApiError(401, "user not found")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if(!isPasswordValid){
        throw new ApiError(401, "password is incorrect")
    }

    const {refreshToken, accessToken} = await generateTokens(user._id)

    const loggedInUser = await User.findById(user._id).select('-refreshToken -password')

    const options = {
        httpOnly : true,
        secure : true
    }

    return res.status(201)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, {
        user : loggedInUser,
        refreshToken,
        accessToken
    }, "user logged in successfully"))
    
})

const logoutUser = asyncHandler(async (req, res)=>{
    const user = req.user;

    await User.findByIdAndUpdate(
        user?._id,
        {
          $unset : {
            refreshToken : 1
          }  
        },
        {
            new : true
        }
    )

    const options = {
        httpOnly : true,
        secure : true
    }

    return res.status(201)
    .clearCookie('accessToken', options)
    .clearCookie('refreshToken', options)
    .json(new ApiResponse(200, {}, "user logout successfully"))

})

const changePassword = asyncHandler(async (req, res)=>{
    const {oldPassword, newPassword} = req.body

    if(!oldPassword || !newPassword){
        throw new ApiError(404, "all feilds are required")
    }

    const existUser = await User.findById(req.user?._id);

    const isPasswordValid = await existUser.isPasswordCorrect(oldPassword)

    if(!isPasswordValid){
        throw new ApiError(401, "old password is incorrect")
    }

    if(newPassword === oldPassword){
        throw new ApiError(400, "same old password can not be the new password")
    }

    existUser.password = newPassword
    await existUser.save({validateBeforeSave : true})

  
    return res.status(201)
    .json(new ApiResponse(200, {}, "password is successfully changed"))
    
})

const changeUserDetails = asyncHandler(async(req, res)=>{
    const {username, email} = req.body;

    if(!username && !email){
        throw new ApiError(404, "all feilds are required")
    }

    const updatedUser = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set : {
                userName : username?.toLowerCase().trim(),
                email
            }
        },
        {
            new :  true
        }
    ).select("-refreshToken -password")

    return res.status(201)
    .json(new ApiResponse(200, updatedUser, 'user details updated'))
})

const getCurrentUser =  asyncHandler(async (req, res) => {
    const user = req.user;
    return res.status(201)
    .json(new ApiResponse(200, user, "fetch user successfully"))
})


const assignRole = asyncHandler(async (req, res) => {

    const { userId } = req.params;
    const { role } = req.body;

    if (!userId || !role) {
        throw new ApiError(404, "All fields are required");
    }

    const user = await User.findById(userId).select("-password -refreshToken");
    if (!user) {
        throw new ApiError(404, "User not found");
    }   

    user.role = role;
    await user.save({ validateBeforeSave: true });

    return res.status(201).json(new ApiResponse(200, user, "User role updated successfully"));

})

const deleteUser = asyncHandler(async(req, res)=>{
    const {userId} = req.params
    if(!userId){
        throw new ApiError(404, "userId is required")
    }

    await User.findByIdAndDelete(userId)

    return res.status(200)
    .json(new ApiResponse(200, {}, "user deleted successfuly"))
})

export {registerUser, loginUser, logoutUser, changePassword, changeUserDetails, getCurrentUser, assignRole, deleteUser}