import { Router } from "express";
import { createCategory, getCategories } from "../controllers/category.controller.js";

const router = Router()

router.route('/create').post(createCategory)
router.route('/get-category').get(getCategories)

export default router