import express from "express"
import formidable from "express-formidable"
import checkId from "../middleware/checkId.js"
import { addProduct, updateProduct, deleteProduct, searchProduct, viewProduct,viewAllProduct } from "../controllers/productController.js"

const router = express.Router()

router.route("/create").post(formidable(),addProduct)
router.route('/update/:productId').put(formidable(),updateProduct)
router.route('/delete/:productId').delete(deleteProduct)
router.route('/search').get(searchProduct)
router.route('/get/:productId').get(viewProduct)
router.route('/read').get(viewAllProduct)





export default router