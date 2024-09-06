// src/App.js
import React, { useState } from 'react';
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

function App() {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]); // State to keep track of confirmed orders

  // Function to add products to the cart
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  // Function to confirm order
  const confirmOrder = (items) => {
    setOrders([...orders, { id: Date.now(), items }]); // Add a unique order ID and items
    setCart([]); // Clear the cart after confirming the order
  };

  return (
    <>
      <Header cartItems={cart} />
      <Routes>
        <Route path="/" element={<Homepage addToCart={addToCart} />} />
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
