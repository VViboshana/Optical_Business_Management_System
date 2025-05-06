import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import inquiryRouter from './routes/inquiryRoutes.js';
import router from './routes/appointmentRoute.js';  
import doctorRoutes from './routes/doctorRoutes.js';
import appointmentRoutes from './routes/appointmentRoute.js';
import path from 'path'
import http from 'http'
import fs from 'fs'

//inventory
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import supplierRoutes from './routes/supplierRoutes.js'
import emailRoutes from './routes/emailRoutes.js'
import reportRoutes from './routes/reportRoutes.js'
import pdfRoutes from './routes/pdfRoutes.js'

//product catalog
import glassRoutes from './routes/glassRoute.js'
import adminRoutes from './stats/admin.stats.js'

import orderRoutes from './routes/order.route.js';
import paymentRoutes from './routes/payment.route.js';

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cookieParser());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/inquiries', inquiryRouter);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/doctors', doctorRoutes);

app.use('/api/category', categoryRoutes)
app.use('/api/product', productRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/suppliers', supplierRoutes)
app.use('/api/email', emailRoutes)
app.use('/api/reports', reportRoutes)
app.use('/api/pdf', pdfRoutes);

app.use("/api/glasses", glassRoutes);
app.use("/api/admin", adminRoutes);

app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);

const __dirname= path.resolve()
app.use("/uploads", express.static(path.join(__dirname + "/uploads")))

async function main() {
  await mongoose.connect(process.env.DB_URL);
  //routes
  app.get("/", (req, res) => {
    res.send("Optical Shop server in online!");
  });
}

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});