import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { addToCart, deleteCartItem, showCart } from "../controllers/cart.controller.js";

const router = Router()

router.route('/add-item').post(verifyJwt, addToCart)
router.route('/show').get(verifyJwt, showCart)
router.route('/delete/:productId').delete(verifyJwt, deleteCartItem)


export default router