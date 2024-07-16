import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`, { email, password });
      if (res && res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem('auth', JSON.stringify(res.data));
        navigate('/');
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error.response.data);
      toast.error('something went wrong');
    }
  };

  const API_URL = process.env.REACT_APP_API;

  const getProtectedData = async ({ url, params }) => {
    try {
      const response = await axios(`${API_URL}/${url}?${new URLSearchParams(params)}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      });
      return response.data;
    } catch (error) {
      if (error.response.status === 403) {
        const refreshToken = localStorage.getItem("refreshToken");
        const res = await axios.post(`${API_URL}/token`, { token: refreshToken });
        localStorage.setItem("accessToken", res.data.accessToken);
        return getProtectedData({ url, params }); // Retry the original request
      } else {
        return { error: "You are not authorized", code: "401" };
      }
    }
  };

  const fetchProtectedData = async () => {
    try {
      const data = await getProtectedData({ url: 'protected-endpoint', params: { key: 'value' } });
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout title={'login Now!'}>
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
