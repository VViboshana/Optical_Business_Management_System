import Payment from '../models/payment.model.js';

export const createPayment = async (req, res) => {
    try {
        const {cardHolderName, cardNumber, expiryDate, cvv} = req.body;

        const payment = await Payment.create({
            cardHolderName,
            cardNumber,
            expiryDate,
            cvv
        });

        res.status(201).json(payment);
    }catch(error){
        console.error('Error creating payment: ', error);
        res.status(500).json({message: 'Server Error. please try again.'});
    }
};