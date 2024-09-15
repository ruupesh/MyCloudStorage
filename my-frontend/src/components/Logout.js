import React from 'react';
import { Button } from '@mui/material';
import axios from 'axios';

function Logout({ onLogout }) {
  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      const accessToken = localStorage.getItem('access_token');

      // Set up config with Authorization header
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      // Call the API to blacklist the refresh token (optional)
      await axios.post('http://localhost:8000/api/logout/', {
        refresh_token: refreshToken,
      }, config);

      // Clear tokens from localStorage
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');

      // Trigger any additional logout actions (like redirect)
      onLogout();
    } catch (error) {
      console.error('Logout failed:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <Button variant="contained" onClick={handleLogout}>
      Logout
    </Button>
  );
}

export default Logout;
