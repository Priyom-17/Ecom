import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
// Make sure to import your CSS file

const products = [
  {
    
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3MRvn7OhGfM5zV0WT8ZVIcaFvGz-IYV8SYw&s',
    description: 'Galaxy S22 Ultra',
  },
  {
    
    image: 'data:image/jpeg;base64,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',
    description: 'Samsung S24 Ultra',
  },
  {
    
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg80tGHvwAtHfOVFRg4hXsyJza3tp8MT6JQQ&s',
    description: 'Samsung S24+',
  },
  {
    
    image: 'https://i.ebayimg.com/images/g/xvwAAOSwSKBeNsl4/s-l500.jpg',
    description: 'Iphone 11',
  },
  {
    
    image: 'https://i5.walmartimages.com/seo/Apple-iPhone-12-Pro-Max-A2342-512GB-Gold-US-Model-Factory-Unlocked-Cell-Phone-Excellent-Condition_56085d5e-e4d9-4b53-9739-cf8bcf7011df.8985be480ed01ba2a71a618e2517b753.jpeg',
    description: 'Iphone 12',
  },
  {
    
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJPwFxD6FG-N95vBmPvC13fQQKhoH-kblR6g&s',
    description: 'Iphone 13',
  },
  {
    
    image: 'https://m.media-amazon.com/images/I/81NbyNDC8eS._AC_SL1500_.jpg',
    description: 'Asus Zenbook 13',
  },
  {
    
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc8tZFMEACHYdYVWW8LEpkyp_GoqFqNCGw0A&s',
    description: 'Asus ROG Streax.',
  },
  {
    
    image: 'https://www.dell.com/wp-uploads/2024/01/XPS-9640-laptops-back-to-back-1280x800-1.jpg',
    description: 'Dell',
  },{
    
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc6Lhq3tSE06pGEtTCqgo_zxlyhYBJolkjwg&s',
    description: 'Xiaomi 13.',
  },
  // Add more products here
];

const Homepage = ({ searchTerm }) => {
  const [filteredProducts, setFilteredProducts] = useState(products);

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
  }, [searchTerm]);

  return (
    <Layout>
      <h1>Homepage</h1>
      <div className="product-list">
        {filteredProducts.map((product, index) => (
          <div key={index} className="product-card">
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Homepage;
