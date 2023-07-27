import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Container, Grid, Box, Typography } from '@mui/material';
import UserCard from './UserCard';

const UpdateDetails = ({ user, onUpdate }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    location: '',
    contact: '',
    image: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        email: user.email,
        location: user.location || '',
        contact: user.contact || '',
        image: user.image || '',
      });
    }
  }, [user]);

  const handleCancel = () => {
    navigate('/users');
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(`/users/${user._id}`, formData, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });

      console.log('Response:', response.data);
      onUpdate(response.data.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Box display="flex" justifyContent="center" minHeight="100vh">
      {/* User Card */}
      <Box>
        <Typography variant="h4" align="center" gutterBottom>
          <UserCard key={`UserDetails-${id}`} username={user.username}
                    image={user.image}/>
        </Typography>
        {user && (
          <Container maxWidth="sm">
            <Typography variant="h6">Username: {user.username}</Typography>
            <Typography variant="body1">Email: {user.email}</Typography>
            <Typography variant="body1">Location: {user.location || 'N/A'}</Typography>
            <Typography variant="body1">Contact: {user.contact || 'N/A'}</Typography>
            {user.image && <img src={user.image} alt="User" style={{ maxWidth: '100%' }} />}
          </Container>
        )}
      </Box>

      {/* Update Form */}
      <Box>
        <Container maxWidth="sm">
          <Typography variant="h4" align="center" gutterBottom>
            Edit User
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Contact"
                  name="contact"
                  type="tel"
                  value={formData.contact}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Image URL"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <center>
              <Button variant="contained" color="primary" type="submit" sx={{ mt: 2, mr: 2 }}>
                Save
              </Button>
              <Button variant="contained" color="secondary" onClick={handleCancel} sx={{ mt: 2 }}>
                Cancel
              </Button>
            </center>
          </form>
        </Container>
      </Box>
    </Box>
  );
};

export default UpdateDetails;