import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Container,
  Grid,
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  const navigate = useNavigate();

  // Function to handle edit actions
  const handleEdit = (user) => {
    navigate(`/${user._id}`);
  };

  // Function to handle delete action
  const handleDelete = async (userId) => {
    try {
      await axios.delete(`/users/${userId}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/users", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      if (response.status === 200) {
        setUsers(response.data.data);
        setIsAuth(true);
      }
    } catch (error) {
      console.error(error.response.data);
    } finally {
      setisLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return isLoading ? (
    <>Loading...</>
  ) : (
    <div>
      {isAuth ? (
        <>
          <h2>
            <center>Users</center>
          </h2>
          <Container maxWidth="lg">
            <Grid container spacing={2}>
              {users.map((user) => (
                <Grid item xs={12} sm={6} md={4} key={user._id}>
                  <UserCard
                    username={user.username}
                    image={user.image}
                    onEdit={() => handleEdit(user)}
                    onDelete={() => handleDelete(user._id)} // Add the missing parenthesis here
                  />
                </Grid>
              ))}
            </Grid>
          </Container>
        </>
      ) : (
        <UserForm fetchUsers={fetchUsers} />
      )}
    </div>
  );
};

const UserCard = ({ username, image, onEdit, onDelete }) => {
  return (
    <Card>
      <div style={{ position: "relative" }}>
        <span
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            zIndex: 1,
            cursor: "pointer",
          }}
          onClick={onEdit}
        >
          <AiOutlineEdit size={24} />
        </span>
        <span
          style={{
            position: "absolute",
            top: 0,
            right: 30,
            zIndex: 1,
            cursor: "pointer",
          }}
          onClick={onDelete}
        >
          <AiOutlineDelete size={24} />
        </span>
      </div>
      <CardMedia component="img" height="140" image={image} alt={username} />
      <CardContent>
        <Typography variant="h6" component="div">
          {username}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default UserList;

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