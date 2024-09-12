// src/pages/Homepage.js

import React, { useState } from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Button, Modal, Box, Snackbar, Alert } from '@mui/material';
import Layout from '../components/Layout/Layout';

const Homepage = ({ addToCart, filteredProducts }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State for Snackbar

  // Handle opening the modal with product details
  const handleOpen = (product) => {
    setSelectedProduct(product);
  };

  // Handle closing the modal
  const handleClose = () => {
    setSelectedProduct(null);
  };

  // Handle adding product to cart and showing the Snackbar
  const handleAddToCart = (product) => {
    addToCart(product);
    setSnackbarOpen(true); // Show Snackbar
  };

  // Handle closing the Snackbar
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Layout title="Shop Now">
      <Box sx={{ backgroundColor: 'black', minHeight: '100vh', padding: 3 }}>
        <Grid container spacing={3}>
          {filteredProducts.map((product, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ maxWidth: 345, cursor: 'pointer', bgcolor: 'grey.900', color: 'white' }} onClick={() => handleOpen(product)}>
                <CardMedia
                  component="img"
                  height="200" // Adjust height for better image visibility
                  image={product.image}
                  alt={product.name}
                  sx={{ objectFit: 'contain' }} // Ensure the entire image is visible
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" sx={{ color: 'white' }}>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'grey.400' }}>
                    {product.description.substring(0, 50)}... {/* Shorten for preview */}
                  </Typography>
                  <Typography variant="h6" sx={{ color: 'white' }}>
                    ৳{product.price}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering the modal when clicking "Add to Cart"
                      handleAddToCart(product); // Use handleAddToCart to show Snackbar
                    }}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

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
                handleAddToCart(selectedProduct); // Use handleAddToCart to show Snackbar
                handleClose();
              }}
            >
              Add to Cart
            </Button>
          </Box>
        </Modal>
      )}

      {/* Snackbar for "Product added to cart" notification */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000} // Auto hide after 3 seconds
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Show from the top
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Product added to cart!
        </Alert>
      </Snackbar>
    </Layout>
  );
};

export default Homepage;
