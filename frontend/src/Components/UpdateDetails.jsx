import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Grid,
  Box,
  Typography,
} from "@mui/material";

const UpdateDetails = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    location: "",
    contact: "",
    image: "",
    _id: "",
  });
  useEffect(() => {
    const getuser = async () => {
      const res = await axios.get(`/users/${params.id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      setFormData(res.data.data);
    };
    getuser();
  }, [params.id]);

  const handleCancel = () => {
    navigate("/");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        await axios.put(`/users/${params.id}`, formData, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      navigate("/");
    } catch (error) {
      console.error("Error:", error);
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
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ mt: 2, mr: 2 }}
            >
              Save
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleCancel}
              sx={{ mt: 2 }}
            >
              Cancel
            </Button>
          </center>
        </form>
      </Container>
    </Box>
  );
};

export default UpdateDetails;