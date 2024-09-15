import React, { useState } from 'react';
import { Button, TextField, Typography, Box } from '@mui/material';
import axios from 'axios';

function IAMCredentials() {
  const [formData, setFormData] = useState({
    iam_user: '',
    iam_password: '',
  });
  const [websiteLink, setWebsiteLink] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsCreating(true);
    
    try {
      const response = await axios.post('http://localhost:8000/api/create/', formData);
      setWebsiteLink(response.data.website_url);
    } catch (error) {
      console.error('Failed to create website:', error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        name="iam_user"
        label="IAM User"
        id="iam_user"
        value={formData.iam_user}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="iam_password"
        label="IAM Password"
        type="password"
        id="iam_password"
        value={formData.iam_password}
        onChange={handleChange}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={isCreating}
      >
        {isCreating ? 'Creating...' : 'Create'}
      </Button>
      {websiteLink && (
        <Typography variant="body2" color="textSecondary" align="center">
          Your website link: <a href={websiteLink} target="_blank" rel="noopener noreferrer">{websiteLink}</a>
        </Typography>
      )}
    </Box>
  );
}

export default IAMCredentials;
