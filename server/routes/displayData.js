// displayData.js
import express from 'express';
import mongoose from 'mongoose'; 
const router = express.Router();

router.get('/productData', async (req, res) => {
  try {
    const fetchedData = await mongoose.connection.db.collection('products').find({}).toArray();
    console.log('Fetched Data:', fetchedData);
    res.json(fetchedData);
  } catch (error) {
    console.error('Error fetching product data:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

export default router;
