import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css'; // Assuming you'll add a custom CSS file

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`, {
        name,
        email,
        password,
        phone,
      });
      if (res && res.data.success) {
        toast.success(res.data.message);
        navigate('/login');
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  return (
    <Layout title={'Register Now!'}>
      <div className='register-page'>
        <div className='register-form-container'>
          <h1 className='register-title'>Create Your Account</h1>
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='form-input'
                placeholder='Your Full Name'
                required
              />
            </div>
            <div className='form-group'>
              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='form-input'
                placeholder='Your Email'
                required
              />
            </div>
            <div className='form-group'>
              <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='form-input'
                placeholder='Password'
                required
              />
            </div>
            <div className='form-group'>
              <input
                type='text'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className='form-input'
                placeholder='Phone Number'
                required
              />
            </div>
            <button type='submit' className='register-btn'>
              Register
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
