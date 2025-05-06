import Product from '../models/productModel.js'
import Category from '../models/categoryModel.js'
import asyncHandler from '../middleware/asyncHandler.js'

// Generate inventory status report
const generateInventoryReport = asyncHandler(async (req, res) => {
    try {
        const products = await Product.find({})
            .populate('category', 'name')
            .sort({ countInStock: 1 });

        const report = {
            totalProducts: products.length,
            totalStockValue: products.reduce((sum, product) => sum + (product.price * product.countInStock), 0),
            lowStockProducts: products.filter(product => product.countInStock < 10),
            outOfStockProducts: products.filter(product => product.countInStock === 0),
            categoryWiseSummary: await getCategoryWiseSummary(),
            products
        };

        res.json(report);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error generating inventory report" });
    }
});

// Generate stock level report
const generateStockLevelReport = asyncHandler(async (req, res) => {
    try {
        const { threshold = 10 } = req.query;
        const products = await Product.find({ countInStock: { $lt: threshold } })
            .populate('category', 'name')
            .sort({ countInStock: 1 });

        res.json({
            threshold,
            lowStockProducts: products,
            totalLowStockItems: products.length
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error generating stock level report" });
    }
});

// Generate category-wise report
const generateCategoryReport = asyncHandler(async (req, res) => {
    try {
        const categories = await Category.find({});
        const categoryReport = await Promise.all(categories.map(async (category) => {
            const products = await Product.find({ category: category._id });
            return {
                category: category.name,
                totalProducts: products.length,
                totalStock: products.reduce((sum, product) => sum + product.countInStock, 0),
                totalValue: products.reduce((sum, product) => sum + (product.price * product.countInStock), 0),
                products
            };
        }));

        res.json(categoryReport);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error generating category report" });
    }
});

// Helper function to get category-wise summary
const getCategoryWiseSummary = async () => {
    const categories = await Category.find({});
    return Promise.all(categories.map(async (category) => {
        const products = await Product.find({ category: category._id });
        return {
            category: category.name,
            totalProducts: products.length,
            totalStock: products.reduce((sum, product) => sum + product.countInStock, 0),
            totalValue: products.reduce((sum, product) => sum + (product.price * product.countInStock), 0)
        };
    }));
};

export {
    generateInventoryReport,
    generateStockLevelReport,
    generateCategoryReport
}; 