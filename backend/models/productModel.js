import mongoose from "mongoose";
import { type } from "os";
const {ObjectId} =mongoose.Schema

const productSchema = mongoose.Schema({
    name: {type: String, required:true},
    image: {type: String, required:true},
    brand: {type:String, required:true},
    category:{type:ObjectId, ref:"Category", required:true},
    quantity: {type:Number, required:true},
    description: {type:String, required:true},
    price: {type:Number, required:true, default:0},
    countInStock: {type:Number, required:true, default:0},
},{timestamps:true})

const Product=mongoose.model('Product',productSchema)
export default Product

