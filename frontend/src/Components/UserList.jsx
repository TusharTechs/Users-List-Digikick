import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Grid, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import UpdateDetails from './UpdateDetails';
import UserCard from './UserCard';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);

  const navigate = useNavigate();

  // Function to handle edit actions
  const handleEdit = (user) => {
    setSelectedUser(user);
    navigate(`/users/${user._id}`);
  };

  const handleCancelEdit = () => {
    setSelectedUser(null);
  };

  const handleUpdateUser = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user._id === updatedUser._id ? updatedUser : user))
    );
    setSelectedUser(null);
  };


  // Function to handle delete action
  const handleDelete = async (userId) => {
    try {
      await axios.delete(`/users/${userId}`, {
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      });
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (error) {
      console.error(error.response.data);
    }
  };


  const fetchUsers = async () => {
    try {
      const response = await axios.get('/users', {
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      });
      if (response.status === 200) {
        setUsers(response.data.data);
        setIsAuth(true);
      }


    } catch (error) {
      console.error(error.response.data);
    }
    finally {
      setisLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    isLoading ? <>Loading...</> :
      <div>
        {isAuth ? <>
          <h2><center>Users</center></h2>
          <Container maxWidth="lg">
            <Grid container spacing={2}>
              {users.map((user) => (
                <Grid item xs={12} sm={6} md={4} key={user._id}>
                  <UserCard 
                    key={`UserList-${user._id}`}
                    username={user.username}
                    image={user.image}
                    onEdit={() => handleEdit(user)}
                    onDelete={() => handleDelete(user._id)}
                  />
                </Grid>
              ))}
            </Grid>
          </Container>
        </> : <UserForm fetchUsers={fetchUsers} />}
        
      </div>
  );
};

export default UserList;



const UserForm = ({fetchUsers}) => {
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    location: '',
    contact: '',
    image: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/users', { data: formData });
      console.log(response.data);

      localStorage.setItem('token', response.data.token);

      setFormData({
        username: '',
        email: '',
        password: '',
        location: '',
        contact: '',
        image: '',
      });

      fetchUsers();
    
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
          Welcome to DigiKick. Register Below!
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
                label="Password"
                name="password"
                type="password"
                value={formData.password}
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
            <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
              Submit
            </Button>
          </center>
        </form>
      </Container>
    </Box>
  );
};