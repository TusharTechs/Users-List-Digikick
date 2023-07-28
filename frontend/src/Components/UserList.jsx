import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  Typography
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import UserCard from "./UserCard";
import UserSearch from "./UserSearch";
import UserForm from "./UserForm";
import UserPagination from "./UserPagination";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [sortCriteria, setSortCriteria] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const usersPerPage = 9;
  const navigate = useNavigate();

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Function to handle search
  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm.trim() === "") {
      setFilteredUsers([]);
    } else {
      const filteredUsers = users.filter((user) =>
        user.username.toLowerCase().includes(searchTerm.trim().toLowerCase())
      );
      setFilteredUsers(filteredUsers);
    }
  };

  // Function to handle sorting
  const handleSort = (criteria) => {
    if (criteria === sortCriteria) {
      setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    } else {
      setSortCriteria(criteria);
      setSortOrder("asc");
    }
  };

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

  useEffect(() => {
    const sortedUsers = [...users].sort((a, b) => {
      if (sortCriteria) {
        const valA = a[sortCriteria].toLowerCase();
        const valB = b[sortCriteria].toLowerCase();
        if (sortOrder === "asc") {
          return valA.localeCompare(valB);
        } else {
          return valB.localeCompare(valA);
        }
      }
      return 0;
    });

    // Update the filtered users list
    if (searchTerm.trim() === "") {
      setFilteredUsers(sortedUsers);
    } else {
      const filteredUsers = sortedUsers.filter((user) =>
        user.username.toLowerCase().includes(searchTerm.trim().toLowerCase())
      );
      setFilteredUsers(filteredUsers);
    }
  }, [sortCriteria, sortOrder, users, searchTerm]);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  return isLoading ? (
    <>Loading...</>
  ) : (
    <div>
      {isAuth ? (
        <>
          <h2>
            <center>Users</center>
          </h2>
          <UserSearch handleSearch={handleSearch} handleSort={handleSort} />
          <Container maxWidth="lg">
            <Grid container spacing={2}>
              {currentUsers.length > 0 ? (
                currentUsers.map((user) => (
                  <Grid item xs={12} sm={6} md={4} key={user._id}>
                    <UserCard
                      username={user.username}
                      image={user.image}
                      onEdit={() => handleEdit(user)}
                      onDelete={() => handleDelete(user._id)}
                    />
                  </Grid>
                ))
              ) : (
                <Grid item xs={12} md={12}>
                  <Typography variant="body1" align="center">
                    No users found.
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Container>
          <div
            style={{
              position: "fixed",
              bottom: "20px",
              left: "50%",
              transform: "translateX(-50%)",
              background: "#fff",
              padding: "10px",
              borderRadius: "4px",
              boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
            }}
          >
            <UserPagination
              users={filteredUsers}
              usersPerPage={usersPerPage}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      ) : (
        <UserForm fetchUsers={fetchUsers} />
      )}
    </div>
  );
};

export default UserList;