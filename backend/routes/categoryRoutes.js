import express from "express";
const router= express.Router()
import { createCategory,updateCategory,deleteCategory,viewAllCategory,viewCategory } from "../controllers/categoryController.js";

router.route("/create").post(createCategory);
router.route('/update/:categoryId').put(updateCategory);
router.route('/delete/:categoryId').delete(deleteCategory);
router.route('/read').get(viewAllCategory);
router.route('/get/:categoryId').get(viewCategory)



export default router;
