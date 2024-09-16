// src/components/Homepage.js
import React, { useState } from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Button, Modal, Box, Snackbar, Alert } from '@mui/material';
import Layout from '../components/Layout/Layout';
import { useCart } from '../context/cartcontext';

const Homepage = ({ filteredProducts }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { cartItems, addToCart, removeFromCart } = useCart();

  const handleOpen = (product) => {
    setSelectedProduct(product);
  };

  const handleClose = () => {
    setSelectedProduct(null);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    setSnackbarOpen(true);
  };

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const isInCart = (productId) => {
    return cartItems.some((item) => item._id === productId);
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
                  height="200"
                  image={product.image}
                  alt={product.name}
                  sx={{ objectFit: 'contain' }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" sx={{ color: 'white' }}>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'grey.400' }}>
                    {product.description.substring(0, 50)}...
                  </Typography>
                  <Typography variant="h6" sx={{ color: 'white' }}>
                    ৳{product.price}
                  </Typography>
                  <Button
                    variant="contained"
                    color={isInCart(product._id) ? 'error' : 'primary'}
                    fullWidth
                    sx={{
                      mt: 2,
                      position: 'relative',
                      backgroundColor: isInCart(product._id) ? '#ff4d4d' : 'primary.main',
                      '&:hover': {
                        backgroundColor: isInCart(product._id) ? '#ff1a1a' : 'transparent',
                        boxShadow: '0 0 10px 4px #39ff14',
                        border: '1px solid #39ff14',
                      },
                      border: '1px solid transparent',
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isInCart(product._id)) {
                        handleRemoveFromCart(product._id);
                      } else {
                        handleAddToCart(product);
                      }
                    }}
                  >
                    {isInCart(product._id) ? 'Remove from Cart' : 'Add to Cart'}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

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
              color={isInCart(selectedProduct._id) ? 'error' : 'primary'}
              sx={{
                mt: 2,
                position: 'relative',
                backgroundColor: isInCart(selectedProduct._id) ? '#ff4d4d' : 'primary.main',
                '&:hover': {
                  backgroundColor: isInCart(selectedProduct._id) ? '#ff1a1a' : 'transparent',
                  boxShadow: '0 0 10px 4px #39ff14',
                  border: '1px solid #39ff14',
                },
                border: '1px solid transparent',
              }}
              onClick={() => {
                if (isInCart(selectedProduct._id)) {
                  handleRemoveFromCart(selectedProduct._id);
                } else {
                  handleAddToCart(selectedProduct);
                }
                handleClose();
              }}
            >
              {isInCart(selectedProduct._id) ? 'Remove from Cart' : 'Add to Cart'}
            </Button>
          </Box>
        </Modal>
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Product added to cart!
        </Alert>
      </Snackbar>
    </Layout>
  );
};

export default Homepage;
