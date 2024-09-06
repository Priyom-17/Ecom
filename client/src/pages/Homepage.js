// src/pages/Homepage.js

import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import Header from '../components/Layout/Header';

const Homepage = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/products/productData');
        setProducts(response.data);
        setFilteredProducts(response.data); // Initially set filtered products to all products
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Update filtered products based on the search term
  useEffect(() => {
    if (searchTerm) {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().startsWith(searchTerm.toLowerCase()) // Filter by initial letters
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [searchTerm, products]);

  // Function to handle search input from the Header
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <Layout title="Shop Now">
      <Header onSearch={handleSearch} cartItems={[]} /> {/* Pass handleSearch to Header */}
      <div className="product-list">
        {filteredProducts.map((product, index) => (
          <div key={index} className="product-card">
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>৳{product.price}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Homepage;
