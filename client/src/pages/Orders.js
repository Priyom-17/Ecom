// src/pages/Orders.js
import React from 'react';
import { useAuth } from '../context/auth';
import './Orders.css'; // Add custom styling for the orders page

const Orders = ({ orders }) => {
  const [auth] = useAuth();

  // Check if the user is logged in
  if (!auth.user) {
    return <h2>Please log in to view your orders.</h2>;
  }

  return (
    <div className="orders-container">
      <h2>My Orders</h2>
      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order.id} className="order-card">
            <h3>Order ID: {order.id}</h3>
            <div className="order-items-grid"> {/* Use a grid layout for the items */}
              {order.items.map((item, index) => (
                <div key={index} className="order-item">
                  <img src={item.image} alt={item.name} className="order-item-image" />
                  <div className="order-item-details">
                    <h4>{item.name}</h4>
                    <p>Price: ৳{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p>No orders yet. Start shopping!</p>
      )}
    </div>
  );
};

export default Orders;
