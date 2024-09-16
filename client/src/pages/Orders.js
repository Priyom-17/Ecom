
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    setOrders(storedOrders);
  }, []);

  return (
    <Layout title="My Orders">
      <div className="orders-container">
        <h2 className="orders-title">My Orders</h2>
        {orders.length === 0 ? (
          <p className="orders-empty">You have no orders.</p>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order.id} className="order-card">
                <h3 className="order-id">Order ID: {order.id}</h3>
                <p className="order-date">Ordered on: {new Date(order.date).toLocaleString()}</p>
                <h4 className="order-total">Total: ৳{order.total.toFixed(2)}</h4>
                <div className="order-items">
                  {order.items.map((item, index) => (
                    <div key={index} className="order-item">
                      <img src={item.image} alt={item.name} className="order-item-image" />
                      <div className="order-item-details">
                        <h4 className="order-item-name">{item.name}</h4>
                        <p className="order-item-price">৳{item.price}</p>
                        <p className="order-item-quantity">Quantity: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Orders;
