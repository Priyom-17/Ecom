// src/components/Cart.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';
import { useCart } from '../context/cartcontext';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import './Cart.css';

const Cart = () => {
  const [auth] = useAuth();
  const { cartItems, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = useCart();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((acc, item) => {
    const itemPrice = typeof item.price === 'string' ? parseFloat(item.price.replace(/[^0-9.-]+/g, '')) : item.price;
    return acc + (itemPrice || 0) * item.quantity;
  }, 0);

  const handleConfirmOrder = async () => {
    if (!auth.user) {
        alert('You need to be logged in to confirm the order.');
        navigate('/login');
        return;
    }

    const order = {
        items: cartItems.map(item => ({
            productId: item._id,
            quantity: item.quantity,
            price: item.price,
        })),
        total: totalPrice,
    };

    try {
        await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/confirm-order`, {
            order,
            customerEmail: auth.user.email,
            customerName: auth.user.name,
            customerPhone: auth.user.phone,
        }, {
            headers: {
                'Authorization': `Bearer ${auth.token.accestoken}`, // Include the access token here
            },
        });

        clearCart();
        alert('Order confirmed! You can view your order in the "My Orders" section.');
        navigate('/orders');
    } catch (error) {
        console.error('Error confirming order:', error);
        alert('Failed to confirm order. Please try again.');
    }
};

  return (
    <div className="cart-container">
      <Helmet>
        <title>My Cart</title>
        <meta name="description" content="Review your cart and confirm your order. Make sure to log in to place an order." />
      </Helmet>
      <h2>Your Cart</h2>
      {cartItems.length > 0 ? (
        <div className="cart-grid">
          {cartItems.map((item, index) => (
            <div key={index} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p>Price: ৳{item.price}</p>
                <div className="quantity-controls">
                  <button className="quantity-button" onClick={() => decreaseQuantity(item._id)}>-</button>
                  <span>{item.quantity}</span>
                  <button className="quantity-button" onClick={() => increaseQuantity(item._id)}>+</button>
                </div>
                <button className="remove-button" onClick={() => removeFromCart(item._id)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="empty-cart-message">Your cart is empty.</p>
      )}
      {cartItems.length > 0 && (
        <div className="cart-total">
          <h3>Total Price: ৳{totalPrice.toFixed(2)}</h3>
          <button className="confirm-order-button" onClick={handleConfirmOrder}>
            Confirm Order
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;