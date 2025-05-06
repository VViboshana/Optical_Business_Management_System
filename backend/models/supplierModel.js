import mongoose from "mongoose";

const supplierSchema = mongoose.Schema({
    name: { type: String, required: true }, // Brand name
    email: { type: String, required: true },
    item: { type: String, required: true },
    phoneNumber: { type: String, required: true },
}, { timestamps: true });

const Supplier = mongoose.model('Supplier', supplierSchema);
export default Supplier;
