import Inquiry from '../models/inquiryModel.js';
import userModel from '../models/userModel.js';

// Get all inquiries
export const getAllInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: 'Inquiries fetched successfully',
      data: inquiries
    });
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch inquiries',
      error: error.message
    });
  }
};

// Create a new inquiry
export const createInquiry = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    const inquiry = new Inquiry({
      name,
      email,
      message
    });

    await inquiry.save();

    res.status(201).json({
      success: true,
      message: 'Inquiry created successfully',
      data: inquiry
    });
  } catch (error) {
    console.error('Error creating inquiry:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create inquiry',
      error: error.message
    });
  }
};

// Reply to an inquiry
export const replyToInquiry = async (req, res) => {
  try {
    const { id } = req.params;
    const { reply } = req.body;

    if (!reply) {
      return res.status(400).json({
        success: false,
        message: 'Reply message is required'
      });
    }

    const inquiry = await Inquiry.findById(id);

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found'
      });
    }

    inquiry.reply = reply;
    inquiry.repliedAt = new Date();
    inquiry.status = 'replied';

    await inquiry.save();

    res.status(200).json({
      success: true,
      message: 'Reply sent successfully',
      data: inquiry
    });
  } catch (error) {
    console.error('Error replying to inquiry:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send reply',
      error: error.message
    });
  }
};

// Delete an inquiry
export const deleteInquiry = async (req, res) => {
  try {
    const { id } = req.params;

    const inquiry = await Inquiry.findByIdAndDelete(id);

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Inquiry deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting inquiry:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete inquiry',
      error: error.message
    });
  }
};

export const getUserInquiries = async (req, res) => {
    try {
        const { userId } = req.body;
        const inquiries = await Inquiry.find({ userId })
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            inquiries
        });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Get inquiries by user email
export const getInquiriesByUser = async (req, res) => {
  try {
    const { email } = req.params;
    const inquiries = await Inquiry.find({ email }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      message: 'Inquiries fetched successfully',
      data: inquiries
    });
  } catch (error) {
    console.error('Error fetching user inquiries:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user inquiries',
      error: error.message
    });
  }
}; 