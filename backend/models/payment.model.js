import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const paymentSchema = new Schema({
    cardHolderName: {
        type: String,
        required: true
    },
    cardNumber: {
        type: String,
        required: true
    },
    expiryDate: {
        type: String,
        required: true
    },
    cvv: {
        type: String,
        required: true
    }

},{
    timestamps: true
});

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;
 