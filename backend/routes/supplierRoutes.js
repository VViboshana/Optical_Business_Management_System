import express from "express";
import { addSupplier, updateSupplier, deleteSupplier, getAllSuppliers, getSupplier } from "../controllers/supplierController.js";

const router = express.Router();

router.post("/", addSupplier);
router.put("/:supplierId", updateSupplier);
router.delete("/:supplierId", deleteSupplier);
router.get("/", getAllSuppliers);
router.get("/:supplierId", getSupplier);

export default router;
