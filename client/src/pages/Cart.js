// Cart.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth'; // Import useAuth to check if user is logged in
import './Cart.css';

const Cart = ({ cartItems, onConfirmOrder }) => {
  const [auth] = useAuth();
  const navigate = useNavigate();

  // Calculate the total price of all items in the cart
  const totalPrice = cartItems.reduce((acc, item) => {
    const itemPrice = typeof item.price === 'string' ? parseFloat(item.price.replace(/[^0-9.-]+/g, '')) : item.price;
    return acc + (itemPrice || 0);
  }, 0);

  // Handle order confirmation
  const handleConfirmOrder = () => {
    if (!auth.user) {
      alert('You need to be logged in to confirm the order.');
      navigate('/login'); // Redirect to login page if user is not logged in
      return;
    }

    // Call the confirm order function passed as a prop
    onConfirmOrder(cartItems);

    // Optionally, clear the cart after confirming the order
    alert('Order confirmed! You can view your order in the "My Orders" section.');
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length > 0 ? (
        <div className="cart-grid">
          {cartItems.map((item, index) => (
            <div key={index} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p>Price: ৳{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Your cart is empty.</p>
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
