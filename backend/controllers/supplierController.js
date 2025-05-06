import asyncHandler from "../middleware/asyncHandler.js";
import Supplier from "../models/supplierModel.js";

const addSupplier = asyncHandler(async(req, res) => {
    try {
        const { name, email, item, phoneNumber } = req.body;

        if (!name || !email || !item || !phoneNumber) {
            return res.status(400).json({error: "All fields are required"});
        }

        const supplier = new Supplier({
            name,
            email,
            item,
            phoneNumber
        });

        await supplier.save();
        res.status(201).json(supplier);
    } catch (error) {
        console.error(error);
        res.status(400).json(error.message);
    }
});

const updateSupplier = asyncHandler(async(req, res) => {
    try {
        const { name, email, item, phoneNumber } = req.body;

        if (!name || !email || !item || !phoneNumber) {
            return res.status(400).json({error: "All fields are required"});
        }

        const supplier = await Supplier.findByIdAndUpdate(
            req.params.supplierId,
            { name, email, item, phoneNumber },
            { new: true }
        );

        if (!supplier) {
            return res.status(404).json({error: "Supplier not found"});
        }

        res.json(supplier);
    } catch (error) {
        console.error(error);
        res.status(400).json(error.message);
    }
});

const deleteSupplier = asyncHandler(async(req, res) => {
    try {
        const supplier = await Supplier.findByIdAndDelete(req.params.supplierId);
        
        if (!supplier) {
            return res.status(404).json({error: "Supplier not found"});
        }
        
        res.json(supplier);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Server Error"});
    }
});

const getAllSuppliers = asyncHandler(async(req, res) => {
    try {
        const suppliers = await Supplier.find({}).sort({createdAt: -1});
        res.json(suppliers);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Server Error"});
    }
});

const getSupplier = asyncHandler(async(req, res) => {
    try {
        const supplier = await Supplier.findById(req.params.supplierId);
        
        if (!supplier) {
            return res.status(404).json({error: "Supplier not found"});
        }
        
        res.json(supplier);
    } catch (error) {
        console.error(error);
        res.status(404).json({error: "Supplier not found"});
    }
});

export { addSupplier, updateSupplier, deleteSupplier, getAllSuppliers, getSupplier };
