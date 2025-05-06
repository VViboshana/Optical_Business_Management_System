import express from 'express';
import { generateInventoryPDF } from '../controllers/pdfController.js';

const router = express.Router();

// Add detailed logging middleware
router.use((req, res, next) => {
    console.log('PDF route accessed:', {
        method: req.method,
        url: req.url,
        headers: req.headers,
        query: req.query,
        body: req.body
    });
    next();
});

// Handle OPTIONS requests
router.options('/inventory', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept');
    res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');
    res.status(200).end();
});

router.get('/inventory', async (req, res, next) => {
    try {
        console.log('PDF generation endpoint hit');
        await generateInventoryPDF(req, res);
    } catch (error) {
        console.error('Error in PDF generation route:', error);
        res.status(500).json({
            error: 'Failed to generate PDF',
            details: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
});

export default router; 