// src/pages/Homepage.js

import React, { useState } from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Button, Modal, Box } from '@mui/material';
import Layout from '../components/Layout/Layout';

const Homepage = ({ addToCart, filteredProducts }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Handle opening the modal with product details
  const handleOpen = (product) => {
    setSelectedProduct(product);
  };

  // Handle closing the modal
  const handleClose = () => {
    setSelectedProduct(null);
  };

  return (
    <Layout title="Shop Now">
      <Grid container spacing={3}>
        {filteredProducts.map((product, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ maxWidth: 345, cursor: 'pointer' }} onClick={() => handleOpen(product)}>
              <CardMedia
                component="img"
                height="200" // Adjust height for better image visibility
                image={product.image}
                alt={product.name}
                sx={{ objectFit: 'contain' }} // Ensure the entire image is visible
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description.substring(0, 50)}... {/* Shorten for preview */}
                </Typography>
                <Typography variant="h6" color="text.primary">
                  ৳{product.price}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the modal when clicking "Add to Cart"
                    addToCart(product);
                  }}
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Modal for showing full product details */}
      {selectedProduct && (
        <Modal open={true} onClose={handleClose}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              border: '2px solid #000',
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography variant="h4" component="h2" gutterBottom>
              {selectedProduct.name}
            </Typography>
            <img src={selectedProduct.image} alt={selectedProduct.name} style={{ width: '100%', marginBottom: '16px' }} />
            <Typography variant="body1">{selectedProduct.description}</Typography>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Price: ৳{selectedProduct.price}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={() => {
                addToCart(selectedProduct);
                handleClose();
              }}
            >
              Add to Cart
            </Button>
          </Box>
        </Modal>
      )}
    </Layout>
  );
};

export default Homepage;
