import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, InputBase, Badge, Button, Box, Menu, MenuItem } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import { useCart } from '../../context/cartcontext';
import toast from 'react-hot-toast';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';

const Header = ({ onSearch }) => {
  const [auth, setAuth] = useAuth();
  const { cartItems } = useCart(); // Use cartItems from cart context
  const [searchTerm, setSearchTerm] = useState('');
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const handleLogout = () => {
    setAuth({
      user: null,
      token: '',
    });
    localStorage.removeItem('auth');
    toast.success('Logout Successfully');
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  // Menu open/close handlers
  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#041321' }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenuOpen}>
          <MenuIcon />
        </IconButton>

        {/* Menu code here... */}

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <NavLink to="/" style={{ textDecoration: 'none', color: 'white' }}>
            TechMania
          </NavLink>
        </Typography>

        {/* Centered "Welcome to TechMania!" quote */}

        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
          <Typography variant="h6" component="div" sx={{ textAlign: 'center', fontSize: '2.5rem', color: 'pink' }}>
            Welcome to TechMania!
          </Typography>
        </Box>

        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <InputBase
            placeholder="Search…"
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ color: 'inherit', paddingLeft: 2, paddingRight: 2 }}
          />
          <IconButton type="submit" aria-label="search" sx={{ padding: 1 }}>
            <SearchIcon />
          </IconButton>
        </div>

        <IconButton color="inherit" component={NavLink} to="/cart">
          <Badge badgeContent={cartItems.length} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>

        {!auth.user ? (
          <>
            <Button color="inherit" component={NavLink} to="/login">
              Login
            </Button>
            <Button color="inherit" component={NavLink} to="/register">
              Register
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={NavLink} to="/orders">
              My Orders
            </Button>
            <IconButton edge="end" aria-label="account of current user" aria-haspopup="true" color="inherit">
              <AccountCircle />
            </IconButton>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
