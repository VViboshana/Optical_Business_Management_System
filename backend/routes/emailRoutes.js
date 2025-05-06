import express from "express";
import { sendLowStockAlerts, testEmail } from "../controllers/emailController.js";

const router = express.Router();

// Route to send low stock alerts to suppliers
router.post("/low-stock-alert", sendLowStockAlerts);

// Route to test email functionality
router.post("/test", testEmail);

export default router;
