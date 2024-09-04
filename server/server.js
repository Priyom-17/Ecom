// server.js
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';
import cors from 'cors';
import displayData from './routes/displayData.js'; // Make sure the path is correct

dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/products', displayData); // This should be configured correctly

// Base route
app.get('/', (req, res) => {
  res.send('API Working!');
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});
