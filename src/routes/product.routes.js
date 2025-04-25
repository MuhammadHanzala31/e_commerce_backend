import {Router} from 'express'
import { upload } from '../middlewares/multer.middleware.js';
import { createProduct, getProducts, getProductsWithCategory } from '../controllers/product.controller.js';

const router = Router();

router.route('/create').post(upload.single('productImage'), createProduct)
router.route('/get-products/:categoryId').get(getProductsWithCategory)
router.route('/get-products').get(getProducts)


export default router