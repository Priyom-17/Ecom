// src/pages/Homepage.js

import React from 'react';
import Layout from '../components/Layout/Layout';

const Homepage = ({ addToCart, filteredProducts }) => {
  return (
    <Layout title="Shop Now">
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
