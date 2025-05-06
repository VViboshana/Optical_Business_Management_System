import PDFDocument from 'pdfkit';
import Product from '../models/productModel.js';
import Category from '../models/categoryModel.js';
import asyncHandler from '../middleware/asyncHandler.js';

const generateInventoryPDF = asyncHandler(async (req, res) => {
    let doc;
    try {
        console.log('Starting PDF generation...');
        
        // Fetch data
        const products = await Product.find({}).populate('category', 'name');
        const categories = await Category.find({});
        
        console.log(`Found ${products.length} products and ${categories.length} categories`);

        if (!products || products.length === 0) {
            console.log('No products found');
            return res.status(404).json({ error: 'No products found to generate report' });
        }

        // Create a new PDF document
        doc = new PDFDocument();
        
        // Set response headers
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=clear_vision_inventory_report.pdf');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

        // Pipe the PDF to the response
        doc.pipe(res);

        // Add company logo and title
        doc.fontSize(24).text('Clear Vision', { align: 'center' });
        doc.moveDown();
        doc.fontSize(16).text('Inventory Management System Report', { align: 'center' });
        doc.moveDown();

        // Add date
        doc.fontSize(12).text(`Generated on: ${new Date().toLocaleDateString()}`, { align: 'right' });
        doc.moveDown();

        // Add summary section
        doc.fontSize(16).text('Summary', { underline: true });
        doc.moveDown();

        const totalProducts = products.length;
        const lowStockProducts = products.filter(p => p.quantity < 10).length;
        const outOfStockProducts = products.filter(p => p.quantity === 0).length;

        doc.fontSize(12).text(`Total Products: ${totalProducts}`);
        doc.text(`Low Stock Products (< 10): ${lowStockProducts}`);
        doc.text(`Out of Stock Products: ${outOfStockProducts}`);
        doc.moveDown();

        // Add category-wise summary
        doc.fontSize(16).text('Category-wise Summary', { underline: true });
        doc.moveDown();

        for (const category of categories) {
            const categoryProducts = products.filter(p => p.category._id.toString() === category._id.toString());
            const categoryTotal = categoryProducts.length;
            const categoryLowStock = categoryProducts.filter(p => p.quantity < 10).length;

            doc.fontSize(14).text(category.name);
            doc.fontSize(12).text(`Total Products: ${categoryTotal}`);
            doc.text(`Low Stock Products: ${categoryLowStock}`);
            doc.moveDown();
        }

        // Add detailed product list
        doc.fontSize(16).text('Product Details', { underline: true });
        doc.moveDown();

        // Simple table format
        let y = doc.y;
        const margin = 50;
        const rowHeight = 20;

        // Headers
        doc.fontSize(12).text('Name', margin, y);
        doc.text('Category', margin + 150, y);
        doc.text('Quantity', margin + 300, y);
        doc.text('Price', margin + 400, y);
        y += rowHeight;

        // Draw a line
        doc.moveTo(margin, y).lineTo(500, y).stroke();
        y += rowHeight;

        // Products
        for (const product of products) {
            if (y > 700) { // Check if we need a new page
                doc.addPage();
                y = 50;
            }

            doc.fontSize(10)
               .text(product.name || 'N/A', margin, y)
               .text(product.category?.name || 'N/A', margin + 150, y)
               .text(String(product.quantity || 0), margin + 300, y)
               .text(`$${product.price || 0}`, margin + 400, y);

            y += rowHeight;
        }

        // Add footer
        doc.fontSize(10)
           .text('© 2024 Clear Vision. All rights reserved.', { align: 'center' });

        console.log('PDF generation completed successfully');
        // Finalize the PDF
        doc.end();
    } catch (error) {
        console.error('Error generating PDF:', error);
        // If doc exists, end it
        if (doc) {
            doc.end();
        }
        // Send a more detailed error response
        res.status(500).json({ 
            error: 'Error generating PDF report',
            details: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
});

export { generateInventoryPDF }; 