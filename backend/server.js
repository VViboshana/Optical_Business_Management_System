import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config.js'; 
import adminRouter from './routes/adminRoute.js';
import router from './routes/appointmentRoute.js';  


// Initialize Express
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// API Routes
app.use('/api/admin', adminRouter);
app.use('/api', router); 


// Test API
app.get('/', (req, res) => {
    res.send('API WORKING');
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
