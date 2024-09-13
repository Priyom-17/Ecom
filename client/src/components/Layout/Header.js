// src/components/Layout/Header.js
import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, InputBase, Badge, Button, Box, Menu, MenuItem } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import toast from 'react-hot-toast';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';

const Header = ({ onSearch, cartItems = [] }) => {
  const [auth, setAuth] = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [menuAnchorEl, setMenuAnchorEl] = useState(null); // State to manage menu visibility

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
        {/* Menu Icon */}
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenuOpen}>
          <MenuIcon />
        </IconButton>

        {/* Dropdown Menu with custom styles */}
        <Menu
          anchorEl={menuAnchorEl}
          open={Boolean(menuAnchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem
            onClick={handleMenuClose}
            component={NavLink}
            to="/"
            sx={{
              backgroundColor: '#39ff14', // iPhone button background color
              fontSize: '2rem', // Larger font size
              '&:hover': {
                backgroundColor: '#ffcdd2',
                boxShadow: '0 0 10px 2px rgba(255, 183, 77, 0.8)', // Glowing effect
                border: '1px solid #39ff14'
                //transition: 'all 0.3s ease-in-out',
              },
            }}
          >
            iPhone
          </MenuItem>

          <MenuItem
            onClick={handleMenuClose}
            component={NavLink}
            to="/"
            sx={{
              backgroundColor: '#e3f2fd', // Samsung button background color
              fontSize: '2rem',
              '&:hover': {
                backgroundColor: '#bbdefb',
                boxShadow: '0 0 10px 2px rgba(77, 208, 225, 0.8)', // Glowing effect
                transition: 'all 0.3s ease-in-out',
              },
            }}
          >
            Samsung
          </MenuItem>

          <MenuItem
            onClick={handleMenuClose}
            component={NavLink}
            to="/"
            sx={{
              backgroundColor: '#041321', // Google Pixel button background color
              fontSize: '2rem',
              '&:hover': {
                backgroundColor: '#c8e6c9',
                boxShadow: '0 0 10px 2px rgba(129, 199, 132, 0.8)', // Glowing effect
                transition: 'all 0.3s ease-in-out',
              },
            }}
          >
            Google Pixel
          </MenuItem>

          <MenuItem
            onClick={handleMenuClose}
            component={NavLink}
            to="/"
            sx={{
              backgroundColor: '#f3e5f5', // Xiaomi button background color
              fontSize: '2rem',
              '&:hover': {
                backgroundColor: '#e1bee7',
                boxShadow: '0 0 10px 2px rgba(186, 104, 200, 0.8)', // Glowing effect
                transition: 'all 0.3s ease-in-out',
              },
            }}
          >
            Xiaomi
          </MenuItem>
        </Menu>

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <NavLink to="/" style={{ textDecoration: 'none', color: 'white' }}>
            TechMania
          </NavLink>
        </Typography>

        {/* Centered "Welcome to TechMania!" quote */}
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
          <Typography
            variant="h6"
            component="div"
            sx={{
              textAlign: 'center',
              fontSize: '2.5rem',
              color: 'pink',
            }}
          >
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
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
            >
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
