import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        // match: [/^\S+@\S+\.\S+$/,"Please enter a valid email address"]
    },
    address:{
        type: String,
        required: true,
         
    },
    phone:{
        type: Number,
        required: [true, "Phone number is required"],
        // match: [/^\d{10}$/, "Phone number must be exactly 10 digits"]
    },
    productIds: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Glass',
            required: true,
        }
    ],
    totalPrice: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['Processing', 'Delivered'],
        default: 'Processing'
    },
    deliveryDate: {
        type: Date,
        required: true
    }
},{
    timestamps:true,
})

const Order = mongoose.model('Order', orderSchema);

export default Order;