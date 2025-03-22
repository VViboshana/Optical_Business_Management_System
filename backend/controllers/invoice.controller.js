const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const generatePDF = async (req, res) => {
  try {
    const { orderId, customerName, totalAmount, products } = req.body;

    // **Generate HTML for the receipt**
    const receiptHtml = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; }
            .container { padding: 20px; width: 80%; margin: auto; border: 1px solid #ddd; }
            h2 { color: #333; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
            th { background-color: #f4f4f4; }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>Order Receipt</h2>
            <p><strong>Order ID:</strong> ${orderId}</p>
            <p><strong>Customer Name:</strong> ${customerName}</p>
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                ${products.map(
                  (product) =>
                    `<tr>
                      <td>${product.name}</td>
                      <td>${product.quantity}</td>
                      <td>$${product.price}</td>
                    </tr>`
                ).join("")}
              </tbody>
            </table>
            <h3>Total: $${totalAmount}</h3>
          </div>
        </body>
      </html>
    `;

    // **Launch Puppeteer to generate PDF**
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(receiptHtml);
    
    // Define PDF file path
    const pdfPath = path.join(__dirname, `../receipts/receipt_${orderId}.pdf`);

    // Generate PDF
    await page.pdf({ path: pdfPath, format: "A4" });

    await browser.close();

    // Send PDF file as response
    res.download(pdfPath, `receipt_${orderId}.pdf`, (err) => {
      if (err) {
        console.error("Error sending file:", err);
        res.status(500).json({ error: "Error generating PDF" });
      }
      // Optionally, delete the file after sending
      fs.unlinkSync(pdfPath);
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { generatePDF };