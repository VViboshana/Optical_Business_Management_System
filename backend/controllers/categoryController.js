import Category from '../models/categoryModel.js'
import asyncHandler from '../middleware/asyncHandler.js'


const createCategory=asyncHandler(async(req,res)=>{
    try {
        const {name}=req.body;

        if (!name){
            return res.json({error: "Name is required"})
        }

        const existingCategory=await Category.findOne({name});

        if (existingCategory){
            return res.json({error: "Category already exists"});
        }

        const category=await new Category({name}).save();
        res.json(category);
 
        
    } catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }
})

const updateCategory=asyncHandler(async(req,res)=>{
    try {
        const {name}=req.body
        const {categoryId}=req.params

        const category=await Category.findOne({_id:categoryId})

        if (!category){
            return res.status(404).json({error: "Category not found"})
        }

        category.name=name;

        const updatedCategory= await category.save();
        res.json(updatedCategory);
        
    } catch (error) {
        console.error(error)
        res.status(500).json({error: "Internal server error"})
    }
})

const deleteCategory=asyncHandler(async(req,res)=>{
    try {
        const deletedCategory= await Category.findByIdAndDelete(req.params.categoryId)
        res.json(deletedCategory)
        
    } catch (error) {
        console.error(error)
        res.status(500).json({error: "Internal server error"})
    }
})

const viewAllCategory=asyncHandler(async(req,res)=>{
    try {
        const viewAll=await Category.find({})
        res.json(viewAll)
        
    } catch (error) {
        console.log(error)
        return res.status(400).json(error.message)
    }
})

const viewCategory=asyncHandler(async(req,res)=>{
    try {
        const viewOne=await Category.findOne({_id:req.params.categoryId})
        res.json(viewOne)
    } catch (error) {
        console.log(error)
        return res.status(400).json(error.message)
    }
})

export {createCategory,updateCategory,deleteCategory,viewAllCategory,viewCategory}