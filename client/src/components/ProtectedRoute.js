// src/components/ProtectedRoute.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';
import axios from 'axios';
import { isTokenExpired } from '../utils/auth';
import { toast } from 'react-toastify'; // Import toast for showing messages

const ProtectedRoute = ({ children }) => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkTokenValidity = async () => {
      const token = auth?.token?.accestoken;

      if (!token || isTokenExpired(token)) {
        toast.error('Token expired. Redirecting to homepage...'); // Show error message
        setTimeout(() => {
          navigate('/'); // Redirect to homepage after 3 seconds
        }, 3000);
        return;
      }

      try {
        await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/test`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLoading(false); // Token is valid, proceed to the dashboard
      } catch (error) {
        toast.error('Token expired. Redirecting to homepage...'); // Show error message on any error
        setTimeout(() => {
          navigate('/'); // Redirect to homepage after 3 seconds
        }, 3000);
      }
    };

    checkTokenValidity();
  }, [auth, navigate]);

  if (loading) {
    return <div>Loading...</div>; // Add a loading indicator while checking the token
  }

  return children;
};

export default ProtectedRoute;
