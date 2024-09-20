// routes/displayData.js
import express from 'express';
import Product from '../models/Product.js'; // Ensure this path is correct
const router = express.Router();

router.get('/productData', async (req, res) => {
    try {
        const fetchedData = await Product.find(); // Use the Product model to fetch data
        console.log('Fetched Data:', fetchedData);
        res.json(fetchedData);
    } catch (error) {
        console.error('Error fetching product data:', error);
        res.status(500).json({ error: 'Server Error' });
    }
});

export default router;