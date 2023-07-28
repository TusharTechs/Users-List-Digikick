import React, { useState } from "react";
import { TextField, Button, Box, Menu, MenuItem } from "@mui/material";
import { RiFilter2Line } from "react-icons/ri";

const UserSearch = ({ handleSearch, handleSort }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleButtonClick = () => {
    handleSearch(searchTerm);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSortByUsername = () => {
    handleSort("username");
    handleMenuClose();
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="center" my={2}>
      <TextField
        label="Search by Username"
        value={searchTerm}
        onChange={handleChange}
        variant="outlined"
        size="small"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleButtonClick}
        sx={{ ml: 1 }}
      >
        Search
      </Button>
      <RiFilter2Line
        size={24}
        style={{ marginLeft: "0.5rem", cursor: "pointer" }}
        onClick={handleMenuOpen}
      />
      {/* Menu component for sorting */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleSortByUsername}>Sort Users by Username</MenuItem>
      </Menu>
    </Box>
  );
};

export default UserSearch;