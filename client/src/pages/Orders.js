import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import { useAuth } from '../context/auth';
import axios from 'axios';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      if (!auth.user) return; // Do not fetch if user is not logged in

      try {
        const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/orders`, {
          headers: {
            'Authorization': `Bearer ${auth.token.accestoken}`,
          },
        });
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [auth]);

  return (
    <Layout title="My Orders">
      <div className="orders-container">
        <h2 className="orders-title">My Orders</h2>
        {orders.length === 0 ? (
          <p className="orders-empty">You have no orders.</p>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order._id} className="order-card">
                <h3 className="order-id">Order ID: {order._id}</h3>
                <p className="order-date">Ordered on: {new Date(order.createdAt).toLocaleString()}</p>
                <h4 className="order-total">Total: ৳{order.total.toFixed(2)}</h4>
                <div className="order-items">
                  {order.items.map((item, index) => (
                    <div key={index} className="order-item">
                      <img 
                        src={item.productId.image} // Access image from productId
                        alt={item.productId.name} // Access name from productId
                        className="order-item-image" 
                      />
                      <div className="order-item-details">
                        <h4 className="order-item-name">{item.productId.name}</h4> 
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