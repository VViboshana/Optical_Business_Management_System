const Order = require("../models/order.model");

const createAOrder = async(req, res) => {
    try {
        var newOrder = new Order(req.body);
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    } catch(error) {
        console.error("Error creating an order", error);
        res.status(500).json({message:"Failed to create the order"});
    }
};

const getOrderByEmail = async (req, res) => {
    try {
        const email = req.query.email;
        const orders = await Order.find({email}).sort({createdAt: -1});

        if(!orders.length === 0){
            return res.status(404).json({message:"Order not found"});
        }res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching orders", error);
        res.status(500).json({message:"Failed to fetch order"});
    }
};

module.exports = {
    createAOrder,
    getOrderByEmail
}