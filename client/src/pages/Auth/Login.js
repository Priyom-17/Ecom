// src/pages/Auth/Login.js
import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios directly
import { useAuth } from '../../context/auth';
import {jwtDecode} from 'jwt-decode'; // Import jwtDecode for token decoding

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:8080/api/v1/auth/login`, { email, password });
      if (res && res.data.success) {
        toast.success(res.data.message);

        // Decode the access token to get expiration time
        const decodedToken = jwtDecode(res.data.accestoken);
        const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds

        // Set auth state with user data and tokens
        setAuth({
          user: res.data.user,
          token: { accestoken: res.data.accestoken, refreshtoken: res.data.refreshtoken },
        });

        // Save auth data to local storage
        localStorage.setItem('auth', JSON.stringify({
          user: res.data.user,
          token: { accestoken: res.data.accestoken, refreshtoken: res.data.refreshtoken },
        }));

        // Redirect to dashboard page after successful login
        navigate('/dashboard');

        // Schedule redirect to homepage when token expires
        const tokenExpirationTime = expirationTime - Date.now(); // Time in milliseconds until token expiration
        setTimeout(() => {
          setAuth({ user: null, token: { accestoken: '', refreshtoken: '' } });
          localStorage.removeItem('auth');
          navigate('/'); // Redirect to homepage
          toast.error('Token expired. Redirecting to homepage...');
        }, tokenExpirationTime);
      } else {
        toast.error(res.data.message || 'Login failed'); // Show error message if available, otherwise generic message
      }
    } catch (error) {
      console.error('Login error:', error); // Log the error to the console for debugging
      toast.error('Something went wrong'); // Show generic error message to the user
    }
  };

  return (
    <Layout title={'Login Now!'}>
      <div className='register'>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" placeholder='Enter Your Email' required />
          </div>
          <div className="mb-3">
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder='Enter Password' required />
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
