import {Router} from 'express'
import { upload } from '../middlewares/multer.middleware.js';
import { changeProductImage, createProduct, deleteProduct, getProducts, getProductsWithCategory, updateProductDetails } from '../controllers/product.controller.js';
import { verifyJwt } from '../middlewares/auth.middleware.js';
import { checkAdmins } from '../middlewares/checkAdmin.js';

const router = Router();

router.route('/create').post(upload.single('productImage'), createProduct)
router.route('/get-products/:categoryId').get(getProductsWithCategory)
router.route('/get-products').get(getProducts)
router.route('/update-details/:productId').put(verifyJwt, checkAdmins, updateProductDetails)
router.route('/update-Image/:productId').put(verifyJwt, checkAdmins, upload.single('productImage'), changeProductImage)
router.route('/delete/:productId').delete(verifyJwt, checkAdmins, deleteProduct )


export default router