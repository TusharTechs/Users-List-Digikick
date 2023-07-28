import React, { useState } from "react";
import axios from "axios";
import { Box, Container, Grid, Typography, TextField, Button } from "@mui/material";

const UserForm = (props) => {
  const { fetchUsers } = props;
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    location: "",
    contact: "",
    image: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("/users", { data: formData });
      console.log(response.data);

      localStorage.setItem("token", response.data.token);

      setFormData({
        username: "",
        email: "",
        password: "",
        location: "",
        contact: "",
        image: "",
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
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ mt: 2 }}
            >
              Submit
            </Button>
          </center>
        </form>
      </Container>
    </Box>
  );
};

export default UserForm;