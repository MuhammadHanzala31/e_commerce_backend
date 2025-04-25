import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Cart } from "../models/cart.model.js";
import { Product } from "../models/product.model.js";


const addToCart = asyncHandler(async (req, res) => {
    const userId = req.user._id
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const price = product.price;
    let cart = await Cart.findOne({ userId });

    if (!cart) {
        cart = await Cart.create({
            userId,
            cartItems: [{ productId, quantity, price }],
            totalPrice: quantity * price,
        });

        return res.status(201).
            json(new ApiResponse(200, cart, "item add into cart successfully"))
    }
    else {
        const existingItem = cart.cartItems.find(item => item.productId.toString() === productId);

        if (existingItem) {
            existingItem.quantity += quantity;
            existingItem.price += price;
        } else {
            cart.cartItems.push({ productId, quantity, price });
        }

        cart.totalPrice = cart.cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0);

        await cart.save();
        return res.status(201).json(new ApiResponse(200, cart, "cart updated successfully"))

    }
})


const showCart = asyncHandler(async (req, res) => {

    const userId = req.user._id

    const cart = await Cart.findOne({ userId }).populate("cartItems.productId");

    if (!cart) {
        throw new ApiError(404, "cart not found")
    }

    return res.status(200).json(new ApiResponse(200, cart, "cart items fetch successfully"));
})

const deleteCartItem = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { productId } = req.params;

    if (!productId) {
        throw new ApiError(400, 'Product ID is required');
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
        throw new ApiError(404, 'Cart not found');
    }

    // Filter out the item
    cart.cartItems = cart.cartItems.filter(
        (item) => item.productId.toString() !== productId
    );

    // Recalculate total price
    cart.totalPrice = cart.cartItems.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0
    );

    await cart.save();

    return res.status(200).json(new ApiResponse(200, cart, "remove item successfully"));
});

const updateCart = asyncHandler( async (req, res) => {

    const user = req.user._id
    const {quantity} = req.body;
    const {productId} = req.params;


    if(!quantity || !productId){
        throw new ApiError(400, "quantity and productId is required")
    }

    const cart = await Cart.find({userId : user})

    if(!cart){
        throw new ApiError(404, "cart not found")
    }
    
    const cartItem = cart.cartItems.find(item => item.productId.toString() === productId)
    
    if(!cartItem){
        throw new ApiError(404, "cartItem not found")
    }

    cartItem.quantity = quantity
    await cart.save()
    return res.status(201).json(new ApiResponse(200, cart, "cart update successfuly"))
})


export {
    addToCart,
    showCart,
    deleteCartItem
}