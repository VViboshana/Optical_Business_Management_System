import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

const addProduct = asyncHandler(async (req, res) => {
    try {
        const { name, description, price, category, quantity, brand, image } = req.fields;

        // Validate required fields including image
        switch (true) {
            case !name:
                return res.status(400).json({ error: "Name is required" });

            case !description:
                return res.status(400).json({ error: "Description is required" });

            case !price:
                return res.status(400).json({ error: "Price is required" });

            case !category:
                return res.status(400).json({ error: "Category is required" });

            case !quantity:
                return res.status(400).json({ error: "Quantity is required" });

            case !brand:
                return res.status(400).json({ error: "Brand is required" });

            case !image:
                return res.status(400).json({ error: "Product image is required" });
        }

        // Create new product with validated fields
        const product = new Product({ ...req.fields });
        await product.save();
        res.status(201).json(product);

    } catch (error) {
        console.error("Product creation error:", error);
        res.status(400).json({
            error: error.message || "Failed to create product",
            details: error.errors // Include validation errors if available
        });
    }
});

const updateProduct = asyncHandler(async (req, res) => {
    try {
        const { name, description, price, category, brand } = req.fields;

        switch (true) {
            case !name:
                return res.json({ error: "Name is required" });

            case !description:
                return res.json({ error: "Description is required" });

            case !price:
                return res.json({ error: "Price is required" });

            case !category:
                return res.json({ error: "Category is required" });

            case !brand:
                return res.json({ error: "Brand is required" });
        }

        const product = await Product.findByIdAndUpdate(req.params.productId, { ...req.fields }, { new: true });
        await product.save();
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(400).json(error.message);
    }
});

const deleteProduct = asyncHandler(async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.productId);
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
});

// Updated searchProduct with filters
const searchProduct = asyncHandler(async (req, res) => {
    try {
        const pageSize = 6;
        const { keyword, brand, minPrice, maxPrice } = req.query;

        // Build the query object
        let query = {};

        if (keyword) {
            query.name = { $regex: keyword, $options: "i" }; // Searching by product name
        }

        if (brand) {
            query.brand = { $regex: brand, $options: "i" }; // Searching by brand
        }

        if (minPrice) {
            query.price = { ...query.price, $gte: parseFloat(minPrice) }; // Filter by min price
        }

        if (maxPrice) {
            query.price = { ...query.price, $lte: parseFloat(maxPrice) }; // Filter by max price
        }

        // Get the total count of matching products
        const count = await Product.countDocuments(query);

        // Fetch the products based on the query
        const products = await Product.find(query)
            .limit(pageSize)
            .sort({ createdAt: -1 }); // You can modify the sort criteria as needed

        // Send the response with the products and pagination information
        res.json({
            products,
            page: 1,
            pages: Math.ceil(count / pageSize),
            hasMore: count > pageSize, // Indicating if there are more products
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
});

const viewProduct = asyncHandler(async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);

        if (product) {
            return res.json(product);
        } else {
            res.status(404);
            throw new Error("Product not found");
        }

    } catch (error) {
        console.error(error);
        res.status(404).json({ error: "Product not found" });
    }
});

const viewAllProduct = asyncHandler(async (req, res) => {
    try {
        const products = await Product.find({}).populate("category").limit(12).sort({ createAt: -1 });
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
});

export { addProduct, updateProduct, deleteProduct, searchProduct, viewProduct, viewAllProduct };
