// Import required packages
const express = require('express');
const dotenv = require('dotenv').config();

//db connection
const connectDB = require("./config/db");
connectDB();