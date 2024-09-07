// src/App.js

import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import Pagenotfound from './pages/Pagenotfound';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Dashboard from './pages/user/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Layout/Header';
import Cart from './pages/Cart';
import Orders from './pages/Orders'; // New Orders page to show confirmed orders
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function App() {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]); // State to keep track of confirmed orders
  const [products, setProducts] = useState([]); // All products fetched from the backend
  const [filteredProducts, setFilteredProducts] = useState([]); // Filtered products based on search
  const [searchTerm, setSearchTerm] = useState(''); // State for search term

  // Function to add products to the cart
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  // Function to confirm order
  const confirmOrder = (items) => {
    setOrders([...orders, { id: Date.now(), items }]); // Add a unique order ID and items
    setCart([]); // Clear the cart after confirming the order
  };

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/products/productData`);
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
    <>
      <Header onSearch={handleSearch} cartItems={cart} /> {/* Pass cartItems and onSearch */}
      <Routes>
        <Route
          path="/"
          element={<Homepage addToCart={addToCart} filteredProducts={filteredProducts} />} /> {/* Pass filtered products */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/cart" element={<Cart cartItems={cart} onConfirmOrder={confirmOrder} />} /> {/* Pass the confirm order function */}
        <Route path="/orders" element={<Orders orders={orders} />} /> {/* Route for Orders */}
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
