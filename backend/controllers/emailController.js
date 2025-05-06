import asyncHandler from "../middleware/asyncHandler.js";
import { sendEmail, sendBulkEmails, generateLowStockEmailTemplate } from "../utils/emailService.js";
import Product from "../models/productModel.js";
import Supplier from "../models/supplierModel.js";

/**
 * Send low stock alerts to relevant suppliers
 * @route POST /api/email/low-stock-alert
 */
export const sendLowStockAlerts = asyncHandler(async (req, res) => {
  try {
    // Define what "low stock" means - products with quantity below this threshold
    const lowStockThreshold = req.body.threshold || 10;
    
    // Get all products with quantity below threshold
    const lowStockProducts = await Product.find({ quantity: { $lt: lowStockThreshold } });
    
    if (!lowStockProducts || lowStockProducts.length === 0) {
      return res.status(404).json({ message: "No low stock products found" });
    }
    
    console.log(`Found ${lowStockProducts.length} products with low stock.`);
    
    // Get all suppliers
    const suppliers = await Supplier.find({});
    
    if (!suppliers || suppliers.length === 0) {
      return res.status(404).json({ message: "No suppliers found in the system" });
    }
    
    console.log(`Found ${suppliers.length} suppliers in the system.`);
    
    // Track how many emails were sent and to whom
    const emailsSent = [];
    const emailErrors = [];
    const unassignedProducts = [];
    
    // Create a mapping of suppliers to their products
    const supplierProductMap = new Map();
    
    // For each supplier, find relevant low stock products using improved matching logic
    for (const supplier of suppliers) {
      // Improved matching logic with more flexible conditions
      const relevantProducts = lowStockProducts.filter(product => {
        // Convert strings to lowercase for case-insensitive comparison
        const supplierName = supplier.name.toLowerCase();
        const supplierItem = supplier.item.toLowerCase();
        const productBrand = product.brand.toLowerCase();
        const productName = product.name.toLowerCase();
        
        // Check if:
        // 1. The product brand matches or contains the supplier name
        // 2. The supplier name matches or contains the product brand
        // 3. The supplier's item field contains the product name
        // 4. The product name contains the supplier's item
        return (
          productBrand.includes(supplierName) || 
          supplierName.includes(productBrand) ||
          supplierItem.includes(productName) ||
          productName.includes(supplierItem)
        );
      });
      
      // Log debug info
      console.log(`Supplier: ${supplier.name}, Matched Products: ${relevantProducts.length}`);
      
      if (relevantProducts.length > 0) {
        supplierProductMap.set(supplier, relevantProducts);
      }
    }

    // Keep track of products that were already assigned to a supplier
    const assignedProductIds = new Set();

    // Send emails to suppliers with matched products
    for (const [supplier, products] of supplierProductMap.entries()) {
      try {
        // Only include products that haven't been assigned yet
        const uniqueProducts = products.filter(product => !assignedProductIds.has(product._id.toString()));
        
        if (uniqueProducts.length === 0) continue;
        
        // Mark these products as assigned
        uniqueProducts.forEach(product => assignedProductIds.add(product._id.toString()));
        
        // Generate email content
        const emailHtml = generateLowStockEmailTemplate(uniqueProducts, supplier.name);
        
        // Send the email
        await sendEmail(
          supplier.email,
          `Low Stock Alert - ${uniqueProducts.length} Products Need Attention`,
          emailHtml
        );
        
        // Track success
        emailsSent.push({
          supplier: supplier.name,
          email: supplier.email,
          productCount: uniqueProducts.length
        });
      } catch (error) {
        // Track errors
        emailErrors.push({
          supplier: supplier.name,
          email: supplier.email,
          error: error.message
        });
      }
    }
    
    // Find products that weren't matched to any supplier
    unassignedProducts.push(
      ...lowStockProducts
        .filter(product => !assignedProductIds.has(product._id.toString()))
        .map(p => p.name)
    );
    
    // As a fallback, if there are unassigned products and at least one supplier, send a general alert
    if (unassignedProducts.length > 0 && suppliers.length > 0) {
      try {
        // Choose a default supplier (e.g., the first one) to send a general alert
        const defaultSupplier = suppliers[0];
        const unassignedLowStockProducts = lowStockProducts.filter(
          product => !assignedProductIds.has(product._id.toString())
        );
        
        // Only proceed if there are actual products to report
        if (unassignedLowStockProducts.length > 0) {
          const emailHtml = generateLowStockEmailTemplate(
            unassignedLowStockProducts,
            defaultSupplier.name + " (General Inventory Manager-Mr.Chamindu)"
          );
          
          await sendEmail(
            defaultSupplier.email,
            `General Low Stock Alert - ${unassignedLowStockProducts.length} Unassigned Products`,
            emailHtml
          );
          
          emailsSent.push({
            supplier: defaultSupplier.name + " (for unassigned products)",
            email: defaultSupplier.email,
            productCount: unassignedLowStockProducts.length
          });
        }
      } catch (error) {
        console.error("Error sending general low stock email:", error);
      }
    }
    
    res.status(200).json({
      success: true,
      emailsSent: emailsSent.length,
      failedEmails: emailErrors.length,
      details: {
        sent: emailsSent,
        errors: emailErrors,
        unassignedProducts: unassignedProducts
      }
    });
    
  } catch (error) {
    console.error("Email sending error:", error);
    res.status(500).json({ 
      success: false,
      message: "Error sending low stock alerts",
      error: error.message 
    });
  }
});

/**
 * Test email functionality
 * @route POST /api/email/test
 */
export const testEmail = asyncHandler(async (req, res) => {
  const { recipient } = req.body;
  
  if (!recipient) {
    return res.status(400).json({ message: "Email recipient is required" });
  }
  
  try {
    await sendEmail(
      recipient,
      "Test Email from Inventory System",
      "<p>This is a test email from your inventory management system.</p><p>If you received this, the email functionality is working correctly.</p>"
    );
    
    res.status(200).json({ 
      success: true,
      message: `Test email sent successfully to ${recipient}` 
    });
  } catch (error) {
    console.error("Test email error:", error);
    res.status(500).json({ 
      success: false,
      message: "Failed to send test email",
      error: error.message 
    });
  }
});
