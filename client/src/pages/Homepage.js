import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import { useAuth } from "../context/auth";
import axios from 'axios'; // Import axios for HTTP requests

const Homepage = ({ searchTerm }) => {
  const [products, setProducts] = useState([]); // Initialize with an empty array
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    // Fetch products from API
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/products/productData');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array to run only once

  useEffect(() => {
    if (searchTerm) {
      setFilteredProducts(
        products.filter(product =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredProducts(products);
    }
  }, [searchTerm, products]); // Add products as dependency

  return (
    <Layout title={"Shop Now"}>
      <h1>Homepage</h1>
      <div className="product-list">
        {filteredProducts.map((product, index) => (
          <div key={index} className="product-card">
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Homepage;
