//Kumod
const mongoose = require('mongoose');
const express = require('express');
const Order = require('../models/order.model');
const Glass = require('../models/glass.model');
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const totalOrders = await Order.countDocuments();

        const totalSales = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    totalSales: { $sum: "$totalPrice" },
                }
            }
        ]);

        const trendingGlassesCount = await Glass.aggregate([
            { $match: { trending: true } }, 
            { $count: "trendingGlassesCount" }
        ]);
        
        const trendingGlasses= trendingGlassesCount.length > 0 ? trendingGlassesCount[0].trendingGlassesCount : 0;

        const totalGlasses = await Glass.countDocuments();

        const monthlySales = await Order.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } }, 
                    totalSales: { $sum: "$totalPrice" }, 
                    totalOrders: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }  
        ]);

        res.status(200).json({  totalOrders,
            totalSales: totalSales[0]?.totalSales || 0,
            trendingGlasses,
            totalGlasses,
            monthlySales, });
      
    } catch (error) {
        console.error("Error fetching admin stats:", error);
        res.status(500).json({ message: "Failed to fetch admin stats" });
    }
})

module.exports = router;