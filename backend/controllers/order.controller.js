import Order from "../models/order.model.js";

export const createAOrder = async(req, res) => {
    try {
        const orderData = req.body;
        // Calculate delivery date (3 days from now)
        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + 3);
        
        var newOrder = new Order({
            ...orderData,
            deliveryDate,
            status: 'Processing'
        });
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    } catch(error) {
        console.error("Error creating an order", error);
        res.status(500).json({message:"Failed to create the order"});
    }
};

export const getOrderByEmail = async (req, res) => {
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

export const getOneOrderById = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findById(orderId);
        if(!order) return res.status(404).json({message: "Order not found"});
        res.json(order);
    } catch (error) {
        console.error("Error fetching order", error);
        res.status(500).json({message: "Failed to fetch order"});
    }
};

export const updateOrderStatus = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findByIdAndUpdate(
            orderId,
            { status: 'Delivered' },
            { new: true }
        );
        if (!order) return res.status(404).json({ message: "Order not found" });
        res.json(order);
    } catch (error) {
        console.error("Error updating order status", error);
        res.status(500).json({ message: "Failed to update order status" });
    }
};