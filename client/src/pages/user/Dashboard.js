import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import axios from 'axios';
import Layout from '../../components/Layout/Layout';

const Dashboard = () => {
  const [productStats, setProductStats] = useState([]);

  useEffect(() => {
    const fetchProductStats = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/product-stats`);
        setProductStats(data);
      } catch (error) {
        console.error('Error fetching product stats:', error);
      }
    };
    fetchProductStats();
  }, []);

  return (
    <Layout title="Dashboard">


        
        <Box sx={{ marginTop: 5 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 ,color:'red'}}>
            See What's Trending!!
          </Typography>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={productStats} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="productName" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="totalQuantity" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      
    </Layout>
  );
};

export default Dashboard;
