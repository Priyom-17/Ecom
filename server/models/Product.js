// models/Product.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description:{type:String,required:true},
    price: { type: Number, required: true },
    image: { type: String },
    // Add other fields as necessary
});

const Product = mongoose.model('Product', productSchema);
export default Product;