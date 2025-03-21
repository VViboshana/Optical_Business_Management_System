import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config.js'; 
import router from './routes/appointmentRoute.js';  
import doctorRoutes from './routes/doctorRoute.js'


// Initialize Express
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// API Routes
app.use('/api', router); 
app.use('/api', doctorRoutes);


// Test API
app.get('/', (req, res) => {
    res.send('API WORKING');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
