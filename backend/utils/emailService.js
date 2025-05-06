import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: process.env.EMAIL_PORT || 587,
  secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER, // your email address
    pass: process.env.EMAIL_PASSWORD, // your email password or app password
  },
});

// Verify connection configuration
transporter.verify(function (error, success) {
  if (error) {
    console.log('SMTP server connection error: ', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

/**
 * Send email to a single recipient
 * @param {string} to - Recipient email address
 * @param {string} subject - Email subject
 * @param {string} html - HTML content of the email
 * @returns {Promise} - Promise resolving to info about the sent email
 */
export const sendEmail = async (to, subject, html) => {
  const mailOptions = {
    from: `"Inventory System" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  };

  return await transporter.sendMail(mailOptions);
};

/**
 * Send bulk emails to multiple recipients
 * @param {Array} recipients - Array of recipient email addresses
 * @param {string} subject - Email subject
 * @param {string} html - HTML content of the email
 * @returns {Promise} - Promise resolving to info about the sent emails
 */
export const sendBulkEmails = async (recipients, subject, html) => {
  const promises = recipients.map(recipient => {
    const mailOptions = {
      from: `"Inventory System" <${process.env.EMAIL_USER}>`,
      to: recipient,
      subject,
      html,
    };
    return transporter.sendMail(mailOptions);
  });

  return Promise.all(promises);
};

/**
 * Generate HTML template for low stock alert email
 * @param {Array} products - Array of low stock products
 * @param {string} supplierName - Name of the supplier
 * @returns {string} - HTML content for email
 */
export const generateLowStockEmailTemplate = (products, supplierName) => {
  const productList = products
    .map(
      product => `
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #ddd;">${product.name}</td>
          <td style="padding: 10px; border-bottom: 1px solid #ddd;">${product.brand}</td>
          <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: center;">${product.quantity}</td>
        </tr>
      `
    )
    .join('');

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Low Stock Alert</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; }
          .container { width: 100%; max-width: 600px; margin: 0 auto; }
          .header { background-color: #f8514c; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f9f9f9; }
          table { width: 100%; border-collapse: collapse; }
          th { background-color: #f2f2f2; text-align: left; padding: 10px; }
          .footer { font-size: 12px; text-align: center; color: #666; padding: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Low Stock Alert</h1>
          </div>
          <div class="content">
            <p>Dear ${supplierName},</p>
            <p>This is to inform you that the following products from your company are running low in our inventory and require restocking:</p>
            
            <table>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Brand</th>
                  <th>Current Stock</th>
                </tr>
              </thead>
              <tbody>
                ${productList}
              </tbody>
            </table>
            
            <p>Please arrange for the resupply of these items at your earliest convenience.</p>
            <p>Thank you for your prompt attention to this matter.</p>
            <p>Best regards,<br>Clear Vision-Inventory Manager</p>
          </div>
          <div class="footer">
            <p>This is an automated message. Please do not reply to this email.</p>
          </div>
        </div>
      </body>
    </html>
  `;
};
