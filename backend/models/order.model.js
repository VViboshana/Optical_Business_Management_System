//Kumod and Salini
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
         
    },
    phone:{
        type: Number,
        required: true,
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
    }
},{
    timestamps:true,
})

module.exports = mongoose.model('Order', orderSchema);