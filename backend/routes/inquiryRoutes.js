import express from 'express';
import { getAllInquiries, createInquiry, replyToInquiry, deleteInquiry, getInquiriesByUser } from '../controllers/inquiryController.js';

const router = express.Router();

// Get all inquiries
router.get('/', getAllInquiries);

// Get inquiries by user email
router.get('/user/:email', getInquiriesByUser);

// Create a new inquiry
router.post('/', createInquiry);

// Reply to an inquiry
router.post('/:id/reply', replyToInquiry);

// Delete an inquiry
router.delete('/:id', deleteInquiry);

export default router; 